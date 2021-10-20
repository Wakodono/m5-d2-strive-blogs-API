// 1. CREATE --> POST http://localhost:3001/authors (+ body)
// 2. READ --> GET http://localhost:3001/authors (+ optional Query Parameters)
// 3. READ --> GET http://localhost:3001/authors/:authorId
// 4. UPDATE --> PUT http://localhost:3001/authors/:authorId (+ body)
// 5. DELETE --> DELETE http://localhost:3001/authors/:authorId

import express from "express" // 3RD PARTY MODULE (does need to be installed)
import fs from "fs" // CORE MODULE (doesn't need to be installed)
import { fileURLToPath } from "url" // CORE MODULE (doesn't need to be installed)
import { dirname, join } from "path" // CORE MODULE (doesn't need to be installed)
import uniqid from "uniqid" // 3RD PARTY MODULE (does need to be installed)

const authorsRouter = express.Router() // a Router is a set of endpoints that share something like a prefix (authorsRouter is going to share /authors as a prefix)

// ********************* how to find out the path *************
// 1. I'll start from the current file and get the path to that file
const currentFilePath = fileURLToPath(import.meta.url)
// 2. Get the parent folder's path
const parentFolderPath = dirname(currentFilePath)
// 3. Concatenate the parent's folder path with authors.json
const authorsJSONPath = join(parentFolderPath, "authors.json") // DO NOT EVER USE '+' TO CONCATENATE TWO PATHS, USE JOIN INSTEAD

//POST
authorsRouter.post("/", (req, res) => {
  // First parameter is relative URL, second parameter is the REQUEST HANDLER

  // 1. Read the request body obtaining the new author's data
  console.log(req.body)

  const newAuthor = { 
      ...req.body, 
      createdAt: new Date(),
      id: uniqid() 
    }
  console.log(newAuthor)

  // 2. Read the file content obtaining the authors array
  const authors = JSON.parse(fs.readFileSync(authorsJSONPath))

  // 3. Add new author to the array
  authors.push(newAuthor)

  // 4. Write the array back to the authors file to store it persistently 
  fs.writeFileSync(authorsJSONPath, JSON.stringify(authors))

  // 5. Send back a proper response

  res.status(201).send({ id: newAuthor.id })
})

//GET
authorsRouter.get("/", (req, res) => {
  // 1. Read the content of authors.json file

  const fileContent = fs.readFileSync(authorsJSONPath) // You are getting back the file content in the form of a BUFFER (machine readable)

  console.log(JSON.parse(fileContent))

  const arrayOfAuthors = JSON.parse(fileContent) // JSON.parse is translating buffer into a real JS array
  // 2. Send it back as a response
  res.send(arrayOfAuthors)
})

//GET INDIVIDUAL AUTHOR
authorsRouter.get("/:authorId", (req, res) => {
  // 1. Read the content of authors.json file (obtaining an array)
  const authors = JSON.parse(fs.readFileSync(authorsJSONPath))

  // 2. Find the author by id in the array

  const author = author.find(a => a.id === req.params.authorId) // in the req.params I need to use the exact same name I have used in the "placeholder" in the URL

  // 3. Send the author as a response

  res.send(author)
})

// EDIT AUTHOR w/ PUT
authorsRouter.put("/:authorId", (req, res) => {
  // 1. Read authors.json obtaining an array of authors
  const authors = JSON.parse(fs.readFileSync(authorsJSONPath))

  // 2. Modify the specified author
  const index = authors.findIndex(author => author.id === req.params.authorId)

  const updatedAuthor = { ...authors[index], ...req.body }

  authors[index] = updatedAuthor

  // 3. Save the file with updated list of authors
  fs.writeFileSync(authorsJSONPath, JSON.stringify(authors))

  // 4. Send back a proper response

  res.send(updatedAuthor)
})

// DELETE
authorsRouter.delete("/:authorId", (req, res) => {
  // 1. Read authors.json obtaining an array of authors (noticing the pattern?)
  const authors = JSON.parse(fs.readFileSync(authorsJSONPath))

  // 2. Filter out the specified author from the array, keeping just the remaining authors
  const remainingAuthors = authors.filter(author => author.id !== req.params.authorId)

  // 3. Save the remaining authors into authors.json file again
  fs.writeFileSync(authorsJSONPath, JSON.stringify(remainingAuthors))

  // 4. Send back an appropriate response
  res.status(204).send()
})

export default authorsRouter
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

// 1.
authorsRouter.post("/", (req, res) => {
  // First parameter is relative URL, second parameter is the REQUEST HANDLER

  // 1. Read the request body obtaining the new author's data
  console.log(req.body)

  const newAuthor = { 
      ...req.body, 
      id: uniqid() 
    }
  console.log(newAuthor)

  // 2. Read the file content obtaining the authors array
  const authors = JSON.parse(fs.readFileSync(authorsJSONPath))

  // 3. Add new author to the array
  authors.push(newAuthor)

  // 4. Write the array back to the file
  fs.writeFileSync(authorsJSONPath, JSON.stringify(authors))

  // 5. Send back a proper response

  res.status(201).send({ id: newAuthor.id })
})


export default authorsRouter
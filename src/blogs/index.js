import express from "express"; // 3RD PARTY MODULE (does need to be installed)

import fs from "fs"; // CORE MODULE (doesn't need to be installed)

import { fileURLToPath } from "url"; // CORE MODULE (doesn't need to be installed)

import { dirname, join } from "path"; // CORE MODULE (doesn't need to be installed)

import uniqid from "uniqid"; // 3RD PARTY MODULE (does need to be installed)

import createHttpError from "http-erors";

import {
    checkBlogPostSchema,
    checkSearchSchema,
    checkValidationResult,
  } from "./validation.js"

const blogsRouter = express.Router(); // a Router is a set of endpoints that share something like a prefix (blogssRouter is going to share /blogss as a prefix)

// ********************* how to find out the path *************
// 1. I'll start from the current file and get the path to that file
const currentFilePath = fileURLToPath(import.meta.url);
// 2. Get the parent folder's path
const parentFolderPath = dirname(currentFilePath);
// 3. Concatenate the parent's folder path with blogs.json
const blogsJSONPath = join(parentFolderPath, "blogs.json");

const getBlogs = () => JSON.parse(fs.readFileSync(blogsJSONPath))
const writeBlogs = content => fs.writeFileSync(blogsJSONPath, JSON.stringify(content))

//POST
blogsRouter.post("/",
checkValidationResult,
 (req, res, next) => {
  try {
    // 1. Read the request body obtaining the new blog's data
    const newblog = {
      id: uniqid(),
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    // console.log(newblog)

    // 2. Read the file content obtaining the blogs array
    const blogs = getBlogs();

    // 3. Add new blog to the array
    blogs.push(newblog);

    // 4. Write the array back to the blogs file to store it persistently
    writeBlogs(blogs)

    // 5. Send new blog back as response

    res.status(201).send({ id: newblog });
  } catch (error) {
   next(error);
  }
});

//GET
blogsRouter.get("/", (req, res) => {
  try {
      // 1. Read the content of blogs.json file
    
      const fileContent = fs.readFileSync(blogsJSONPath); // You are getting back the file content in the form of a BUFFER (machine readable)
    
      const arrayOfBlogs = JSON.parse(fileContent); // JSON.parse is translating buffer into a real JS array
      
    // 2. Send it back as a response
    res.send(arrayOfBlogs);
  } catch (error) {
    res.send(500).send({ message: error.message });
  }
});

//GET INDIVIDUAL blog
blogsRouter.get("/:blogId", (req, res, next) => {
    try {
        // 1. Read the content of blogs.json file (obtaining an array)
        const blogs = JSON.parse(fs.readFileSync(blogsJSONPath));
      
        // 2. Find the blog by id in the array
      
        const blog = blog.find((a) => a.id === req.params.blogId); // in the req.params I need to use the exact same name I have used in the "placeholder" in the URL
        if (!blog) {
            res
              .status(404)
              .send({ message: `blog with ${req.params.id} is not found!` });
          }
          // 3. Send the blog as a response
          res.send(blog);
    } catch (error) {
        res.send(500).send({ message: error.message })
    }
});

// EDIT blog w/ PUT
blogsRouter.put("/:blogId", (req, res, next) => {
    try {
        // 1. Read blogs.json obtaining an array of blogs
        const blogs = JSON.parse(fs.readFileSync(blogsJSONPath));
        
        // 2. Modify the specified blog
        const index = blogs.findIndex((blog) => blog.id === req.params.blogId);
        if (!blogIndex == -1) {
            res
            .status(404)
            .send({ message: `blog with ${req.params.blogId} was not found!`})
        }
        const updatedblog = { ...blogs[index], ...req.body };
        blogs[index] = updatedblog;

        // 3. Save the file with updated list of blogs
        fs.writeFileSync(blogsJSONPath, JSON.stringify(blogs));

        // 4. Send back a proper response
      
        res.send(updatedblog);
    } catch (error) {
        next(error)
    }
});

// DELETE
blogsRouter.delete("/:blogId", (req, res, next) => {
    try {
      const blogs = getBlogs()
  
      const remainingBlogs = books.filter(blog => blog.id !== req.params.blogId)
  
      writeBlogs(remainingBlogs)
  
      res.status(204).send()
    } catch (error) {
      next(error)
    }
  })

export default blogsRouter;

// 1. CREATE --> POST http://localhost:3001/blogs (+ body)
// 2. READ --> GET http://localhost:3001/blogs (+ optional Query Parameters)
// 3. READ --> GET http://localhost:3001/blogs/:blogId
// 4. UPDATE --> PUT http://localhost:3001/blogs/:blogId (+ body)
// 5. DELETE --> DELETE http://localhost:3001/blogs/:blogId

import express from "express"; // 3RD PARTY MODULE (does need to be installed)


import uniqid from "uniqid"; // 3RD PARTY MODULE (does need to be installed)

import createHttpError from "http-errors";

import { getBlogs, writeBlogs } from "../../lib/fs-tools.js"

import {
    checkBlogPostSchema,
    checkSearchSchema,
    checkValidationResult,
  } from "./validation.js"

const blogsRouter = express.Router(); // a Router is a set of endpoints that share something like a prefix (blogssRouter is going to share /blogss as a prefix)

//POST
blogsRouter.post("/",
checkBlogPostSchema,
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
    await writeBlogs(blogs)

    // 5. Send new blog back as response

    res.status(201).send({ id: newblog.id });
  } catch (error) {
   next(error);
  }
});

//GET
blogsRouter.get("/", async (req, res, next) => {
  try {
      // 1. Read the content of blogs.json file
    
      const blogs = await getBlogs()
      if (req.query && req.query.title) {
        const filteredBlogs = blogs.filter(blog => blog.title === req.query.title)
      } else {
        
        // 2. Send it back as a response
        res.send(blogs);
      }

  } catch (error) {
    next(error)
  }
});

//GET INDIVIDUAL blog
blogsRouter.get("/:blogId", (req, res, next) => {
    try {
        // 1. Read the content of blogs.json file (obtaining an array)
        const blogs = JSON.parse(fs.readFile(blogsJSONPath));
      
        // 2. Find the blog by id in the array
      
        const blogs = await getBlogs()

        const blog = blogs.find(b => b.id === req.params.blogId)
        if (blog) {
          // 3. Send the blog as a response 200
            res.send(blog)
          } else {
            next(createHttpError(404, `Blog with id ${req.params.blogId} not found!`))
          }
    } catch (error) {
       next(error)
    }
  })

// EDIT blog w/ PUT
blogsRouter.put("/:blogId", (req, res, next) => {
    try {
        // 1. Read blogs.json obtaining an array of blogs
        const blogs = await getBlogs()
        
        // 2. Modify the specified blog
        const index = blogs.findIndex((blog) => blog.id === req.params.blogId);

        const blogToModify = blogs[index]
        const updatedFields = req.body

        const updatedblog = { ...blogsToModify, ...updatedFields };

        blogs[index] = updatedblog;

        // 3. Save the file with updated list of blogs
        await writeBlogs(blogs)

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
      res.status(500).send({ message: error.message })
    }
  })

  //SEARCH

    //const getBlogs = () => JSON.parse(fs.readFile(blogsJSONPath))
    //const writeBlogs = content => fs.writeFile(blogsJSONPath, JSON.stringify(content))

  blogsRouter.get(
      "/search",
      checkSearchSchema,
      checkValidationResult,
      async (req, res, next) => {
          try {
             const { title } =req.query
             const blogs = getBlogs() 
             const filtered = blogs.filter((blog) =>
             blog.title.toLowerCase().includes(title.toLowerCase())
             )
             res.send(filtered)
          } catch (error) {
              res.status(500).send({ message: error.message })
          }
      }
  )

export default blogsRouter;

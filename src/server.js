import express from "express" // NEW IMPORT SYNTAX (remember to add type: "module" in package.json to use new syntax)
import listEndpoints from "express-list-endpoints"
import cors from "cors"
import { join } from "path"

import authorsRouter from "./services/authors/index.js"
import blogsRouter from "./services/blogs/index.js"
import filesRouter from "./services/files/index.js"

import { genericErrorHandler, badRequestHandler, unauthorizedHandler, notFoundHandler } from "./errorHandlers.js"

const server = express()

const publicFolderPath = join(process.cwd(), "./public")

server.use(express.static(publicFolderPath))

server.use(cors()) // You need this line to make the FRONTEND communicate with the BACKEND

server.use(express.json()) // If I do NOT specify this line BEFORE the endpoints, all the requests' bodies will be UNDEFINED

// *********************** ENDPOINTS ***************************
server.use("/authors", authorsRouter) // all of the endpoints which are in the authorsRouter will have /authors as a prefix

server.use("/blogs", blogsRouter) // all endpoints in the blogsRouter will have /blogs as a prefix

server.use("/files", filesRouter)

// *********************** ERROR MIDDLEWARES ***************************

server.use(badRequestHandler)
server.use(unauthorizedHandler)
server.use(notFoundHandler)
server.use(genericErrorHandler)

const port = 3001

console.table(listEndpoints(server))

server.listen(port, () => {
  console.log("Server running on port:", port)
})

server.on("error", (error) => console.log(`Server is not running: ${error}`))
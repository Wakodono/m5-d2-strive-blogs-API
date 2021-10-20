import express from "express" // NEW IMPORT SYNTAX (remember to add type: "module" in package.json to use new syntax)
import listEndpoints from "express-list-endpoints"
import cors from "cors"
import authorsRouter from "./services/authors/index.js"

const server = express()

server.use(cors())
server.use(express.json()) // If I do NOT specify this line BEFORE the endpoints, all the requests' bodies will be UNDEFINED

// ************************ ENDPOINTS **********************

server.use("/authors", authorsRouter) // all of the endpoints which are in the authorsRouter will have /authors as a prefix

const port = 3001

console.table(listEndpoints(server))

server.listen(port, () => {
  console.log("Server running on port:", port)
})

server.on("error", (error) => console.log(`Server is not running: ${error}`))
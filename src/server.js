/* import express from "express" // NEW IMPORT SYNTAX (remember to add type: "module" in package.json to use new syntax//)
 
const server = express()

server.use(express.json()) // If I do NOT specify this line BEFORE the endpoints, all the requests' bodies will be UNDEFINED
// Remember to add the following line of code if you need to handle requests containing a json payload

// ************************ ENDPOINTS **********************

//server.use("/authors", authorsRouter)

const port = 3001

server.listen(port, () => {
    console.log("Server is running on port: ", port)
}) */

console.log("yooooo!!!")
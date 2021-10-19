import express from "express" // 3RD PARTY MODULE (NEEDS to be installed)
import fs from "fs" // CORE MODULE (doesn't need to be installed)
import { fileURLToPath } from "url" // CORE MODULE 
import { dirname, join } from "path" // CORE MODULE 
import uniqid from "uniqid" // 3RD PARTY MODULE (NEEDS to be installed)

const authorsRouter = express.Router() // a Router is a set of endpoints that share something like a prefix (authorsRouter is going to share /authors as a prefix)

// ********************* how to find out the path *************
// 1. Start from the current file  (src\services\authors\index.js) and get the path to that file
const currentFilePath = fileURLToPath(import.meta.url)
// 2. Get the parent folder's path
const parentFolderPath = dirname(currentFilePath)
// 3. Concatenate the parent's folder path with authors.json
const authorsJSONPath = join(parentFolderPath, "authors.json") // DO NOT EVER USE '+' TO CONCATENATE TWO PATHS, USE JOIN INSTEAD
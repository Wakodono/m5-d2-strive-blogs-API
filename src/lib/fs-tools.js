import fs from "fs-extra" // fs-extra gives us same methods of fs (plus some extras) and gives us PROMISES!
import { fileURLToPath } from "url"
import { dirname, join } from "path"

const { readJSON, writeJSON, createReadStream } = fs // readJSON and writeJSON are not part of the "normal" fs module

const dataFolderPath = join(dirname(fileURLToPath(import.meta.url)), "../data")

const blogsJSONPath = join(dataFolderPath, "blogs.json")
const authorsJSONPath = join(dataFolderPath, "authors.json")
const publicFolderPath = join(process.cwd(), "./public/img/authors") // process.cwd() gives the path to the folder in which package.json is (ROOT OF THE PROJECT)

export const getBlogs = () => readJSON(blogsJSONPath)
export const writeBlogs = content => writeJSON(blogsJSONPath, content)

export const getAuthors = () => readJSON(authorsJSONPath)
export const writeAuthors = content => writeJSON(authorsJSONPath, content)

export const saveAuthorsPictures = (fileName, contentAsBuffer) => writeFile(join(publicFolderPath, fileName), contentAsBuffer)

export const getBlogsReadableStream = () => createReadStream(blogsJSONPath)
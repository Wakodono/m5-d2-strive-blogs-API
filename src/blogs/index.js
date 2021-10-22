import express from "express"; // 3RD PARTY MODULE (does need to be installed)
import fs from "fs"; // CORE MODULE (doesn't need to be installed)
import { fileURLToPath } from "url"; // CORE MODULE (doesn't need to be installed)
import { dirname, join } from "path"; // CORE MODULE (doesn't need to be installed)
import uniqid from "uniqid"; // 3RD PARTY MODULE (does need to be installed)

const blogssRouter = express.Router(); // a Router is a set of endpoints that share something like a prefix (blogssRouter is going to share /blogss as a prefix)
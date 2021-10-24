import express from "express"
import multer from "multer"

import { saveAuthorsPictures } from "../../lib/fs-tools.js"

const filesRouter = express.Router()

filesRouter.post("/:authorID/uploadSingle", multer().single("profilePic"), async (req, res, next) => {
    try {
      await saveAuthorsPictures(req.file.originalname, req.file.buffer)
      res.send("ok")
    } catch (error) {
      next(error)
    }
  })

  filesRouter.post("/uploadMultiple", multer().array("profilePic"), async (req, res, next) => {
    try {
      const arrayOfPromises = req.files.map(file => saveAuthorsPictures(file.originalname, file.buffer))
      await Promise.all(arrayOfPromises)
      res.send("OK")
    } catch (error) {
      next(error)
    }
  })

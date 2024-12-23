import { Router } from "express"
import {
  createFile,
  deleteAllFiles,
  deleteFile,
  getFile,
  getThumbnail,
  updateFile,
} from "../controlers/files.js"
import { checkAuth } from "../middleware/auth.js"
import { upload, uploadMiddleware } from "../middleware/storage.js"

//for test --> box sdk
// import cloudinary from "../config/cloudinary.js"
//--------------------

const router = Router()

//for test --> box sdk
// router.get("/getFolders", async (req, res, next) => {
//   cloudinary.api
//     .root_folders()
//     .then((result) => {
//       console.log(result)
//       res.status(200).send(result)
//     })
//     .catch((error) => {
//       console.log(error)
//       res.status(400).send({ error })
//     })
// })
//--------------------

router.get("/:filename", checkAuth, getFile)
router.get("/thumbnail/:filename", checkAuth, getThumbnail)
router.post("/", checkAuth, uploadMiddleware.single("file"), createFile)
router.patch("/:id", checkAuth, uploadMiddleware.single("file"), updateFile)
router.delete("/:id", checkAuth, deleteFile)
router.delete("/all/delete", checkAuth, deleteAllFiles)

export { router }

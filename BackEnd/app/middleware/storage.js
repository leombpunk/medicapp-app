import * as dotenv from "dotenv"
import multer from "multer"
import fs from "fs"
import { getStoragePath } from "../constants/storage.js"

dotenv.config()

// ------------------WINDOWS---------------------
// import { fileURLToPath } from 'url'
// import { dirname, join } from 'path'

// const destinationFunction = (request, file, callback) => {
//     const __filename = fileURLToPath(new URL('..', import.meta.url))
//     const __dirname = dirname(__filename);
//     const pathStorage = join(__dirname, 'storage');

//     if (!fs.existsSync(pathStorage)) {
//         fs.mkdirSync(pathStorage)
//     }

//     callback(null, pathStorage)
// }
// ---------------FIN-----------------

const destinationFunction = (request, file, callback) => {
  const pathStorage = getStoragePath()

  if (!fs.existsSync(pathStorage)) {
    fs.mkdirSync(pathStorage)
  }

  callback(null, pathStorage)
}

const filenameFunction = (request, file, callback) => {
  //const filename = file.originalname
  //const extension = file.mimetype.split('/').pop()
  const extension = file.originalname.split(".").pop()
  const filename = `file-${Date.now()}.${extension}`
  callback(null, filename)
}

const storage =
  process.env.CLOUD_STORAGE === '1'
    ? multer.memoryStorage()
    : multer.diskStorage({
        destination: destinationFunction,
        filename: filenameFunction,
      })

const limits = {
  fileSize: 20971520, //20MB
  files: 1, //maximo 5 archivos por vez
}
const fileFilter = (req, file, cb) => {
  try {
    const acceptExt = [
      "image/png",
      "image/gif",
      "image/jpeg",
      "image/webp",
      "application/msword",
      "application/vnd.ms-excel",
      "application/pdf",
      "application/vnd.oasis.opendocument.text",
      "application/vnd.oasis.opendocument.spreadsheet",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ]
    // console.log({file: file})
    // La función debe llamar a `cb` usando una variable del tipo boolean
    // para indicar si el archivo debería ser aceptado o no
    if (acceptExt.includes(file.mimetype)) {
      // Para aceptar el archivo es necesario pasar `true`, de la siguiente forma:
      cb(null, true)
    } else {
      // Para rechazar el archivo es necesario pasar `false`, de la siguiente forma:
      cb(null, false)
    }
  } catch (error) {
    // Siempre puedes pasar un error en caso de que algo salga mal:
    console.log(error)
    cb(
      new Error(
        "Solo se aceptan imagenes en los formatos: [.png, .jpeg, .gif, .webp, .doc, .xls, .pdf, .odt, .ods]"
      )
    )
  }
}

const uploadMiddleware = multer({ storage, limits, fileFilter })

const upload = (request, response, next) => {
  const file = uploadMiddleware.single("file")
  file(request, response, (error) => {
    if (error) {
      console.log(error)
    } else {
      next()
    }
  })
}

export { uploadMiddleware, upload }

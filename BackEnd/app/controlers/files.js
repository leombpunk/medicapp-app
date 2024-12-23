import * as dotenv from "dotenv"
import { httpError } from "../helpers/handleErrors.js"
import {
  handleResponse,
  handleResponseCustomStatus,
} from "../helpers/handleResponse.js"
import fs from "fs"
import File from "../models/file.js"
import { getTokenFromRequest } from "../helpers/generateToken.js"
import { helperImage, deleteImage } from "../helpers/helperImage.js"
import { getStoragePath } from "../constants/storage.js"
import cloudinary from "../config/cloudinary.js"

dotenv.config()

const cloudStorage = process.env.CLOUD_STORAGE === "1" ? "cloud" : "local"

console.log("cloudStorage", cloudStorage)

// ---------------WINDOWS-----------------
// import { fileURLToPath } from 'url'
// import { dirname, join } from 'path'

// const getFile = async (request, response) => {
//     try {
//         const filename = request.params.filename
//         const file = await File.findOne({ where: { filename } })

//         const __filename = fileURLToPath(new URL('..', import.meta.url))
//         const __dirname = dirname(__filename);
//         const filepath = join(__dirname, `storage/${file.filename}`);

//         response.status(200)
//         response.sendFile(filepath)
//     } catch (error) {
//         httpError(response, error)
//     }
// }

// const getThumbnail = async (request, response) => {
//     try {
//         const filename = request.params.filename
//         const file = await File.findOne({ where: { filename } })

//         const __filename = fileURLToPath(new URL('..', import.meta.url))
//         const __dirname = dirname(__filename);
//         const filepath = join(__dirname, `storage/thumbnail/${file.filename}`);

//         response.status(200)
//         response.sendFile(filepath)
//     } catch (error) {
//         httpError(response, error)
//     }
// }

// const deleteFile = async (request, response) => {
//     try {
//         const { id } = request.params

//         const file = await File.findOne({ where: { id } })

//         if (!file) {
//             const status = 200
//             const message = 'File is not found or does not exist'
//             handleResponse(response, status, message)
//             return
//         }

//         const filename = file?.filename
//         const __filename = fileURLToPath(new URL('..', import.meta.url))
//         const __dirname = dirname(__filename);
//         const filepath = join(__dirname, `storage/${filename}`);
//         const thumbnail = join(__dirname, `storage/thumbnail/${filename}`);

//         await file.destroy()

//         if (fs.existsSync(filepath)) {
//             fs.unlinkSync(filepath)
//         }

//         if (fs.existsSync(thumbnail)) {
//             fs.unlinkSync(thumbnail)
//         }

//         const status = 200
//         const message = 'File deleted successfully'
//         handleResponse(response, status, message)
//     } catch (error) {
//         httpError(response, error)
//     }
// }

// const deleteAllFiles = async (request, response) => {
//     try {
//         File.destroy({
//             where: {},
//             truncate: true
//         })
//         .then(() => {

//             const __filename = fileURLToPath(new URL('..', import.meta.url))
//             const __dirname = dirname(__filename);
//             const storagepath = join(__dirname, 'storage');

//             if (fs.existsSync(storagepath)) {
//                 fs.rmSync(storagepath, { recursive: true, force: true })
//             }

//             const status = 200
//             const message = 'All files deleted successfully'
//             handleResponse(response, status, message)
//         })
//         .catch(error => {
//             console.log(error)
//             const status = 500
//             const message = 'An error occurred while trying to delete all the files'
//             handleResponse(response, status, message)
//         })
//     } catch (error) {
//         httpError(response, error)
//     }
// }
// ---------------FIN-----------------

const getFile = async (request, response) => {
  try {
    const filename = request.params.filename
    const file = await File.findOne({ where: { filename } })
    let pathFile = ""
    //verificar si es local o cloud para devolver la url
    if (cloudStorage === "cloud") {
      const dataFile = await cloudinary.api.resource(file.filename)
      pathFile = dataFile.secure_url
    } else {
      const pathStorage = getStoragePath()
      pathFile = `${pathStorage}/${file.filename}`
    }

    response.status(200)
    response.sendFile(pathFile)
  } catch (error) {
    httpError(response, error)
  }
}

const getThumbnail = async (request, response) => {
  try {
    const filename = request.params.filename
    const file = await File.findOne({ where: { filename } })
    let pathFile = ""
    //verificar si es local o cloud para devolver la url
    if (cloudStorage === "cloud") {
      const dataFile = await cloudinary.api.resource(file.filename)
      pathFile = dataFile.derived[0].secure_url
    } else {
      const pathStorage = getStoragePath()
      pathFile = `${pathStorage}/thumbnail/${file.filename}`
    }

    response.status(200)
    response.sendFile(pathFile)
  } catch (error) {
    httpError(response, error)
  }
}

//subida de archivos lista
const createFile = async (request, response) => {
  try {
    const accessToken = await getTokenFromRequest(request)
    const createdBy = accessToken.id
    const { body, file } = request
    const { name, description, idPatient } = body
    let filename = file.filename

    const type = file.mimetype.split("/")[0] === "image" ? "image" : undefined

    const existingFile = await File.findOne({ where: { name, idPatient } })

    if (existingFile) {
      if (cloudStorage === "local") {
        const pathStorage = getStoragePath()
        const pathFile = `${pathStorage}/${filename}`
        const pathThumbnail = `${pathStorage}/thumbnail/${filename}`
        deleteImage(pathFile, pathThumbnail)
      }
      handleResponse(response, 409, "File already exists", existingFile)
      return
    } else {
      let fileResult = {}
      if (cloudStorage === "cloud") {
        fileResult = await new Promise((resolve) => {
          cloudinary.uploader
            .upload_stream({ folder: "medicapp" }, (error, uploadResult) => {
              return resolve(uploadResult)
            })
            .end(file.buffer)
        })
        console.log({ fileResult })
        filename = fileResult.public_id.split("/").pop()
      } else {
        // Save thumbnail (miniatura) para imagenes
        if (type === "image") {
          await helperImage(file.path, file.filename)
        }
      }
      File.create({
        name,
        filename,
        description,
        type,
        storage: cloudStorage,
        createdBy,
        idPatient,
      })
        .then((result) => {
          handleResponse(response, 201, "File create successfully", result)
          return
        })
        .catch((error) => {
          console.log(error)
          handleResponse(
            response,
            500,
            `An error occurred while trying to create the file: ${error.errors[0].message}`
          )
          return
        })
    }
  } catch (error) {
    httpError(response, error)
    return
  }
}

const updateFile = async (request, response) => {
  try {
    const { id } = request.params
    const { body, file } = request
    const filename = file?.filename
    const { name, description } = body
    const accessToken = await getTokenFromRequest(request)
    const modifiedBy = accessToken.id

    // Save thumbnail (miniatura) para imagenes
    const type = file?.mimetype.split("/")[0] === "image" ? "image" : undefined
    if (type === "image") {
      helperImage(file.path, file.filename)
    }

    const filedb = await File.findOne({ where: { id } })

    if (!filedb) {
      handleResponse(response, 404, "File is not found or does not exist")
      return
    }

    await filedb.update({ name, filename, description, modifiedBy })

    const status = 200
    const message = "File updated successfully"
    handleResponse(response, status, message, filedb)
    return
  } catch (error) {
    const errorNumber = Number(error?.original?.errno)
    if (errorNumber === 1062) {
      const httpStatus = 409
      const status = 1062
      const message = "Name duplicate"
      handleResponseCustomStatus(response, httpStatus, status, message)
      return
    }

    httpError(response, error)
  }
}

const deleteFile = async (request, response) => {
  try {
    const { id } = request.params

    const file = await File.findOne({ where: { id } })

    if (!file) {
      const status = 200
      const message = "File is not found or does not exist"
      handleResponse(response, status, message)
      return
    }
    //verificar el campo storage para eliminar el archivo (local, cloud)
    const filename = file?.filename
    const pathStorage = getStoragePath()
    const pathFile = `${pathStorage}/${filename}`
    const pathThumbnail = `${pathStorage}/thumbnail/${filename}`

    await file.destroy()

    if (fs.existsSync(pathFile)) {
      fs.unlinkSync(pathFile)
    }

    if (fs.existsSync(pathThumbnail)) {
      fs.unlinkSync(pathThumbnail)
    }

    const status = 200
    const message = "File deleted successfully"
    handleResponse(response, status, message)
  } catch (error) {
    httpError(response, error)
  }
}

const deleteAllFiles = async (request, response) => {
  try {
    File.destroy({
      where: {},
      truncate: true,
    })
      .then(() => {
        const { pathname } = new URL("..", import.meta.url)
        const storagepath = `${pathname}storage`

        if (fs.existsSync(storagepath)) {
          fs.rmSync(storagepath, { recursive: true, force: true })
        }

        const status = 200
        const message = "All files deleted successfully"
        handleResponse(response, status, message)
      })
      .catch((error) => {
        console.log(error)
        const status = 500
        const message = "An error occurred while trying to delete all the files"
        handleResponse(response, status, message)
      })
  } catch (error) {
    httpError(response, error)
  }
}

export {
  getFile,
  getThumbnail,
  createFile,
  updateFile,
  deleteFile,
  deleteAllFiles,
}

import multer from 'multer'
import fs from 'fs'
import { getStoragePath } from '../constants/storage.js'

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
    const extension = file.originalname.split('.').pop()
    const filename = `file-${Date.now()}.${extension}`
    callback(null, filename)
}

const storage = multer.diskStorage({
    destination: destinationFunction,
    filename: filenameFunction
})

const uploadMiddleware = multer({ storage })

const upload = (request, response, next) => {
    const file = uploadMiddleware.single('file')
    file(request, response, (error) => {
        if (error) {
            console.log(error)
        } else {
            next()
        }
    })
}

export { uploadMiddleware, upload }
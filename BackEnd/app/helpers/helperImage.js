import sharp from 'sharp'
import fs from 'fs'
import { getStoragePath } from '../constants/storage.js'

// ------------WINDOWS--------------
// import { dirname, join } from 'path';
// import { fileURLToPath } from 'url';

// const helperImage = (filepath, filename, size = 300) => {
//     const __filename = fileURLToPath(new URL('..', import.meta.url))
//     const __dirname = dirname(__filename);
//     const pathStorage = join(__dirname, 'storage/thumbnail');

//     if (!fs.existsSync(pathStorage)) {
//         fs.mkdirSync(pathStorage)
//     }

//     return sharp(filepath).resize(size).toFile(`${pathStorage}/${filename}`)
// }
// ---------------FIN-----------------

const helperImage = async (filepath, filename, size = 300) => {
    const pathStorage = getStoragePath()
    const pathThumbnail = `${pathStorage}/thumbnail`
    
    if (!fs.existsSync(pathStorage)) {
        fs.mkdirSync(pathStorage)
    }

    if (!fs.existsSync(pathThumbnail)) {
        fs.mkdirSync(pathThumbnail)
    }

    return await sharp(filepath).resize(size).toFile(`${pathThumbnail}/${filename}`)
}

export { helperImage }
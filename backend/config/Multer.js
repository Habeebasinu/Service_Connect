import multer from 'multer'
// import pkg from 'multer-storage-cloudinary'
import {CloudinaryStorage} from 'multer-storage-cloudinary'

import cloudinary from './Cloudinary.js'
// const { CloudinaryStorage } = pkg;

const ImageStorage =new CloudinaryStorage({
    cloudinary,
    params: {
    folder: "images",
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
  },

})

export const uploadImage = multer({ storage: ImageStorage });
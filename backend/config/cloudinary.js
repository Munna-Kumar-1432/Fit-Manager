const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
require('dotenv').config();

cloudinary.config({
    cloud_name: process.env.API_NAME,
    api_key: process.env.API_KEY_CLOUDINARY,
    api_secret: process.env.API_SECERY_KEY_CLOUDINARY
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'GYM_MEMBERS',
        allowed_formats: ['jpg', 'png', 'jpeg']
    }
});

const upload = multer({ storage: storage });

module.exports = upload;

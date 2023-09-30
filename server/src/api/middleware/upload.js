const path = require("path");
const multer = require('multer');
const fs = require('fs')
const appRoot = require('app-root-path');

const pathAdmin = `${appRoot}/src/api/public/uploads/admins/`;
const pathUser = `${appRoot}/src/api/public/uploads/users/`;
const pathProduct = `${appRoot}/src/api/public/uploads/products/`;
const pathCategory = `${appRoot}/src/api/public/uploads/categorys/`;

// Function Validate extFile
const imageFilter = function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

// Function Check Duplicate Name
const handleDuplicateNames = (fileFull, pathData) => {
    let baseName = path.basename(fileFull, path.extname(fileFull))
    let extName = path.extname(fileFull)
    fileExists = fs.existsSync(`${pathData}${baseName}${extName}`);
    return fileExists ? fileName = `${baseName}_${Date.now()}${extName}` : fileName = fileFull
}

// Upload Single Photo
const storageUploadSinglePhoto = (name, model) => {
    let pathImage

    switch (model) {
        case 'category':
            pathImage = pathCategory
            break;
        case 'user':
            pathImage = pathUser
            break;
        case 'admin':
            pathImage = pathAdmin
            break;
        default:
            break;
    }

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, pathImage)
        },
        filename: (req, file, cb) => {
            let fileName = handleDuplicateNames(file.originalname, pathImage)
            cb(null, fileName)
        }
    })
    return multer({ storage: storage, fileFilter: imageFilter }).single(name)

}

// Upload Single and Multiple Product
const storageUploadPhotoProduct = () => {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, pathProduct)
        },
        filename: (req, file, cb) => {

            let fileName = handleDuplicateNames(file.originalname, pathProduct)
            cb(null, fileName)
        }
    })
    return multer({ storage: storage, fileFilter: imageFilter })
}

module.exports = {
    storageUploadSinglePhoto,
    storageUploadPhotoProduct,
}
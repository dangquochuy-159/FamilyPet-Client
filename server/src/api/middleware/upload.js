const path = require("path");
const multer = require('multer');
const fs = require('fs')
const appRoot = require('app-root-path');

const pathAdmin = `${appRoot}/src/api/public/uploads/admins/`;
const pathUser = `${appRoot}/src/api/public/uploads/users/`;

const imageFilter = function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

const handleDuplicateNames = (fileFull, pathData) => {
    let baseName = path.basename(fileFull, path.extname(fileFull))
    let extName = path.extname(fileFull)
    fileExists = fs.existsSync(`${pathData}${baseName}${extName}`);
    return fileExists ? fileName = `${baseName}_${Date.now()}${extName}` : fileName = fileFull
}

// Upload Avatar Admin
const storageAvatarAdmin = () => {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, pathAdmin)
        },
        filename: (req, file, cb) => {
            let fileName = handleDuplicateNames(file.originalname, pathAdmin)
            cb(null, fileName)
        }
    })
    return multer({ storage: storage, fileFilter: imageFilter }).single('avatar')
}

// Upload Avatar User
const storageAvatarUser = () => {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, pathUser)
        },
        filename: (req, file, cb) => {
            let fileName = handleDuplicateNames(file.originalname, pathUser)
            cb(null, fileName)
        }
    })
    return multer({ storage: storage, fileFilter: imageFilter }).single('avatar')
}

module.exports = {
    storageAvatarAdmin,
    storageAvatarUser,
}
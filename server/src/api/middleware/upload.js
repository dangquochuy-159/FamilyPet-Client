const path = require("path");
const multer = require('multer');
const fs = require('fs')
const appRoot = require('app-root-path');

const pathAdmin = `${appRoot}/api/public/uploads/admins/`;

const imageFilter = function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

const handleDuplicateNames = (fileFull, pathAdmin) => {
    let baseName = path.basename(fileFull, path.extname(fileFull))
    let extName = path.extname(fileFull)
    fileExists = fs.existsSync(`${pathAdmin}${baseName}${extName}`);
    return fileExists ? fileName = `${baseName}_${Date.now()}${extName}` : fileName = fileFull
}

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


module.exports = {
    storageAvatarAdmin
}
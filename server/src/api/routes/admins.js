const express = require("express");
const adminRouter = express.Router()

// Middleware
const { storageUploadSinglePhoto } = require('../middleware/upload')

// Controller
const {
    getListAdmins,
    getOneAdmin,
    getAvatarAdmin,
    addAdmin,
    removeAdmin,
    removeAvatarAdmin,
    updateOneAdmin,
    updateAvatarAdmin
} = require('../controllers/AdminController')

adminRouter
    .get('/', getListAdmins)
    .get('/:id', getOneAdmin)
    .get('/:id/:name_avt', getAvatarAdmin)

    .post('/', storageUploadSinglePhoto('avatar', 'admin'), addAdmin)

    .delete('/:id', removeAdmin)
    .delete('/:id/avatar', removeAvatarAdmin)

    .put('/:id', storageUploadSinglePhoto('avatar', 'admin'), updateOneAdmin)
    .put('/:id/:name_avt', updateAvatarAdmin)

module.exports = adminRouter
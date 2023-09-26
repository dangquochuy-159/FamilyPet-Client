const express = require("express");
const adminRouter = express.Router()

// Middleware
const { storageAvatarAdmin } = require('../middleware/upload')

// Controller
const {
    getListAdmins,
    getOneAdmin,
    getAvatarAdmin,
    getListAvatarAdmin,
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
    .get('/:id/avatar/list', getListAvatarAdmin)

    .post('/', storageAvatarAdmin(), addAdmin)

    .delete('/:id', removeAdmin)
    .delete('/:id/avatar', removeAvatarAdmin)

    .put('/:id', storageAvatarAdmin(), updateOneAdmin)
    .put('/:id/:name_avt', updateAvatarAdmin)

module.exports = adminRouter
const express = require("express");
const adminRouter = express.Router()

// Middleware
const { storageAvatarAdmin } = require('../middleware/upload')

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
    .get('/:id/avatar', getAvatarAdmin)

    .post('/', storageAvatarAdmin(), addAdmin)

    .delete('/:id', removeAdmin)
    .delete('/:id/avatar', removeAvatarAdmin)

    .put('/:id', updateOneAdmin)
    .put('/:id/avatar', updateAvatarAdmin)

module.exports = adminRouter
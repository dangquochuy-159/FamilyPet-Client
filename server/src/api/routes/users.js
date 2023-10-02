const express = require("express");
const userRouter = express.Router()

// Middleware
const { storageUploadSinglePhoto } = require('../middleware/upload')

// Controller
const {
    getListUsers,
    getOneUser,
    getSearchAccountUser,
    getAvatarUser,
    addUser,
    removeUser,
    removeAvatarUser,
    removeSomeProductCart,
    updateOneUser,
    updateAvatarUser,
    updateCart
} = require('../controllers/UserController')

userRouter
    .get('/', getListUsers)
    .get('/search', getSearchAccountUser)
    .get('/:id', getOneUser)
    .get('/:id/:name_avt', getAvatarUser)

    .post('/', storageUploadSinglePhoto('avatar', 'user'), addUser)

    .delete('/:id', removeUser)
    .delete('/:id/avatar', removeAvatarUser)
    .delete('/:id/cart/:id_product', removeSomeProductCart)

    .put('/:id', storageUploadSinglePhoto('avatar', 'user'), updateOneUser)
    .put('/:id/:name_avt', updateAvatarUser)
    .put('/:id/cart/:id_product', updateCart)

module.exports = userRouter
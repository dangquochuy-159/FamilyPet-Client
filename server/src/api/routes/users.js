const express = require("express");
const userRouter = express.Router()

// Middleware
const { storageAvatarUser } = require('../middleware/upload')

// Controller
const {
    getListUsers,
    getOneUser,
    getAvatarUser,
    addUser,
    removeUser,
    removeAvatarUser,
    updateOneUser,
    updateAvatarUser,
    updateCart
} = require('../controllers/UserController')

userRouter
    .get('/', getListUsers)
    .get('/:id', getOneUser)
    .get('/:id/:name_avt', getAvatarUser)

    .post('/', storageAvatarUser(), addUser)

    .delete('/:id', removeUser)
    .delete('/:id/avatar', removeAvatarUser)

    .put('/:id', storageAvatarUser(), updateOneUser)
    .put('/:id/:name_avt', updateAvatarUser)
    .put('/:id/cart/:id_product/:quantity/:price', updateCart)

module.exports = userRouter
const express = require("express");
const categoryRouter = express.Router()

// Middleware
const { storageUploadSinglePhoto } = require('../middleware/upload')

// Controller
const {
    getListCategorys,
    getOneCategory,
    getPhotoCategory,
    addCategory,
    removeCategory,
    updateOneCategory
} = require('../controllers/CategoryController')

categoryRouter
    .get('/', getListCategorys)

    .get('/:id', getOneCategory)
    .get('/:id/:photo', getPhotoCategory)

    .post('/', storageUploadSinglePhoto('photo', 'category'), addCategory)

    .delete('/:id', removeCategory)

    .put('/:id', storageUploadSinglePhoto('photo', 'category'), updateOneCategory)

module.exports = categoryRouter
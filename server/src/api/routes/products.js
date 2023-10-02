const express = require("express");
const productRouter = express.Router()

// Middleware
const {
    storageUploadPhotoProduct,
} = require('../middleware/upload')

const {
    getListProduct,
    searchProduct,
    filterProduct,
    getOneProduct,
    getPhotoProduct,
    addProduct,
    removeProduct,
    updateProduct,
} = require('../controllers/ProductController')

productRouter
    .get('/', getListProduct)
    .get('/search', searchProduct)
    .get('/filter', filterProduct)
    .get('/:id', getOneProduct)
    .get('/:id/:photo', getPhotoProduct)

    .post('/', storageUploadPhotoProduct().fields([{ name: 'photo' }, { name: 'photo_detail' }]), addProduct)

    .delete('/:id', removeProduct)

    .put('/:id', storageUploadPhotoProduct().fields([{ name: 'photo' }, { name: 'photo_detail' }]), updateProduct)

module.exports = productRouter;
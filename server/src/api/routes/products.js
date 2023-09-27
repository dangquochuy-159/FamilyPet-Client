const express = require("express");
const productRouter = express.Router()

// Middleware
const {
    storagePhotoProduct,
    uploadPhotoProduct
} = require('../middleware/upload')


const {
    getListProduct,
    searchProduct,
    filterProduct,
    getOneProduct,
    addProduct,
    removeProduct,
    updateProduct,
} = require('../controllers/ProductController')

productRouter
    .get('/', getListProduct)
    .get('/search', searchProduct)
    .get('/filter', filterProduct)
    .get('/:id', getOneProduct)

    .post('/', uploadPhotoProduct().fields([{ name: 'photo' }, { name: 'photo_detail' }]), addProduct)

    .delete('/:id', removeProduct)

    .put('/:id', uploadPhotoProduct().fields([{ name: 'photo' }, { name: 'photo_detail' }]), updateProduct)

module.exports = productRouter;
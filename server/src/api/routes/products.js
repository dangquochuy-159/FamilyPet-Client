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
    addProduct,
} = require('../controllers/ProductController')

productRouter
    .get('/', getListProduct)
    .get('/search', searchProduct)
    .get('/filter', filterProduct)
    .post('/', uploadPhotoProduct().fields([{ name: 'photo' }, { name: 'photo_detail' }]), addProduct)
//  .get('/:id', getOneProduct)


// upload.fields([{ name: 'singleFile' }, { name: 'multiFiles' }])

module.exports = productRouter;
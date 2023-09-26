const express = require("express");
const productRouter = express.Router()

// Middleware
const { storageAvatarAdmin } = require('../middleware/upload')

const { } = require('../controllers/ProductController')

productRouter


module.exports = productRouter;
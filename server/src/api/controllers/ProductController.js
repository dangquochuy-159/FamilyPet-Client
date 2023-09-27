const express = require("express");
const bcrypt = require('bcrypt');
const path = require("path");
const fs = require('fs')
const appRoot = require('app-root-path');

const Product = require('../models/ProductModel')

const pathProduct = '/src/api/public/uploads/products/'

// GET /api/products
const getListProduct = (req, res, next) => {
    Product.find()
        .then((products) => {
            res.json(products)
        })
        .catch(next)
}

// GET /api/products/search?name=&type=
const searchProduct = (req, res, next) => {
    Product.find()
        .then((products) => {
            res.json({
                name: req.query.name,
                less: req.query.type,
            })
        })
        .catch(next)
}

// GET /api/products/filter?filter=&q=&type=
const filterProduct = (req, res, next) => {
    let q, less, filter
    Product.find()
        .then((products) => {
            switch (req.query.filter) {
                case 'price':
                    filter = req.query.filter
                    q = req.query.q
                    less = req.query.type
                    break;
                case 'category':
                    filter = req.query.filter
                    q = req.query.q
                    less = req.query.type
                    break;
                case 'origin':
                    filter = req.query.filter
                    q = req.query.q
                    less = req.query.type
                    break;
                default:
                    break;
            }
            res.json({
                filter: filter,
                q: q,
                less: less
            })
        })
        .catch(next)
}

// GET /api/products/:id
const getOneProduct = (req, res, next) => {
    Product.findById(req.params.id)
        .then((product) => {
            res.json(product)
        })


}

// POST /api/products
const addProduct = (req, res, next) => {
    const photoStr = req.files.photo.map(file => file.originalname).join()
    const photo_detail = req.files.photo_detail.map(file => file.originalname)

    const product = new Product({
        name: req.body.name,
        category: req.body.category,
        des: req.body.des,
        origin: req.body.origin,
        quantity: Number(req.body.quantity),
        price: Number(req.body.price),
        sale_price: Number(req.body.sale_price),
        photo: photoStr,
        photo_detail: photo_detail,
        status: {
            in_stock: req.body.quantity > 5,
            out_stock: req.body.quantity <= 5 && req.body.quantity > 0,
            low_stock: req.body.quantity == 0,
        }
    })
        .save()
        .then(() => {
            res.json("Thêm thành công")
        })
        .catch(next)
}

// DELETE /api/products/:id
const removeProduct = (req, res, next) => {
    Product.findOneAndDelete({ _id: req.params.id })
        .then(product => {
            let photo = product.photo
            let photo_detail = product.photo_detail
            let namePhoto
            let pathPhoto
            photo_detail.push(photo)
            for (let pt of photo_detail) {
                namePhoto = pt
                pathPhoto = appRoot + pathProduct + namePhoto
                fs.unlink(pathPhoto, (err) => {
                    if (err) {
                        return
                    }
                })
            }
            res.status(200).json({
                error: 'Delete thành công',
            });
        })
        .catch(next)
}

// PUT /api/products/:id
const updateProduct = (req, res, next) => {



    const updateProduct = {}
    for (let key in req.body) {
        if (req.body[key] !== '') {
            updateProduct[key] = req.body[key];
        }
    }
    if (req.files) {
        if (req.files.photo) {
            updateProduct.photo = req.files.photo.map(file => file.originalname).join()
        }
        if (req.files.photo_detail) {
            updateProduct.photo_detail = req.files.photo_detail.map(file => file.originalname)
        }

    }
    updateProduct.status = {
        in_stock: req.body.quantity > 5,
        out_stock: req.body.quantity <= 5 && req.body.quantity > 0,
        low_stock: req.body.quantity == 0,
    }
    Product.findByIdAndUpdate(req.params.id, updateProduct, { new: true })
        .then((product) => {
            res.status(200).json({
                error: 'Update thành công',
                product: product
            });
        })
        .catch(next)
}
module.exports = {
    getListProduct,
    searchProduct,
    filterProduct,
    getOneProduct,
    addProduct,
    removeProduct,
    updateProduct,
}
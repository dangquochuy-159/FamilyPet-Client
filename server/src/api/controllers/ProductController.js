const express = require("express");
const bcrypt = require('bcrypt');
const path = require("path");
const fs = require('fs')
const appRoot = require('app-root-path');

const Product = require('../models/ProductModel')

const pathProduct = '/src/api/public/uploads/products/'

const getListProduct = (req, res, next) => {
    Product.find()
        .then((products) => {
            res.json(products)
        })
        .catch(next)
}


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

const addProduct = (req, res, next) => {

    // const fileNames = req.files.map(file => file.originalname);
    const photo = req.files.photo.map(file => file.originalname)
    const photo_detail = req.files.photo_detail.map(file => file.originalname)
    let photoStr
    for (let pt of photo) {
        photoStr = pt
    }
    const product = new Product({
        name: req.body.name,
        category: req.body.category,
        des: req.body.des,
        origin: req.body.origin,
        quantity: Number(req.body.quantity),
        price: Number(req.body.price),
        sale_price: Number(req.body.sale_price),
        photo: photoStr,
        photo_detail: photo_detail
    })
        .save()
        .then(() => {
            res.json("Thêm thành công")
        })
        .catch(next)
}
module.exports = {
    getListProduct,
    searchProduct,
    filterProduct,
    addProduct,
}
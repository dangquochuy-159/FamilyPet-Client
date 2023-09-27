const express = require("express");
const bcrypt = require('bcrypt');
const path = require("path");
const fs = require('fs')
const appRoot = require('app-root-path');

const Category = require('../models/CategoryModel');

const pathCategory = '/src/api/public/uploads/categorys/'

// GET /api/categorys
const getListCategorys = (req, res, next) => {
    Category.find()
        .then(categorys => {
            res.json(categorys)
        })
        .catch(next);
}

// GET /api/categorys/:id
const getOneCategory = (req, res, next) => {
    Category.findById(req.params.id)
        .then(category => {
            res.json(category)
        })
        .catch(next);
}

// GET /api/categorys/:id/:photo
const getPhotoCategory = (req, res, next) => {
    Category.findById(req.params.id)
        .then(() => {
            let photoPath = appRoot + pathCategory + req.params.photo;
            res.sendFile(photoPath);
        })
        .catch(next);
}

// POST /api/categorys
const addCategory = (req, res, next) => {
    const category = new Category({
        name: req.body.name,
        photo: req.file.filename,
    })
        .save()
        .then(() => {
            res.json("Thêm thành công")
        })
        .catch(next)
}

// DELETE /api/categorys/:id
const removeCategory = (req, res, next) => {
    Category.findOneAndDelete({ _id: req.params.id })
        .then((category) => {
            let photoPath = appRoot + pathCategory + category.photo

            fs.unlink(photoPath, (err) => {
                if (err) {
                    console.error(err)
                    return
                }
            })
            res.status(200).json({
                error: 'Delete thành công',
            });
        })
        .catch(next)
}

// PUT /api/categorys/:id
const updateOneCategory = (req, res, next) => {

    const updateData = {}
    if (req.body.name !== "") {
        updateData.name = req.body.name
    }
    if (req.file) {
        updateData.photo = req.file.filename
    }
    Category.findByIdAndUpdate({ _id: req.params.id }, updateData)

        .then(() => {
            res.status(200).json({
                error: 'Update thành công',
            });
        })

        .catch(next)
}

module.exports = {
    getListCategorys,
    getOneCategory,
    getPhotoCategory,
    addCategory,
    removeCategory,
    updateOneCategory
}
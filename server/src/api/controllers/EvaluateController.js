const express = require("express");
const bcrypt = require('bcrypt');
const path = require("path");
const fs = require('fs')
const appRoot = require('app-root-path');

const Evaluate = require('../models/EvaluateModel')
const Product = require('../models/ProductModel')

const pathEvaluate = '/src/api/public/uploads/evaluates/'

// GET /api/evaluates
const getListEvaluate = (req, res, next) => {
    Evaluate.find()
        .then((evaluates) => {
            res.json(evaluates)
            // res.send('huy')
        })
        .catch(next)

}

// POST /api/evaluates
const addEvaluate = (req, res, next) => {
    const evaluate = new Evaluate({
        id_customer: req.body.id_customer,
        id_product: req.body.id_product,
        content: req.body.content,
        star: Number(req.body.star),
    })
        .save()
        .then(() => {
            Product.updateOne({ _id: req.body.id_product }, {
                $inc: {
                    star: Number(req.body.star),
                    total_eval: 1
                }
            })
                .then((product) => {
                    res.json({
                        message: 'post success',
                        data: req.body
                    })
                })
        })
}

// DELETE /api/evaluates/:id
const removeEvaluate = (req, res, next) => {
    Evaluate.deleteOne({ _id: req.params.id })
        .then(() => {
            res.json('delete success')
        })
}

//PUT /api/evaluates/:id
const updateEvaluate = (req, res, next) => {
    Evaluate.updateOne({ _id: req.params.id }, {
        $set: {
            content: req.body.content,
            star: Number(req.body.star)
        }
    })
        .then(() => {
            res.json('update success')
        })
}
module.exports = {
    getListEvaluate,
    addEvaluate,
    removeEvaluate,
    updateEvaluate,
}
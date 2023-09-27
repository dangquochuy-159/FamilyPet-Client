const express = require('express')
const orderRouter = require()

const {
    getListOrder,
    getOneOrder,
    getDetailOrder,
    addOrder
} = require('../controllers/OrderController')

orderRouter
    .get('/', getListOrder)
    .get('/:id', getOneOrder)
    .get('/:id/detail', getDetailOrder)

    .post('/', addOrder)




module.exports = orderRouter
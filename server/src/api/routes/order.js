const express = require('express')
const orderRouter = express.Router()

const {
    getListOrder,
    getOneOrder,
    getDetailOrder,
    addOrder,
    updateStatusOrder
} = require('../controllers/OrderController')

orderRouter
    .get('/', getListOrder)
    .get('/:id', getOneOrder)
    .get('/:id/detail', getDetailOrder)

    .post('/', addOrder)

    .put('/:id', updateStatusOrder)


module.exports = orderRouter
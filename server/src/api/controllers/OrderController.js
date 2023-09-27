const express = require("express");
const bcrypt = require('bcrypt');
const path = require("path");
const fs = require('fs')

const Order = require('../controllers/Order');

// GET /api/orders
const getListOrder = (req, res, next) => { }

// GET /api/orders/:id
const getOneOrder = (req, res, next) => { }

// GET /api/orders/:id/detail
const getDetailOrder = (req, res, next) => { }

// POST /api/orders
const addOrder = (req, res, next) => { }

module.exports = {
    getListOrder,
    getOneOrder,
    getDetailOrder,
    addOrder
}
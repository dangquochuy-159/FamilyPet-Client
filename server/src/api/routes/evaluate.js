const express = require("express");
const evaluateRouter = express.Router();

const {
    getListEvaluate,
    addEvaluate,
    removeEvaluate,
    updateEvaluate,
} = require('../controllers/EvaluateController')

evaluateRouter
    .get('/', getListEvaluate)

    .post('/', addEvaluate)

    .delete('/:id', removeEvaluate)

    .put('/:id', updateEvaluate)


module.exports = evaluateRouter
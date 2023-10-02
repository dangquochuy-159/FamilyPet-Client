const Evaluate = require('../models/EvaluateModel')
const Product = require('../models/ProductModel')

// GET /api/evaluates
const getListEvaluate = (req, res, next) => {
    Evaluate.find()
        .then((evaluates) => {
            res.json(evaluates)
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
                .then(() => {
                    res.status(200).json({
                        message: 'Post Success'
                    });
                })
        })
}

// DELETE /api/evaluates/:id
const removeEvaluate = (req, res, next) => {
    Evaluate.deleteOne({ _id: req.params.id })
        .then(() => {
            res.status(200).json({
                message: 'Delete Success'
            });
        })
}

//PUT /api/evaluates/:id
const updateEvaluate = (req, res, next) => {
    Evaluate.findByIdAndUpdate(req.params.id, {
        $set: {
            content: req.body.content,
            star: Number(req.body.star)
        }
    })
        .then((evaluate) => {
            let starChange = Number(req.body.star) - evaluate.star
            return Product.updateOne({ _id: evaluate.id_product }, { $inc: { star: starChange } })
                .then(() => {
                    res.status(200).json({
                        message: 'Update Success'
                    });
                })

        })
}
module.exports = {
    getListEvaluate,
    addEvaluate,
    removeEvaluate,
    updateEvaluate,
}
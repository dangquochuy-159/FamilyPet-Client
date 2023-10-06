const Promote = require('../models/PromoteModel');

// GET /api/promotes
const getListPromote = (req, res, next) => {
    Promote.find()
        .then(promotes => {
            res.json({
                data: promotes,
                message: 'success'
            });
        })
}

// GET /api/promotes/:id
const getPromote = (req, res, next) => {
    Promote.findById(req.params.id)
        .then(promote => {
            res.json({
                data: promote,
                message: 'success'
            });
        })
}

// POST /api/promotes
const addPromote = (req, res, next) => {
    const promote = new Promote({
        code: req.body.code,
        des: req.body.des,
        reduce: req.body.reduce,
        point: req.body.point,
    })
        .save()
        .then(() => {
            res.status(200).json({
                message: 'success'
            });
        })
        .catch(next)
}

// DELETE /api/promotes/:id
const removePromote = (req, res, next) => {
    Promote.deleteOne({ _id: req.params.id })
        .then(() => {
            res.status(200).json({
                message: 'success'
            });
        })
}

// PUT /api/promotes/:id
const updatePromote = (req, res, next) => {
    const updatePromote = {}
    for (let key in req.body) {
        if (req.body[key] !== '') {
            updatePromote[key] = req.body[key];
        }
    }
    Promote.updateOne({ _id: req.params.id }, updatePromote)
        .then(() => {
            res.status(200).json({
                message: 'success'
            });
        })
}


module.exports = {
    getListPromote,
    getPromote,
    addPromote,
    removePromote,
    updatePromote,
}
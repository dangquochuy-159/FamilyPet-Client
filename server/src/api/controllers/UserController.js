const express = require("express");
const bcrypt = require('bcrypt');
const path = require("path");
const fs = require('fs')
const appRoot = require('app-root-path');

const User = require('../models/UserModel');

const pathUser = '/src/api/public/uploads/users/'

// GET /api/users
const getListUsers = (req, res, next) => {
    User.find({})
        .then((users) => {
            res.json(users)
        })
        .catch(next)
}

// GET /api/users/:id
const getOneUser = (req, res, next) => {
    User.findById(req.params.id)
        .then((user) => {
            res.json(user)
        })
        .catch(next)
}

// GET /api/users/:id/:name_avt
const getAvatarUser = (req, res, next) => {
    User.findById(req.params.id)
        .then((user) => {
            let avatarPath = appRoot + pathUser + req.params.name_avt;
            // Đọc tệp hình ảnh và gửi nó về client
            res.sendFile(avatarPath);
        })
        .catch(next)
}

// POST /api/users
const addUser = (req, res, next) => {

    let add = `${req.body.ward} / ${req.body.district} / ${req.body.province}`
    const user = new User({
        full_name: req.body.full_name,
        email: req.body.email,
        password: req.body.password,
        address: add,
        phone: req.body.phone,
        gender: req.body.gender,
        date_birth: req.body.date_birth,
        avatar: req.file.filename,
    })
        .save()
        .then(() => {
            res.json(req.body)
        })
        .catch(next)
}

// DELETE /api/users/:id
const removeUser = (req, res, next) => {
    User.findOneAndDelete({ _id: req.params.id })
        .then((user) => {
            let avatar = user.avatar
            let avatarPath = appRoot + pathUser + avatar

            fs.unlink(avatarPath, (err) => {
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

// DELETE /api/users/:id/avatar
const removeAvatarUser = (req, res, next) => {
    User.findByIdAndUpdate({ _id: req.params.id }, {
        $set: { avatar: "" }
    })
        .then((user) => {
            return User.updateOne({ _id: user._id }, { $push: { avatar_old: user.avatar } })

        })
        .then(() => {
            res.status(200).json({
                error: 'Delete thành công',
            });
        })
        .catch(next)
}

// PUT /api/users/:id
const updateOneUser = (req, res, next) => {
    let add = `${req.body.ward}/${req.body.district}/${req.body.province}`

    const updateUser = {}

    for (let key in req.body) {
        if (req.body[key] !== '') {
            updateUser[key] = req.body[key];
        }
    }

    if (req.file) {
        updateUser.avatar = req.file.filename;
    }
    User.findByIdAndUpdate(req.params.id, updateUser)
        .then((user) => {
            return User.updateOne({ _id: user._id }, { $push: { avatar_old: user.avatar } })
        })
        .then(() => {
            res.status(200).json({
                error: 'Update thành công',
            });
        })

        .catch(next)
}

// PUT /api/users/:id/:name_avt
const updateAvatarUser = (req, res, next) => {
    User.findById(req.params.id)
        .then((user) => {
            const updateAvtOld = []
            for (let i in user.avatar_old) {
                if (user.avatar_old[i] === req.params.name_avt) {
                    if (user.avatar != "") {
                        updateAvtOld.push(user.avatar)
                    } else {
                        updateAvtOld.push(user.avatar_old[i])
                    }
                } else {
                    updateAvtOld.push(user.avatar_old[i])
                }
            }
            return User.updateOne({ _id: user._id }, {
                $set: {
                    avatar_old: updateAvtOld,
                    avatar: req.params.name_avt,
                }
            })
        })
        .then(() => {
            res.status(200).json({
                error: 'Update thành công',
            });
        })

        .catch(next)
}

// PUT /api/users/:id/cart/:id_product/:quantity/:price
const updateCart = (req, res, next) => {
    let key_cart
    let exist
    let updateCart = {
        id_product: req.params.id_product,
        quantity: Number(req.params.quantity),
        price: Number(req.params.price),
    }
    User.findById(req.params.id)
        .then((user) => {
            for (let key in user.carts) {
                if (req.params.id_product == user.carts[key].id_product) {
                    key_cart = key
                    exist = true
                }
            }
            if (user.carts.length > 0 && exist) {
                return User.updateOne({ _id: user._id, "carts.id_product": req.params.id_product }, {
                    $set: {
                        "carts.$.quantity": Number(req.params.quantity) + user.carts[key_cart].quantity,
                        "carts.$.price": Number(req.params.price),
                    }
                })
            } else {
                return User.updateOne({ _id: user._id }, { $push: { carts: updateCart } })
            }
        })
        .then(() => {
            res.json("Update Thành Công")
        })
        .catch(next)
}


module.exports = {
    getListUsers,
    getOneUser,
    getAvatarUser,
    addUser,
    removeUser,
    removeAvatarUser,
    updateOneUser,
    updateAvatarUser,
    updateCart
}
const bcrypt = require('bcrypt');
const fs = require('fs')
const appRoot = require('app-root-path');
const HashPassword = require('../utils/hashPassWord')

const User = require('../models/UserModel');
const pathUser = '/src/api/public/uploads/users/'

// GET /api/users
const getListUsers = (req, res, next) => {
    User.find({})
        .then((users) => {
            res.json({
                data: users,
                message: 'success'
            })
        })
        .catch(next)
}

// GET /api/users/:id
const getOneUser = (req, res, next) => {
    User.findById(req.params.id)
        .then((user) => {
            res.json({
                data: user,
                message: 'success'
            })
        })
        .catch(next)
}

// GET /api/users/search?email= or ?phone_login=
const getSearchAccountUser = (req, res, next) => {
    let q = Object.keys(req.query).join()
    switch (q) {
        case 'email':
            User.findOne({ email: req.query.email })
                .then(user => {
                    user ? res.json(true) : res.json(false)
                })
                .catch(next)
            break
        case 'phone_login':
            User.findOne({ phone_login: req.query.phone_login })
                .then(user => {
                    user ? res.json(true) : res.json(false)
                })
                .catch(next)
            break
        default:
            break
    }
}

// GET /api/users/:id/:name_avt
const getAvatarUser = (req, res, next) => {
    let avatarPath = appRoot + pathUser + req.params.name_avt;
    res.sendFile(avatarPath);
}

// POST /api/users
const addUser = async (req, res, next) => {
    let fileName, phone_login, email
    const { full_name, address, province, district, ward, phone, gender, date_birth } = req.body
    const password = await HashPassword(req.body.password)

    method_login = req.body.email ? { email: true, phone: false } : { email: false, phone: true }
    req.body.email ? email = req.body.email : phone_login = req.body.phone_login
    fileName = req.file ? req.file.filename : fileName

    const user = new User({
        phone_login,
        method_login,
        full_name,
        email: email,
        password,
        address: address + ' - ' + ward + ' - ' + district + ' - ' + province,
        phone,
        gender,
        date_birth,
        avatar: fileName,
    })
        .save()
        .then(() => {
            res.status(200).json({
                message: 'success'
            });
        })
        .catch(next)
}

// DELETE /api/users/:id
const removeUser = (req, res, next) => {
    User.findOneAndDelete({ _id: req.params.id })
        .then((user) => {
            const listAvt = []
            listAvt.push(user.avatar)
            user.avatar_old.map(avt => {
                listAvt.push(avt)
            })

            listAvt.map(avt => {
                let avatarPath = appRoot + pathUser + avt
                fs.unlink(avatarPath, (err) => {
                    if (err) {
                        console.error(err)
                        return
                    }
                })
            })

            res.status(200).json({
                message: 'success',
            });
        })
        .catch(next)
}

// DELETE /api/users/:id/avatar
const removeAvatarUser = (req, res, next) => {
    User.findByIdAndUpdate({ _id: req.params.id }, {
        $set: { avatar: null }
    })
        .then((user) => {
            return User.updateOne({ _id: user._id }, { $push: { avatar_old: user.avatar } })
        })
        .then(() => {
            res.status(200).json({
                message: 'success',
            });
        })
        .catch(next)
}

// DELETE /api/users/:id/cart/:id_product
const removeSomeProductCart = (req, res, next) => {
    let cartsReq = req.body.id_product_list

    User.findById(req.params.id)
        .then(user => {
            let cartsUser = user.carts
            cartsUser = cartsUser.filter(cartUser => {
                return !cartsReq.some(cartReq => {
                    return cartUser.id_product === cartReq;
                });
            });
            return User.updateOne({ _id: user._id }, { $set: { carts: cartsUser } })
                .then(() => {
                    res.status(200).json({
                        message: 'success',
                    });
                })
        })
}

// PUT /api/users/:id
const updateOneUser = async (req, res, next) => {
    const updateUser = {}

    req.file ? updateUser.avatar = req.file.filename : updateUser

    for (let key in req.body) {
        if (req.body[key] !== '') {
            updateUser[key] = req.body[key];
        }
    }

    req.body.password ? updateUser.password = await HashPassword(req.body.password) : updateUser
    req.body.address ? updateAdmin.address = req.body.address + ' - ' + req.body.ward + ' - ' + req.body.district + ' - ' + req.body.province : updateUser
    User.findByIdAndUpdate(req.params.id, updateUser)
        .then((user) => {
            return User.updateOne({ _id: user._id }, { $push: { avatar_old: user.avatar } })
        })
        .then(() => {
            res.status(200).json({
                message: 'success',
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
                    let avatar = user.avatar != "" ? user.avatar : user.avatar_old[i]
                    updateAvtOld.push(avatar)
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
                message: 'success',
            });
        })
        .catch(next)
}

// PUT /api/users/:id/cart/:id_product?quantity=&price=
const updateCart = (req, res, next) => {
    let key_cart
    let exist
    let updateCart = {
        id_product: req.params.id_product,
        quantity: Number(req.query.quantity),
        price: Number(req.query.price),
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
                        "carts.$.quantity": Number(req.query.quantity) + user.carts[key_cart].quantity,
                        "carts.$.price": Number(req.query.price),
                    }
                })
            } else {
                return User.updateOne({ _id: user._id }, { $push: { carts: updateCart } })
            }
        })
        .then(() => {
            res.status(200).json({
                message: 'success',
            });
        })
        .catch(next)
}

module.exports = {
    getListUsers,
    getOneUser,
    getSearchAccountUser,
    getAvatarUser,
    addUser,
    removeUser,
    removeAvatarUser,
    removeSomeProductCart,
    updateOneUser,
    updateAvatarUser,
    updateCart
}
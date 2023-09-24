const express = require("express");
const bcrypt = require('bcrypt');
const path = require("path");
const fs = require('fs')
const appRoot = require('app-root-path');

const Admin = require('../models/AdminModel');

const pathAdmin = '/api/public/uploads/admins/'

// So sánh password
// if (bcrypt.compareSync("123456", admin.password)) {
//     res.send("true")
// } else {
//     res.send("false")
// }

// GET /api/admins
const getListAdmins = (req, res, next) => {
    Admin.find({})
        .then((admins) => {
            res.json(admins)
        })
        .catch(next)
}

// GET /api/admins/:id
const getOneAdmin = (req, res, next) => {
    Admin.findById(req.params.id)
        .then((admin) => {
            res.json(admin)
        })
        .catch(next)
}

// GET /api/admins/:id/avatar
const getAvatarAdmin = (req, res, next) => {
    Admin.findById(req.params.id)
        .then((admin) => {
            let avatarPath = appRoot + pathAdmin + admin.avatar;
            // Đọc tệp hình ảnh và gửi nó về client
            res.sendFile(avatarPath);
        })
        .catch(next)
}

// POST /api/admins
const addAdmin = (req, res, next) => {
    const admin = new Admin({
        full_name: req.body.full_name,
        email: req.body.email,
        password: req.body.password,
        address: req.body.address,
        phone: req.body.phone,
        avatar: req.file.filename,
        add_admin: req.body.add_admin
    })
        .save()
        .then(() => {
            res.json(req.body)
        })
        .catch(next)
}

// DELETE /api/admins/:id
const removeAdmin = (req, res, next) => {
    Admin.findOneAndDelete({ _id: req.params.id })
        .then((admin) => {
            let avatar = admin.avatar
            let avatarPath = appRoot + pathAdmin + avatar

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

// DELETE /api/admins/:id/avatar
const removeAvatarAdmin = (req, res, next) => {
    Admin.findById(req.params.id)
        .then((admin) => {
            let avatar = admin.avatar
            let avatarPath = appRoot + pathAdmin + avatar
            fs.unlink(avatarPath, (err) => {
                if (err) {
                    console.error(err)
                    return
                }
            })
            admin.avatar = "";
            admin
                .save()
                .then(() => {
                    res.send('success');
                })
                .catch(next);
        })
        .catch(next)
}

// PUT /api/admins/:id
const updateOneAdmin = (req, res, next) => {
    Admin.findByIdAndUpdate(req.params.id, {
        $set: {
            full_name: "Admin",
            email: "admin@example.com",
            password: "654321",
            address: "123 Main St",
            phone: "+123",
            avatar: "huy.jpg",
            add_admin: "true"
        }

    })
        .then((admin) => {
            let oldPath = appRoot + pathAdmin + admin.avatar
            let newPath = appRoot + pathAdmin + "huy.jpg"
            fs.rename(oldPath, newPath, () => { });
            res.status(200).json({
                error: 'Update thành công',
            });
        })
}

// PUT /api/admins/:id/avatar
const updateAvatarAdmin = (req, res, next) => {
    Admin.findByIdAndUpdate(req.params.id, {
        $set: {
            avatar: "huy.jpg",
        }
    })
        .then((admin) => {
            let oldPath = appRoot + pathAdmin + admin.avatar
            let newPath = appRoot + pathAdmin + "huy.jpg"
            fs.rename(oldPath, newPath, () => { });
            res.status(200).json({
                error: 'Update thành công',
            });
        })
}

module.exports = {
    getListAdmins,
    getOneAdmin,
    getAvatarAdmin,
    addAdmin,
    removeAdmin,
    removeAvatarAdmin,
    updateOneAdmin,
    updateAvatarAdmin
}
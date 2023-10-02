const bcrypt = require('bcrypt');
const fs = require('fs')
const appRoot = require('app-root-path');

const Admin = require('../models/AdminModel');
const pathAdmin = '/src/api/public/uploads/admins/'

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

// GET /api/admins/:id/:name_avt
const getAvatarAdmin = (req, res, next) => {
    let avatarPath = appRoot + pathAdmin + req.params.name_avt;
    res.sendFile(avatarPath);
}

// POST /api/admins
const addAdmin = (req, res, next) => {
    const admin = new Admin({
        full_name: req.body.full_name,
        email: req.body.email,
        password: req.body.password,
        address: req.body.address,
        phone: req.body.phone,
        gender: req.body.gender,
        date_birth: req.body.date_birth,
        avatar: req.file.filename,
        add_admin: req.body.add_admin,
        delete_admin: req.body.delete_admin,
    })
        .save()
        .then(() => {
            res.status(200).json({
                message: 'Post Success'
            });
        })
        .catch(next)
}

// DELETE /api/admins/:id
const removeAdmin = (req, res, next) => {
    Admin.findOneAndDelete({ _id: req.params.id })
        .then((admin) => {
            const listAvt = []
            listAvt.push(admin.avatar)
            admin.avatar_old.map(avt => {
                listAvt.push(avt)
            })

            listAvt.map(avt => {
                let avatarPath = appRoot + pathAdmin + avt
                fs.unlink(avatarPath, (err) => {
                    if (err) {
                        console.error(err)
                        return
                    }
                })
            })
            res.status(200).json({
                message: 'Delete Success'
            });
        })
        .catch(next)
}

// DELETE /api/admins/:id/avatar
const removeAvatarAdmin = (req, res, next) => {
    Admin.findByIdAndUpdate({ _id: req.params.id }, {
        $set: { avatar: null }
    })
        .then((admin) => {
            return Admin.updateOne({ _id: admin._id }, { $push: { avatar_old: admin.avatar } })
        })
        .then(() => {
            res.status(200).json({
                message: 'Delete Success'
            });
        })
        .catch(next)
}

// PUT /api/admins/:id
const updateOneAdmin = (req, res, next) => {
    const updateAdmin = {}

    req.file ? updateAdmin.avatar = req.file.filename : updateAdmin

    for (let key in req.body) {
        if (req.body[key] !== '') {
            updateAdmin[key] = req.body[key];
        }
    }

    const handleUpdateAdmin = (updateAdmin) => {
        Admin.findByIdAndUpdate(req.params.id, updateAdmin)
            .then((admin) => {
                return Admin.updateOne({ _id: admin._id }, { $push: { avatar_old: admin.avatar } })
            })
            .then(() => {
                res.status(200).json({
                    message: 'Update Success'
                });
            })

            .catch(next)
    }

    if (req.body.password) {
        bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
            if (err) {
                console.error('Lỗi khi băm mật khẩu:', err);
                return;
            }
            updateAdmin.password = hashedPassword
            handleUpdateAdmin(updateAdmin)
        })
    } else {
        handleUpdateAdmin(updateAdmin)
    }
}

// PUT /api/admins/:id/:name_avt
const updateAvatarAdmin = (req, res, next) => {
    Admin.findById(req.params.id)
        .then((admin) => {
            const updateAvtOld = []
            for (let i in admin.avatar_old) {
                if (admin.avatar_old[i] === req.params.name_avt) {
                    updateAvtOld.push(admin.avatar)
                } else {
                    updateAvtOld.push(admin.avatar_old[i])
                }
            }
            return Admin.updateOne({ _id: admin._id }, {
                $set: {
                    avatar_old: updateAvtOld,
                    avatar: req.params.name_avt,
                }
            })
        })
        .then(() => {
            res.status(200).json({
                message: 'Update Success'
            });
        })
        .catch(next)
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
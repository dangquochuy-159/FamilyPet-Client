const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const AdminSchema = Schema(
    {
        full_name: { type: String },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        address: { type: String, required: true },
        gender: { type: String },
        date_birth: { type: String },
        avatar: { type: String },
        avatar_old: { type: Array },
        phone: { type: String, required: true },
        add_admin: { type: Boolean, default: false },
        delete_admin: { type: Boolean, default: false },
        slug: { type: String, slug: "full_name", unique: true },
    },
    {
        timestamps: true,
    }
)
mongoose.plugin(slug);

let saltRounds = 10;
AdminSchema.pre('save', function (next) {
    if (this.isModified('password') && this.password) {
        bcrypt.hash(this.password, saltRounds, (err, hash) => {
            if (err) {
                return next(err);
            }
            this.password = hash;
            next();
        });
    } else {
        next();
    }
})

module.exports = mongoose.model("Admin", AdminSchema);




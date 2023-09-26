const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;


const UserSchema = Schema(
    {
        full_name: { type: String },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        address: { type: String, required: true },
        avatar: { type: String },
        avatar_old: { type: Array },
        phone: { type: String, required: true },
        gender: { type: String },
        date_birth: { type: String },
        carts: { type: Array }, // id_product, quantity price
        list_orders: { type: Array },
        total_order: { type: Number, default: 0 },
        total_pay: { type: Number, default: 0 },
        total_point: { type: Number, default: 0 },
        rank: {
            diamond: { type: Boolean, default: false },
            gold: { type: Boolean, default: false },
            silver: { type: Boolean, default: false },
            bronze: { type: Boolean, default: false },
            member: { type: Boolean, default: true },
        },
        slug: { type: String, slug: "full_name", unique: true },

    },
    {
        timestamps: true,
    }
)
mongoose.plugin(slug);

let saltRounds = 10;
// thực hiện hash pass trước khi save
UserSchema.pre('save', function (next) {
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

// thực hiện hash pass trước khi update
UserSchema.pre('findOneAndUpdate', function (next) {
    const updateData = this._update;
    if (updateData.$set && updateData.$set.password) {
        bcrypt.hash(updateData.$set.password, saltRounds, (err, hash) => {
            if (err) {
                return next(err);
            }
            updateData.$set.password = hash;
            next();
        });
    } else {
        next();
    }
});

module.exports = mongoose.model("User", UserSchema);




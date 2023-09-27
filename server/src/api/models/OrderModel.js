const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;


const OrderSchema = Schema(
    {
        name: { type: String, required: true }, // get from user
        phone: { type: String, required: true }, // get from user
        address: { type: String, required: true }, // get from user
        total: { type: Number, required: true },
        detail: { type: Array }, // object: quantity, id_product, total
        payments: {
            cod: { type: Boolean, default: true },
            atm: { type: Boolean, default: false },
            e_wallet: { type: Boolean, default: false }
        },
        status: {
            confirmed: { type: Boolean, default: false },
            wait_confirm: { type: Boolean, default: false }
        },
    },
    {
        timestamps: true,
    }
)
mongoose.plugin(slug);

module.exports = mongoose.model("Order", OrderSchema);




const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;


const OrderSchema = Schema(
    {
        id_customer: { type: String, required: true },
        name: { type: String, required: true }, // get from user if default or input
        phone: { type: String, required: true }, // get from user if default or input
        address: { type: String, required: true }, // get from user if default or input
        total_pay: { type: Number, required: true },
        detail: { type: Array }, // object: quantity, id_product, unit_price, into_money
        payments: {
            cod: { type: Boolean, default: true },
            atm: { type: Boolean, default: false },
            e_wallet: { type: Boolean, default: false }
        },
        status: {
            confirmed: { type: Boolean, default: false },
            wait_confirm: { type: Boolean, default: true }
        },
    },
    {
        timestamps: true,
    }
)
mongoose.plugin(slug);

module.exports = mongoose.model("Order", OrderSchema);




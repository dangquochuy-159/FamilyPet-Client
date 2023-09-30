const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;


const EvaluateSchema = Schema(
    {
        id_customer: { type: String },
        id_product: { type: String },
        content: { type: String },
        star: { type: Number, default: 0 },
    },
    {
        timestamps: true,
    }
)


module.exports = mongoose.model("Evaluate", EvaluateSchema);




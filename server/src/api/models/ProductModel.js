const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
const Schema = mongoose.Schema;

const ProductSchema = Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    des: { type: String, required: true },
    photo: { type: String, required: true },
    origin: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    sale_price: { type: Number },
    photo_detail: { type: Array, required: true },
    status: {
        in_stock: { type: Boolean, default: false },
        out_stock: { type: Boolean, default: false },
        low_stock: { type: Boolean, default: false },
    },
    slug: { type: String, slug: "name", unique: true },
},
    {
        timestamps: true,
    }
)

mongoose.plugin(slug);

module.exports = mongoose.model("Product", ProductSchema);
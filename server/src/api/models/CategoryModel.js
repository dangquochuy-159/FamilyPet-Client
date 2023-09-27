const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;


const CategorySchema = Schema(
    {
        name: { type: String, required: true },
        photo: { type: String, required: true },
        slug: { type: String, slug: "name", unique: true },
    },
    {
        timestamps: true,
    }
)
mongoose.plugin(slug);

module.exports = mongoose.model("Category", CategorySchema);




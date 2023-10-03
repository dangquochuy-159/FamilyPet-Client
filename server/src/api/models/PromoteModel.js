const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
const Schema = mongoose.Schema;


const PromoteSchema = Schema(
    {
        code: { type: String, required: true, unique: true },
        des: { type: String, required: true },
        reduce: { type: String, required: true },
        point: { type: Number, required: true }
    },
    {
        timestamps: true,
    }
)
mongoose.plugin(slug);

module.exports = mongoose.model("Promote", PromoteSchema);




const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: {type: String, required: true, minLength: 3, maxLength: 15},
    description: {type: String, maxLength: 100},
    category: {type: Schema.Types.ObjectId, ref: "Category", required: true},
    price: {type: Number, required: true},
    stockStatus: {type: Array, required: true},
})

ProductSchema.virtual("url").get(function () {
    return `/list/product/${this.id}`;
})

module.exports = mongoose.model("Product", ProductSchema);
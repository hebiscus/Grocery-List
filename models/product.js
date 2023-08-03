const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: {type: String, required: true, minLength: 3, maxLength: 15},
    description: {type: String, maxLength: 1000},
    category: {type: Schema.Types.ObjectId, ref: "ProductCategory", required: true},
    price: {type: Number, required: true},
    // stockStatus: [ {type: Schema.Types.ObjectId, ref: "Store", required: true }]
})

ProductSchema.virtual("url").get(function () {
    return `/list/product/${this.id}`;
})

module.exports = mongoose.model("Product", ProductSchema);
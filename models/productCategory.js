const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductCategorySchema = new Schema({
    name: {type: String, required: true, minLength: 3, maxLength: 15},
    description: {type: String, maxLength: 1000},
})

ProductCategorySchema.virtual("url").get(function () {
    return `/categories/${this.id}`;
})

module.exports = mongoose.model("ProductCategory", ProductCategorySchema);
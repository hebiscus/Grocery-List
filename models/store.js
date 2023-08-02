const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const StoreSchema = new Schema({
    name: {type: String, required: true, minLength: 3, maxLength: 15},
    description: {type: String, maxLength: 1000},
    products: [ {type: Schema.Types.ObjectId, ref: "Product" }]
})

StoreSchema.virtual("url").get(function () {
    return `/stores/store/${this.id}`;
})

module.exports = mongoose.model("Store", StoreSchema);
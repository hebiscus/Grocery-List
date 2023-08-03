const Store = require("../models/store");
const Product = require("../models/product");

exports.store_list = async (req, res, next) => {
    try {
        const allStores = await Store.find().sort({ name: 1 }).populate("products").exec();
        res.render("stores_list", {title: "Stores", store_list: allStores});
    } catch (err) {
        console.log(err)
    }   
}

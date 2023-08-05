const Store = require("../models/store");
const Product = require("../models/product");
const asyncHandler = require("express-async-handler");

exports.store_list = async (req, res, next) => {
    try {
        const allStores = await Store.find().sort({ name: 1 }).populate("products").exec();
        res.render("stores_list", {title: "Stores", store_list: allStores});
    } catch (err) {
        console.log(err)
    }   
};

exports.detail = asyncHandler(async (req, res, next) => {
    const store = await Store.findById(req.params.id).populate("products").exec();

    if (store == null) {
        const err = new Error("No such store!");
        err.status = 404;
        return next(err);
    }

    res.render("store_detail", {title: store.name, store: store});
})

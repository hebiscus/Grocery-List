const ProductCategory = require("../models/productCategory");
const asyncHandler = require("express-async-handler");

exports.category_list = asyncHandler(async (req, res, next) => {
    const allCategories = await ProductCategory.find().sort({ name: 1} ).exec();
    res.render("category_list", {title: "Categories", category_list: allCategories});
})

exports.detail = asyncHandler(async (req, res, next) => {
    const category = await ProductCategory.findById(req.params.id).exec();

    if (category == null) {
        const err = new Error("No such category!");
        err.status = 404;
        return next(err);
    }

    res.render("category_detail", {title: category.name, category: category});
})
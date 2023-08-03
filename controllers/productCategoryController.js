const ProductCategory = require("../models/productCategory");
const asyncHandler = require("express-async-handler");

exports.category_list = asyncHandler(async (req, res, next) => {
    const allCategories = await ProductCategory.find().sort({ name: 1} ).exec();
    res.render("category_list", {title: "Categories", category_list: allCategories});
})
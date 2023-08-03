const Product = require("../models/product");
const ProductCategory = require("../models/productCategory");
const asyncHandler = require("express-async-handler");

exports.product_list = asyncHandler(async (req,res, next) => {
    const allProducts = await Product.find().sort({ name: 1 }).populate("category").exec();
    res.render("product_list", {title: "Product List", product_list: allProducts,})
})
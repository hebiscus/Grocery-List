const Product = require("../models/product");
const ProductCategory = require("../models/productCategory");
const asyncHandler = require("express-async-handler");

exports.product_list = asyncHandler(async (req,res, next) => {
    const allProducts = await Product.find().sort({ name: 1 }).populate("category").exec();
    res.render("product_list", {title: "Product List", product_list: allProducts,})
})

exports.detail = asyncHandler(async (req, res, next) => {

    const product = await Product.findById(req.params.id).populate("category").exec();

    if (product == null) {
        const err = new Error("No such product!");
        err.status = 404;
        return next(err);
    }

    res.render("product_detail", {title: product.name, product: product})
});

exports.create_get = (req, res, next) => {
    // res.render("product_form", {title: "Add a product"})
    res.send("NOT IMPLEMENTED: Product ADD GET");
};

exports.create_post = (req, res, next) => {
    // res.render("product_form", {title: "Add a product"})
    res.send("NOT IMPLEMENTED: Product ADD POST");
};

exports.delete_post = asyncHandler(async (req,res,next) => {
    const product = await Product.findByIdAndDelete(req.params.id);
    res.redirect("/list");
});

exports.update_get = asyncHandler(async (req, res, next) => {
    const product = await Product.findById(req.params.id).orFail().exec();
    res.render("product_form", {title: "Update a form", product: product})
});

exports.update_post = [
    

    ,asyncHandler(async (req, res, next) => {

    }),
];
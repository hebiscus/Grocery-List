const Product = require("../models/product");
const ProductCategory = require("../models/productCategory");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

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

exports.create_get = asyncHandler(async(req, res, next) => {
    const categories = await ProductCategory.find().exec();
    res.render("product_form", {title: "Create a product", categories: categories});
});

exports.create_post =  [
    body("name").trim().isLength({min: 3, max: 40}).escape().withMessage("Product name must have between 3-40 characters"),
    body("price").isFloat({min:1}).withMessage("Price can't be negative..."),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        const selectedCategory = await ProductCategory.findById(req.body.category);
        console.log(selectedCategory)

        const product = new Product({ name: req.body.name, description: req.body.description, category: selectedCategory, price: req.body.price});

        if (!errors.isEmpty()) {
            res.render("product_form", {
              title: "Create a product",
              product: product,
              errors: errors.array(),
            });
            return;
        } else {
            const productExists = await Product.findOne({ name: req.body.name}).collation({ locale: "en", strength: 2 }).exec();
            if (productExists) {
                res.redirect(productExists.url);
            } else {
                await product.save();
                res.redirect(product.url);
            }
        }
    })
];
    

exports.delete_get = asyncHandler(async (req,res,next) => {
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
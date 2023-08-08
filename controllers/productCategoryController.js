const ProductCategory = require("../models/productCategory");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

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
});

exports.create_get = asyncHandler(async (req, res, next) => {
    res.render("category_form", {title: "Create a category"})
});

exports.create_post = [
    body("name").trim().isLength({ min: 3, max: 15 }).escape().withMessage("Category name must have between 3-15 letters"),

    asyncHandler(async (req, res, next) => { 
        const errors = validationResult(req);

        const category = new ProductCategory({ name: req.body.name, description: req.body.description});

        if (!errors.isEmpty()) {
            res.render("category_form", {
              title: "Create a category",
              category: category,
              errors: errors.array(),
            });
            return;
          } else {
            const categoryExists = await ProductCategory.findOne({ name: req.body.name}).collation({ locale: "en", strength: 2 }).exec();
            if (categoryExists) {
              res.redirect(categoryExists.url);
            } else {
              await category.save();
              res.redirect(category.url);
            }
          }
    }),
];

exports.delete_post = asyncHandler(async (req, res, next) => { 
    await ProductCategory.findByIdAndDelete(req.params.id);
    res.redirect("/categories");
});

exports.update_get = asyncHandler(async (req, res, next) => { 
    const category = await ProductCategory.findById(req.params.id).orFail.exec();
    res.render("category_form", {title: "Update a Category", category: category})
});

exports.update_post = [
    body("name").trim().isLength({ min: 3, max: 15 }).escape().withMessage("Category name must have between 3-15 letters"),
    
    asyncHandler(async (req, res, next) => { 
      const errors = validationResult(req);

      const category = new ProductCategory({ name: req.body.name, description: req.body.description, _id: req.params.id});

      if (!errors.isEmpty()) {
        res.render("category_form", {
          title: "Update a category",
          category: category,
          errors: errors.array(),
        });
        return;
      } else {
        const updatedCategory = await ProductCategory.findByIdAndUpdate(req.params.id, category);
        res.redirect(updatedCategory.url);
      }
    }),
];


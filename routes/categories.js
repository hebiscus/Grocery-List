const express = require('express');
const router = express.Router();

const Category_controller = require("../controllers/productCategoryController");

router.get("/", Category_controller.category_list);

module.exports = router;
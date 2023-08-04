const express = require('express');
const router = express.Router();

const product_controller = require("../controllers/productController");

router.get("/", product_controller.product_list);

// router.get("/product/create", product_controller.create_get);
// router.get("/product/create", product_controller.create_post);

router.get("/product/:id", product_controller.detail);

// router.get("/product/delete", product_controller.delete_get);
// router.get("/product/delete", product_controller.delete_post);

// router.get("/product/update", product_controller.update_get);
// router.get("/product/update", product_controller.update_post);

module.exports = router;
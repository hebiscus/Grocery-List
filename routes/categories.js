const express = require('express');
const router = express.Router();

const Category_controller = require("../controllers/productCategoryController");

router.get("/", Category_controller.category_list);

router.get("/category/create", Category_controller.create_get);
router.post("/category/create", Category_controller.create_post);

router.get("/category/:id", Category_controller.detail);

router.get("/category/:id/update", Category_controller.update_get);
router.post("/category/:id/update", Category_controller.update_post);

router.get("/category/:id/delete", Category_controller.delete_post);



module.exports = router;
const express = require('express');
const router = express.Router();

const Store_controller = require("../controllers/storeController");

router.get("/", Store_controller.store_list);

router.get("/store/:id", Store_controller.detail);

// router.get("/store/create", product_controller.create_get);
// router.get("/store/create", product_controller.create_post);

// router.get("/store/:id/delete", product_controller.delete_get);
// router.get("/store/delete", product_controller.delete_post);

// router.get("/store/:id/update", product_controller.update_get);
// router.get("/store/:id/update", product_controller.update_post);

module.exports = router;
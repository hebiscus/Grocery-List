const express = require('express');
const router = express.Router();

const Store_controller = require("../controllers/storeController");

router.get("/", Store_controller.store_list);

module.exports = router;
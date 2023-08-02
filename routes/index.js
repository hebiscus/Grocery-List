const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/', function(req, res, next) {
  res.redirect('/categories')
});

router.get('/', function(req, res, next) {
  res.redirect('/list')
});

router.get('/', function(req, res, next) {
  res.redirect('/stores')
});

module.exports = router;

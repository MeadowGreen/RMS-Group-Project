var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.redirect('/catalog');
});

/* GET incident page. */
router.get('/', function(req, res) {
  res.redirect('/incident');
});

module.exports = router;

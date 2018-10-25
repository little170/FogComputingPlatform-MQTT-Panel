var express = require('express');
var router = express.Router();
var fs = require("fs");

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index')
  res.render('index.html')
});

router.post('/test', function (req, res) {
    console.log('works');
});

module.exports = router;

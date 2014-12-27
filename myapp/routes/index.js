var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});
/* GET home page. */
router.get('/helloworld', function(req, res) {
  res.render('hello', { title: 'hallo title' });
});

module.exports = router;

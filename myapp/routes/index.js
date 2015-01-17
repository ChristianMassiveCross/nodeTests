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
/* GET Userlist page. */
router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('wurst');
    collection.find({},{},function(e,docs){
        res.render('user', {
            "userlist" : docs
        });
    });
});
/* GET New User page. */
router.get('/newuser', function(req, res) {
    res.render('newuser', { title: 'Add New User' });
});

router.post('/deluser',function(request, response){
	var dbHandle = request.db;
	var deleteIdentifyer = request.body.ident;
    console.log('delete User by id:'+deleteIdentifyer);
    var collection = dbHandle.get('wurst');
	collection.remove({"_id" : deleteIdentifyer },function (err, doc) {
        if (err) {
            response.send("There was a problem with delete.");
        }
        else {
            response.location("userlist");
            response.redirect("userlist");
        }
    });
});
/* POST to Add User Service */
router.post('/adduser', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var userName = req.body.username;
    var userEmail = req.body.useremail;
    var userBrot = req.body.userbrot;

    // Set our collection
    var collection = db.get('wurst');

    // Submit to the DB
    collection.insert({
        "username" : userName,
        "email" : userEmail,
        "unserBrot" : userBrot
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // If it worked, set the header so the address bar doesn't still say adduser
            res.location("userlist");
            // And forward to success page
            res.redirect("userlist");
        }
    });
});
module.exports = router;

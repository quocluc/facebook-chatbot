var express = require('express');
var router = express.Router();
const db = require('./../models/DB');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
//
router.post('/', function (req, res, next) {

  db.DB.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    db.DB.query("SELECT * FROM messages", function (err, result) {
      if (err) throw err;
      res.json({ message: result });
    });
  });
});
//
router.post('/message', function (req, res, next) {
  let result =  db.insertMessage(req.body);
  res.json({ message: result });
});
module.exports = router;

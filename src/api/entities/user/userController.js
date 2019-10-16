var express	   = require('express');
var router 	   = express.Router();
var bodyParser = require('body-parser');
var User	     = require('./user');

router.use(bodyParser.json());

router.post('/login', function(req, res) {
  User.findOneUser(req.body, function(err, rows) {
    if (err) {
      res.status(400).json(err);
    } else {
      if (rows.length) {
        res.json(rows);
      } else {
        res.status(400).json('Identifiants invalide.');
      }
    }
  });
});

router.post('/register', function(req, res) {
  User.createOneUser(req.body, function(err, rows) {
    if (err) {
      if (err.code == 'ER_DUP_ENTRY') {
        res.status(403).send("Un compte existe déjà à cette adresse mail");
      } else {
        res.status(400).json(err);
      }
    } else {
      res.json(req.body);
    }
  });
});

router.get('/user/:token', function(req, res) {
  User.findOneUserConnected(req.params.token, function(err, rows) {
    if (err) {
      res.status(400).json(err);
    } else {
      res.send(rows[0]);
    }
  });
});

module.exports = router;

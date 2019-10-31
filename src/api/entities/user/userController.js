var express	   = require('express');
var router 	   = express.Router();
var bodyParser = require('body-parser');
var User	     = require('./user');

router.use(bodyParser.json());

router.get('/users', function(req, res) {
  User.findAllUsers(function(err, rows) {
    if (err) {
      res.status(400).json(err);
    } else {
      res.json(rows);
    }
  });
});

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
  User.findOneUserByToken(req.params.token, function(err, rows) {
    if (err) {
      res.status(400).json(err);
    } else {
      res.send(rows[0]);
    }
  });
});

router.post('/user/edit', function(req, res) {
  User.updateOneUserConnected(req.body, function(err, rows) {
    if (err) {
      res.status(400).json(err);
    } else {
      res.json(rows);
    }
  });
});

router.post('/user/new/contact', function(req, res) {
  User.createOneUserContact(req.body, function(err, rows) {
    if (err) {
      if (err.code == 'ER_DUP_ENTRY') {
        res.sendStatus(200);
      } else {
        res.status(400).json(err);
      }
    } else {
      res.json(req.body);
    }
  });
});

router.get('/user/contacts/:token', function(req, res) {
  User.findAllUsersContact(req.params.token, function(err, rows) {
    if (err) {
      res.status(400).json(err);
    } else {
      res.send(rows);
    }
  });
});

router.post('/user/list/contact/message', function(req, res) {
  User.findAllUsersContactMessage(req.body, function(err, rows) {
    if (err) {
      res.status(400).json(err);
    } else {
      res.send(rows);
    }
  });
});

router.get('/users/not/:token', function(req, res) {
  User.findAllUsersNotConnected(req.params.token, function(err, rows) {
    if (err) {
      res.status(400).json(err);
    } else {
      res.send(rows);
    }
  });
});


router.get('/user/contact/:token', function(req, res) {
  User.findOneUserByToken(req.params.token, function(err, rows) {
    if (err) {
      res.status(400).json(err);
    } else {
      res.send(rows);
    }
  });
});

router.delete('/user/remove/:token', function(req, res) {
  User.removeOneUserByToken(req.params.token, function(err, rows) {
    if (err) {
      res.status(400).json(err);
    } else {
      res.json(req.body);
    }
  });
});

router.post('/user/new/contact/message', function(req, res) {
  User.createOneUserContactMessage(req.body, function(err, rows) {
    if (err) {
      if (err.code == 'ER_DUP_ENTRY') {
        res.sendStatus(200);
      } else {
        res.status(400).json(err);
      }
    } else {
      res.json(req.body);
    }
  });
});

module.exports = router;

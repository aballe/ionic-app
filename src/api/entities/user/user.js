var db 		= require('../../mysql.conf');
var User 	= {
  findOneUser: function(user, callback) {
    return db.query('SELECT * FROM user WHERE email = ? AND password = ?', [user.user, user.password], callback);
  },
  findOneUserConnected: function(token, callback) {
    return db.query('SELECT * FROM user WHERE token = ?', token, callback);
  },
  createOneUser: function(user, callback) {
    return db.query('INSERT INTO user(email, password, token) VALUES(?, ?, ?)', [user.user, user.password, user.token], callback);
  }
};

module.exports = User;

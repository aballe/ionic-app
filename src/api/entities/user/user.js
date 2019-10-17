var db 		= require('../../mysql.conf');
var User 	= {
  findAllUsers: function(callback) {
    return db.query('SELECT id, name, lastname FROM user', callback);
  },
  findOneUser: function(user, callback) {
    return db.query('SELECT * FROM user WHERE email = ? OR username = ? AND password = ?', [user.email, user.username, user.password], callback);
  },
  findOneUserConnected: function(token, callback) {
    return db.query('SELECT * FROM user WHERE token = ?', token, callback);
  },
  createOneUser: function(user, callback) {
    return db.query('INSERT INTO user(username, email, password, token) VALUES(?, ?, ?, ?)', [user.username, user.email, user.password, user.token], callback);
  },
  updateOneUserConnected: function(user, callback) {
    return db.query('UPDATE user SET name = ?, lastname = ?, description = ?, photo_path = ? WHERE token = ?', [user.name, user.lastname, user.description, user.photo, user.token], callback);
  }
};

module.exports = User;

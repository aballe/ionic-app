var db 		= require('../../mysql.conf');
var User 	= {
  findAllUsers: function(callback) {
    return db.query('SELECT id, name, lastname, email, username FROM user', callback);
  },
  findOneUser: function(user, callback) {
    return db.query('SELECT * FROM user WHERE email = ? OR username = ? AND password = ?', [user.email, user.username, user.password], callback);
  },
  findOneUserByToken: function(token, callback) {
    return db.query('SELECT * FROM user WHERE token = ?', token, callback);
  },
  findAllUsersContact: function(token, callback) {
    return db.query('SELECT _u2.name, _u2.lastname, _u2.token FROM user_contact _uc INNER JOIN user _u1 ON _uc.user = _u1.id INNER JOIN user _u2 ON _uc.contact = _u2.id WHERE _u1.token = ?', token, callback);
  },
  createOneUser: function(user, callback) {
    return db.query('INSERT INTO user(username, email, password, token) VALUES(?, ?, ?, ?)', [user.username, user.email, user.password, user.token], callback);
  },
  createOneUserContact: function(users, callback) {
    return db.query('INSERT INTO user_contact (user, contact) VALUES ((SELECT id FROM user WHERE email = ?), (SELECT id FROM user WHERE email = ?))', [users.user1, users.user2], callback);
  },
  updateOneUserConnected: function(user, callback) {
    return db.query('UPDATE user SET name = ?, lastname = ?, description = ?, photo_path = ? WHERE token = ?', [user.name, user.lastname, user.description, user.photo, user.token], callback);
  },
  removeOneUserByToken: function(token, callback) {
    return db.query('DELETE FROM user WHERE token = ?', token, callback);
  },
};

module.exports = User;

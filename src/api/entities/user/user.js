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
    return db.query('SELECT _u2.name, _u2.lastname, _u2.token FROM user_contact _uc INNER JOIN user _u1 ON _uc.user_id = _u1.id INNER JOIN user _u2 ON _uc.contact_id = _u2.id WHERE _u1.token = ?', token, callback);
  },
  findAllUsersContactMessage: function(users, callback) {
    return db.query('SELECT _u1.username as expediteur, _u2.username as recepteur, _cm.message FROM contact_message _cm INNER JOIN user_contact _uc ON _uc.id = _cm.user_contact_id INNER JOIN user _u1 ON _u1.id = _uc.user_id INNER JOIN user _u2 ON _u2.id = _uc.contact_id WHERE (_uc.user_id = ? AND _uc.contact_id = ?) OR (_uc.user_id = ? AND _uc.contact_id = ?) ORDER BY _cm.send_at', [users.user1, users.user2, users.user2, users.user1], callback);
  },
  createOneUser: function(user, callback) {
    return db.query('INSERT INTO user(username, email, password, token) VALUES(?, ?, ?, ?)', [user.username, user.email, user.password, user.token], callback);
  },
  createOneUserContact: function(users, callback) {
    return db.query('INSERT INTO user_contact (user_id, contact_id) VALUES ((SELECT id FROM user WHERE email = ?), (SELECT id FROM user WHERE email = ?))', [users.user1, users.user2], callback);
  },
  createOneUserContactMessage: function(usersMessage, callback) {
    return db.query('INSERT INTO contact_message (user_contact_id, message, send_at) VALUES ((SELECT id FROM user_contact WHERE user_id = ? AND contact_id = ?), ?, NOW())', [usersMessage.user, usersMessage.contact, usersMessage.message], callback);
  },
  updateOneUserConnected: function(user, callback) {
    return db.query('UPDATE user SET name = ?, lastname = ?, description = ?, photo_path = ? WHERE token = ?', [user.name, user.lastname, user.description, user.photo, user.token], callback);
  },
  removeOneUserByToken: function(token, callback) {
    return db.query('DELETE FROM user WHERE token = ?', token, callback);
  },
};

module.exports = User;

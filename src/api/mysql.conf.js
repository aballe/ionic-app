var mysqlConf      = require('mysql');
var connection = mysqlConf.createPool({
  host:     'localhost',
  user:     'root',
  password: '',
  database: 'ionic'
});

module.exports = connection;

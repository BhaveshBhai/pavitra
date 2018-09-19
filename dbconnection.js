var mysql = require('mysql');
var config = require('./config');

// @ts-ignore
var connection = mysql.createPool(config.dbconfig);

module.exports = connection;
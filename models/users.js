var db = require('../dbconnection');
var bcrypt = require('bcrypt');

var saltRounds = 10;
var Users = {
  comparePassword: function (password, hash, callback) {
    bcrypt.compare(password, hash, function (err, isMatch) {
      if (err) {
        return callback(err, isMatch);
      }
      return callback(null, isMatch);
    });
  },

  checkLogin: function (mobile_num, password, callback) {
    return db.query('call sp_UserLogin(?,?)', [mobile_num, password], callback);
  },

  getWallet : function(id,callback){
    return db.query('call sp_GetWalletAmount(?)',[id],callback);
  },

  updateWallet: function(wallet,callback){
    return db.query('call sp_UpdateWallet(?,?,?,?)',[wallet.id,wallet.transtype,wallet.amount,wallet.reason],callback);
  },

  changePassword: function (id, oldPassword, newPassword, callback) {
    return db.query('call sp_ChangePassword(?,?,?)', [id, oldPassword, newPassword], callback);
  },

  getUserById: function (id,isAdmin, callback) {
    return db.query('call sp_GetUsers(?,?)', [id,isAdmin], callback);
  },

  addUser: function (user, callback) {
    return db.query('call sp_InsertUsers(?,?,?,?,?,?)', [user.first_name, user.last_name, user.mobile_num, user.password, user.email_addr, user.user_role], callback);
  },

  deleteUser: function (userId,userRole, callback) {
    return db.query('call sp_DeleteUser(?,?)', [userId,userRole], callback);
  },

  updateUser: function (user, callback) {
    return db.query('call sp_UpdateUsers(?,?,?,?,?,?,?)', [user.user_id, user.first_name, user.last_name, user.email_addr, user.bank_name, user.bank_ifsc_code, user.bank_account_num], callback);
  },

  updateIsAdminStatus : function(userId,status,callback){
    return db.query('call sp_UpdateIsAdminStatus(?,?)',[userId,status],callback);
  },

  updateIsBlockStatus : function(userID,status,callback){
    return db.query('call sp_UpdateIsBlockStatus(?,?)',[userID,status],callback);
  },

  getWalletHistory : function(userId,callback){
    return db.query('call sp_GetWalletHistoryByUser(?)',[userId],callback);
  },

  setUserSettings: function(id,callback){
    return db.query('call sp_SetUserSettings(?)',[id],callback);
  },

  resetPassword : function(id,callback){
    return db.query('call sp_resetPassword(?)',[id],callback);
  }
};

module.exports = Users;
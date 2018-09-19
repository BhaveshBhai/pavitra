var db = require('../dbconnection');

var dailyNewModel = {
  addDailyNew : function (designID, callback) {
    return db.query('call sp_InsertDailyNew(?)', [designID], callback);
  },

  deleteDailyNew : function (dailyNewId, callback) {
    return db.query('call sp_DeleteDailyNew(?)', [dailyNewId], callback);
  }

};

module.exports = dailyNewModel;
var db = require('../dbconnection');

var khabarModel = {
    getKhabar: function (id, callback) {
        return db.query('call sp_GetKhabar(?)', [id], callback);
    },

    addKhabar: function (imageURL, callback) {
        return db.query('call sp_InsertKhabar(?)', [imageURL], callback);
    },

    deleteKhabar: function (khabarId, callback) {
        return db.query('call sp_DeleteJaherKhabar(?)', [khabarId], callback);
    }
};

module.exports = khabarModel;
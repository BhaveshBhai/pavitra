var db = require('../dbconnection');

var advertisementModel = {
    getAdvertisement: function (id, callback) {
        return db.query('call sp_GetAdvertisement(?)', [id], callback);
    },

    addAdvertisement: function (imageURL, callback) {
        return db.query('call sp_InsertAdvertisement(?)', [imageURL], callback);
    },

    deleteAdvertisement: function (advertisementId, callback) {
        return db.query('call sp_DeleteAdvertisements(?)', [advertisementId], callback);
    }
};

module.exports = advertisementModel;
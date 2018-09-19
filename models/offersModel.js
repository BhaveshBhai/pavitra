var db = require('../dbconnection');

var offersModel = {
    checkLogin: function (mobile_num, password, callback) {
        return db.query('call sp_AdminLogin(?,?)', [mobile_num, password], callback);
    },

    addDesign: function (design, callback) {
        
        var design_id = (new Date()).getTime().toString(36).toUpperCase();

        return db.query('call sp_InsertOfferDesign(?,?,?,?,?,?,?,?,?,?,?)',
            [design_id, design.uploader_id, design.design_name, design.design_type, design.design_zip_url,
                design.image_url_1, design.image_url_2, design.image_url_3, design.image_url_4, design.image_url_5, 
                design.specification], callback);
    },

    addOffer : function(offer,callback){
        return db.query('call sp_InsertOffer(?,?,?,?,?,?,?)',[offer.name,offer.sdate,offer.edate,offer.price,offer.days,offer.design_limit,offer.imageUrl],callback);
    },

    getOffers : function(id,isAdmin,callback){
        return db.query('call sp_GetOffers(?,?)',[id,isAdmin],callback);
    },

    addUserOffer : function(userOffer,callback){
        return db.query('call sp_InsertUserOffer(?,?,?,?,?,?)',[userOffer.userID,userOffer.offerID,userOffer.designCount,userOffer.startDate,userOffer.expiryDate,userOffer.price],callback);
    },

    getOfferDesign : function(design,callback){
        return db.query('call sp_GetOfferDesignByFilters(?,?,?,?,?)',[design.limit,design.start,design.type,design.search,design.userid],callback);
    },

    placeOfferDesignOrder : function(order,callback){
        return db.query('call sp_placeOfferDesignOrder(?,?,?)',[order.userID,order.offerID,order.designID],callback);
    },

    deleteOffer : function(id,callback){
        return db.query('call sp_DeleteOffer(?)',[id],callback);
    },

    deleteOfferDesign : function(id,callback){
        return db.query('call sp_DeleteOfferDesign(?)', [id], callback);
    },

    getUserStatusByOffer : function(offer,callback){
        return db.query('call sp_GetUserStatusByOffer(?)',[offer.offerID],callback);
    }
};

module.exports = offersModel;
var db = require('../dbconnection');

var designTypeModel = 
{
    getDesignTypeList : function(id,callback){
        return db.query('call sp_GetDesignType(?)', [id], callback);
    },

    addDesignType : function(designType,onlyCategory,onlyOffer,callback){
        return db.query('call sp_InsertDesignType(?,?,?)',[designType,onlyCategory,onlyOffer],callback);
    },

    updateDesignType : function(designTypId,onlyCategory,onlyOffer,callback){
        return db.query('call sp_UpdateDesignType(?,?,?)',[designTypId,onlyCategory,onlyOffer],callback);
    } 
};

module.exports = designTypeModel;
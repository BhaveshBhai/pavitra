var db = require('../dbconnection');

var designModel =
    {
        addDesign: function (design, callback) {

            var design_id = (new Date()).getTime().toString(36).toUpperCase();

            return db.query('call sp_InsertDesign(?,?,?,?,?,?,?,?,?,?,?,?,?)',
                [design_id, design.uploader_id, design.design_name, design.design_price, design.design_type, design.design_zip_url,
                    design.image_url_1, design.image_url_2, design.image_url_3, design.image_url_4, design.image_url_5, 
                    design.specification, design.uploaded_by], callback);
        },

        deleteDesign : function(id,uploaded_by,callback){
            return db.query('call sp_DeleteDesign(?,?)', [id,uploaded_by], callback);
        },

        getDesignByID: function (id, callback) {
            return db.query('call sp_GetDesignByID(?)', [id], callback);
        },

        getDesignListByFilter: function(limit,start,uploaded_by,type,user,search,isdaily,callback){
            return db.query('call sp_GetDesignByFilters(?,?,?,?,?,?,?)', [limit,start,uploaded_by,type,user,search,isdaily], callback);
        }
    };

module.exports = designModel;
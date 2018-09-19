var db = require('../dbconnection');

var RequirementsModel = 
{
    AddEstimate : function(requirement,callback){
        return db.query('call sp_AddEstimate(?,?,?,?,?)', [requirement.requirement_id,requirement.design_code,requirement.designer_id,requirement.est_time,requirement.customer_id], callback);
    }
};

module.exports = RequirementsModel;
var express = require('express');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var router = express.Router();
var designType = require('../models/DesignTypeModel');
var config = require('../config');

router.get('/:id?',function(req,res,next){
   designType.getDesignTypeList(req.params.id,function(err,rows){
     if(err){
         res.send(err);
     }
     else{
        res.json(rows[0]); 
     }
   });
});

router.post('/addDesignType', function (req, res) {
  var param = req.body ;
  designType.addDesignType(param.designType,param.onlyCategory,param.onlyOffer,function(err,rows){
    if (err) {
      res.send(err);
    }
    else{
      res.status(200);
        res.json({
          success: true,
          message: 'Design Type added successfully !'
        });
    }
  });
});

router.post('/updateDesignType', function (req, res) {
  var param = req.body ;
  designType.updateDesignType(param.designTypeId,param.onlyCategory,param.onlyOffer,function(err,rows){
    if (err) {
      res.send(err);
    }
    else{
      res.status(200);
        res.json({
          success: true,
          message: 'Design Type updated successfully !'
        });
    }
  });
});

module.exports = router;
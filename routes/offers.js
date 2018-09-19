var express = require('express');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var router = express.Router();
var offers = require('../models/offersModel');
var users = require('../models/users');
var config = require('../config');

router.get('/offerList',function(req, res, next){
    var param = req.query;
    var id = param.id ? param.id : null;
    var isadmin = param.isadmin ? param.isadmin : 'N';
    offers.getOffers(id,isadmin,function(err, rows){
        if (err) {
            res.json(err);
        } else {
            var data = rows[0];
            res.json(data);
        }
    });
});

router.get('/getUserStatusByOffer',function(req, res, next){
  var param = req.query;
  offers.getUserStatusByOffer(param,function(err, rows){
      if (err) {
          res.json(err);
      } else {
          var data = rows[0];
          res.json(data);
      }
  });
});

/**
 * 
 */
router.post('/login', function (req, res) {
    offers.checkLogin(req.body.mobile_num, req.body.password, function (err, rows) {
      var data = rows[0];
      if (data[0].isFound == 'Y') {
        res.status(200);
  
        var token = jwt.sign(req.body, config.secret, {
          expiresIn: '7d' // expires in 24 hours
        });
  
        var userProfile;
        users.getUserById(data[0].uid,null, function (err, userData) {
          userProfile = userData[0];
          res.json({
            success: true,
            token: token,
            uid: data[0].uid,
            profile: userProfile[0]
          });
        });
      } else {
        res.status(500);
  
        res.json({
          success: false,
          message: 'Mobile number or password may be incorrect!'
        });
      }
    });
});

/**
 *  To add desing from admin panel
 */
router.post('/addDesign', function (req, res) {
    offers.addDesign(req.body, function (err, rows) {
      if (err) {
        res.send(err);
      }
      else {
        res.status(200);
        res.json({
          success: true,
          message: 'Design added successfully !'
        });
      }
    });
});

/**
 *  To add offer from admin panel
 */
router.post('/addOffer',function(req,res){
    offers.addOffer(req.body, function (err, rows) {
        if (err) {
          res.send(err);
        }
        else {
          res.status(200);
          res.json({
            success: true,
            message: 'offer added successfully !'
          });
        }
      });
  });

  /**
   *  perform action while offer is scribed by users
   */
router.post('/addUserOffer',function(req,res){
    console.log(req.body);
    offers.addUserOffer(req.body, function (err, rows) {
        if (err) {
          res.send(err);
        }
        else {
          res.status(200);
          res.json({
            success: true,
            message: 'offer subscribed successfully !'
          });
        }
      });
  });

router.get('/getOfferDesignList', function (req, res) {
    var param = req.query;
    offers.getOfferDesign(param, function (err, rows) {
      if (err) {
        res.send(err);
      } else {
        res.json(rows[0]);
      }
    });
  });

router.post('/placeOfferDesignOrder', function (req, res) {
    offers.placeOfferDesignOrder(req.body, function (err, rows) {
      if (err) {
        res.send(err);
      } else {
        var data = rows[0];
        if (data[0].checkExists == 'Y') {
          res.status(200);
          res.json({
            success: true
          });
        } else {
          res.status(500);
    
          res.json({
            success: false,
            message: data[0].msg
          });
        }
      }
    });
  });

  router.post('/deleteOffer',function(req,res){
    if(req.body.id){
      offers.deleteOffer(req.body.id,function(err,rows){
        if(err){
          res.send(err);
        }else{
          res.json({
            success: true
          });
        }
      });
    }
  });

  router.post('/deleteOfferDesign', function (req, res) {
    if (req.body.designId === null || req.body === null) {
      res.json({
        success: false,
        message: 'design id is required !'
      });
    }
    else {
      offers.deleteOfferDesign(req.body.designId, function (err, rows) {
        if (err) {
          res.send(err);
        }
        else {
          res.status(200);
          res.json({
            success: true,
            message: 'Record deleted successfully !'
          });
        }
      });
    }
  });

  module.exports = router;
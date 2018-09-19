var express = require('express');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var router = express.Router();
var users = require('../models/users');
var config = require('../config');

router.get('/wallet',function(req, res, next){
  var param = req.query;
   if(param.id){
      users.getWallet(param.id,function(err, rows){
          if (err) {
            res.json(err);
          } else {
            var data = rows[0][0];
            res.json({
              success: true,
              wallet: data.wallet,
              user : data.name
            });
          }
      });
   }
});

router.get('/walletHistory',function(req,res,next){
   var param = req.query;
   if(param.id){
    users.getWalletHistory(param.id,function(err, rows){
        if (err) {
          res.json(err);
        } else {
          var data = rows[0];
          res.json(data);
        }
    });
   }
});

router.post('/updateWallet',function(req, res, next){
  var param = req.body;
   if(param.id && param.amount){
      users.updateWallet(param,function(err, rows){
          if (err) {
            res.json(err);
          } else {
            var data = rows[0][0];
            if(data.msg=="notvalid"){
              res.status(500);
              res.json({
                success: false,
                message:"amount can be debited less then wallet amount"
              });
            }else{
              res.json({
                success: true,
                wallet: data.wallet,
                user : data.name
              });
            }
          }
      });
   }
});

/* GET users listing */
router.get('/:id?', function (req, res, next) {
  if (req.params.id) {
    users.getUserById(req.params.id,null, function (err, rows) {
      if (err) {
        res.json(err);
      } else {
        var data = rows[0];
        res.json(data[0]);
      }
    });
  } else {
    users.getUserById(null,req.query.isadmin, function (err, rows) {
      if (err) {
        res.json(err);
      } else {
        var data = rows[0];
        res.json(data);
      }
    });
  }
});

router.post('/DeleteUser', function (req, res, next) {
  var param = req.body;
  users.deleteUser(param.userId, param.userRole, function (err, rows) {
    if (err) {
      res.send(err);
    }
    else {
      var data = rows[0];
      var imageArry = new Array();
      for (var i = 0; i < data.length; i++) {
        var designKeys = Object.keys(data[i]).filter(function (key) {
          if ((key.indexOf('image_url') != -1 || key.indexOf('design_zip_url') != -1) && data[i][key] !== null) {
            return true;
          }
        });

        designKeys.forEach(function (key) {
          imageArry.push(JSON.parse(data[i][key]).path);
        });
      }

      res.status(200);
      res.json({
        success: true,
        message: 'Record deleted successfully !',
        storagePaths: imageArry
      });
    }
  });
});

router.post('/changepassword', function (req, res) {
  users.changePassword(req.body.id, req.body.oldPassword, req.body.newPassword, function (err, rows) {
    if (err) {
      res.send(err);
    } else {
      var data = rows[0];
      if (data[0].status == 'success') {
        res.status(200);

        res.json({
          success: true,
          message: 'Password changed successfully !'
        });
      } else {
        res.status(500);

        res.json({
          success: false,
          message: 'Old password is wrong. Please enter a valid password'
        });
      }
    }
  });
});

router.post('/update', function (req, res) {
  users.updateUser(req.body, function (err, rows) {
    if (err) {
      res.send(err);
    } else {
      var data = rows[0];
      if (data[0].status == 'success') {
        res.status(200);

        var userProfile;
        users.getUserById(req.body.user_id, function (err, userData) {
          userProfile = userData[0];
          res.json({
            success: true,
            message: 'User updated successfully',
            profile: userProfile[0]
          });
        });
      } else {
        res.status(500);

        res.json({
          success: false,
          message: 'Something is wrong while user update !'
        });
      }
    }
  });
});

router.post('/register', function (req, res) {
  users.addUser(req.body, function (err, rows) {
    if (err) {
      res.send(err);
    } else {
      var data = rows[0];
      if (data[0].status == 'success') {
        res.status(200);

        var token = jwt.sign(req.body, config.secret, {
          expiresIn: '7d' // expires in 24 hours
        });

        var userProfile;
        users.getUserById(data[0].uid, function (err, userData) {
          userProfile = userData;
          res.json({
            success: true,
            message: data[0].message,
            token: token,
            uid: data[0].uid,
            profile: userProfile[0][0]
          });
        });
      } else {
        res.status(500);

        res.json({
          success: false,
          message: data[0].message
        });
      }
    }
  });
});

router.post('/login', function (req, res) {
  users.checkLogin(req.body.mobile_num, req.body.password, function (err, rows) {
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
      if(data[0].isBlock == 'Y'){
        res.json({
          success: false,
          message: 'Your account is temporary blocked by admin !'
        });
      }else{
        res.json({
          success: false,
          message: 'Mobile number or password may be incorrect !'
        });
      }
    }
  });
});

router.post('/updateIsAdminStatus',function(req,res){
  var param = req.body;
  users.updateIsAdminStatus(param.id,param.status,function(err,rows){
    if (err) {
      res.send(err);
    } else {
      var data = rows[0];
      if (data[0].status == 'success') {
        res.status(200);
        res.json({
          success: true,
          message: 'User updated successfully'
        });
      }
    }
  });
});

router.post('/updateIsBlockStatus',function(req,res){
  var param = req.body;
  users.updateIsBlockStatus(param.id,param.status,function(err,rows){
    if (err) {
      res.send(err);
    } else {
      var data = rows[0];
      if (data[0].status == 'success') {
        res.status(200);
        res.json({
          success: true,
          message: 'User updated successfully'
        });
      }
    }
  });
});

router.post('/resetPassword',function(req,res){
  var param = req.body;
  users.resetPassword(param.id,function(err,rows){
    if (err) {
      res.send(err);
    } else {
      var data = rows[0];
      if (data[0].status == 'success') {
        res.status(200);
        res.json({
          success: true,
          message: 'Password reset successfully !'
        });
      }
    }
  });
});

module.exports = router;
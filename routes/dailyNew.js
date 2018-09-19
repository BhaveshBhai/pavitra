var express = require('express');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var router = express.Router();
var dailyNew = require('../models/dailyNewModel');
var config = require('../config');
var notifier = require('../utility/onesignal.js');

router.post('/add', function (req, res) {
  dailyNew.addDailyNew(req.body.designID,function(err,rows){
    var data = rows[0];
    if (data[0].status == 'Y') {
      res.status(200);
      res.json({
        success: true,
        message: 'Latest design added to Dine dine navam navam list !'
      });
      var img = JSON.parse(data[0].image_url).downloadUrl;
     notifier.fireNotification('Latest design','Touch to see in dine dine navam navam',{'type':'daily'},img,['All']);
    } else {
      res.status(500);
      res.json({
        success: false,
        message: data[0].msg
      });
    }
  });
});

router.delete('/delete', function (req, res) {
  dailyNew.deleteDailyNew(req.body.dailyNewId,function(err,rows){
    var data = rows[0];
    if (data[0].status == 'success') {
      res.status(200);
      res.json({
        success: true,
        message: 'Design is deleted successfully !'
      });
    } else {
      res.status(500);

      res.json({
        success: false
      });
    }
  });
});

module.exports = router;
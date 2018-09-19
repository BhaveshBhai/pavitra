var express = require('express');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var router = express.Router();
var design = require('../models/DesignModel');
var config = require('../config');
var notifier = require('../utility/onesignal.js');

router.post('/addDesign', function (req, res) {
  design.addDesign(req.body, function (err, rows) {
    if (err) {
      res.send(err);
    }
    else {

      if(req.body.uploaded_by==='CUSTOMER'){
        var img = JSON.parse(req.body.image_url_1).downloadUrl;
        notifier.fireNotification('New requirement','Touch to see requirement uploaded by '+req.body.uploader_id,{'type':'requirement'},img,['designers']);
      }

      res.status(200);
      res.json({
        success: true,
        message: (req.body.uploaded_by === 'DESIGNER' ? 'Design' : 'Requirement') + ' added successfully !'
      });
    }
  });
});

router.post('/delete', function (req, res) {
  if (req.body.designId === null || req.body === null) {
    res.json({
      success: false,
      message: 'design id is required !'
    });
  }
  else {
    design.deleteDesign(req.body.designId,req.body.uploadedBy, function (err, rows) {
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

router.get('/getDesignList', function (req, res) {
  var param = req.query;
  design.getDesignListByFilter(param.limit, param.start, param.uploaded_by, param.type, param.user, param.search, param.isdaily, function (err, rows) {
    if (err) {
      res.send(err);
    } else {
      res.json(rows[0]);
    }
  });
});

module.exports = router;
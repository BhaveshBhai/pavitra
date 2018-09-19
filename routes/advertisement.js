var express = require('express');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var router = express.Router();
var advertisement = require('../models/advertisementModel');
var config = require('../config');

router.get('/:id?', function (req, res, next) {
  advertisement.getAdvertisement(req.params.id, function (err, rows) {
    if (err) {
      res.send(err);
    }
    else {
      res.json(rows[0]);
    }
  });
});

router.post('/add', function (req, res) {
  advertisement.addAdvertisement(req.body.image_url, function (err, rows) {
    if (err) {
      res.send(err);
    }
    else {
      res.status(200);
      res.json({
        success: true,
        message: 'Advertisement added successfully !'
      });
    }
  });
});

router.delete('/delete', function (req, res) {
  advertisement.deleteAdvertisement(req.body.advertisementId,function(err,rows){
    var data = rows[0];
    if (data[0].status == 'success') {
      res.status(200);
      res.json({
        success: true,
        message: 'Advertisement is deleted successfully !'
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
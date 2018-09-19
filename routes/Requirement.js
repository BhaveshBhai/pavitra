var express = require('express');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var router = express.Router();
var requirement = require('../models/RequirementModel');
var config = require('../config');

router.post('/addEstimate', function (req, res) {
  requirement.AddEstimate(req.body,function(err,rows){
    if (err) {
      res.send(err);
    }
    else{
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

module.exports = router;
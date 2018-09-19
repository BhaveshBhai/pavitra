var express = require('express');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var router = express.Router();
var order = require('../models/OrderModel');
var config = require('../config');

// Place order
router.post('/placeOrder', function (req, res) {
  order.placeOrder(req.body, function (err, rows) {
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
  });
});

// Get orders by ID and status
router.get('/OrdersbyCustomers', function (req, res, next) {
  var param = req.query;
  order.getOrdersByCustomer(param.user, param.status, param.admin, function (err, rows) {
    if (err) {
      res.send(err);
    }
    else {
      res.json(rows[0]);
    }
  });
});

//for selling
router.get('/Selling', function (req, res, next) {
  var param = req.query;
  order.getSelling(param.user, function (err, rows) {
    if (err) {
      res.send(err);
    }
    else {
      res.json(rows[0]);
    }
  });
});

router.post('/updateSelling', function (req, res) {
  order.updateSelling(req.body, function (err, rows) {
    var data = rows[0];
    if (data[0].status == 'success') {
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
  });
});

// Delete order by Order ID and Design ID
router.delete('/RemoveOrder/:id?', function (req, res, next) {
  var param = req.query;

  order.removeOrder(req.params.id, param.designId, function (err, rows) {
    if (err) {
      res.send(err);
    } else {
      var data = rows[0];
      if (data[0].status == 'success') {
        res.status(200);

        res.json({
          success: true,
          message: 'Item removed from cart successfully'
        });
      } else {
        res.status(500);

        res.json({
          success: false,
          message: 'Item does not exist !'
        });
      }
    }
  });
});

router.post('/UpdateOrderStatus', function (req, res) {
  order.updateOrderStatus(req.body, function (err, rows) {
    if (err) {
      res.send(err);
    } else {
      var data = rows[0];
      if (data[0].status == 'success') {
        res.status(200);

        res.json({
            success: true
          });
      } else {
        res.status(500);

        res.json({
          success: false
        });
      }
    }
  });
});

module.exports = router;
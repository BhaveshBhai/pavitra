var db = require('../dbconnection');

var orderModel = {
    placeOrder: function (order, callback) {
        return db.query('call sp_PlaceOrder(?,?,?,?,?,?,?,?)', [order.order_id, order.design_id, order.customer_id, order.designer_id, order.status, order.verify, order.payment_mode, order.payment_transaction_id], callback);
    },

    getOrdersByCustomer: function (userId, status, isadmin, callback) {
        return db.query('call sp_GetOrdersbyCustomers(?,?,?)', [userId, status, isadmin], callback);
    },

    removeOrder: function (orderId, designId, callback) {
        return db.query('call sp_RemoveOrder(?,?)', [orderId, designId], callback);
    },

    updateOrderStatus: function (order, callback) {
        return db.query('call sp_UpdateOrderStatus(?,?,?,?,?,?)', [order.order_id, order.customer_id, order.status, order.payment_mode, order.payment_transaction_id, order.onlystatus], callback);
    },

    getSelling : function(user,callback){
        return db.query('call sp_GetSellingByDesigner(?)',[user],callback);
    },

    updateSelling : function(order,callback){
        return db.query('call sp_UpdateSelling(?,?,?)',[order.order_id, order.designer_id,order.design_id],callback);
    }
};

module.exports = orderModel;
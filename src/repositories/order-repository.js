const OrderModel = require('../models/order');

exports.get = () => {
  return OrderModel
    .find()
    .populate(['customer', 'items.product']);
}

exports.create = async (body) => {
  const newOrder = await new OrderModel(body);
  newOrder.save();
}
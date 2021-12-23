const Order = require('../models/Order');

async function getByUserId(id) {
    return Order.find({userId: id});
}

async function create(data) {
    const result = new Order(data);
    await result.save();

    return result;
}

module.exports = {
    getByUserId,
    create,
};
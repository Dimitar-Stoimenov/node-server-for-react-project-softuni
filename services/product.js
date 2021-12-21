const Product = require('../models/Product');


async function getAll() {
    return Product.find({}).lean();
}

async function create(data) {
    const result = new Product(data);
    await result.save();

    return result;
}

async function getById(id) {
    return Product.findById(id);
}

async function update(original, updated) {
    Object.assign(original, updated);
    await original.save();

    return original;
}

async function remove(id) {
    return Product.findByIdAndDelete(id);
}

async function getByOwnerId(id) {
    return Product.find({ owner: id });
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove,
    getByOwnerId,
};
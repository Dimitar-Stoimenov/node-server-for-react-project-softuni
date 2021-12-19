const mongoose = require('mongoose');

const { DB_CONNECTION_STRING } = require('./constants.js');

exports.initDatabase = function () {
    return mongoose.connect(DB_CONNECTION_STRING);
};
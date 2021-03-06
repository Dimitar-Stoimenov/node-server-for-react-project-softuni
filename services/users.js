const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../constants')

async function register(email, password, isVendor) {
    // check if user exists
    const existing = await User.findOne({ email });

    if (existing) {
        const err = new Error('User with this email already exists in the database');
        err.status = 409;
        throw err;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
        email,
        hashedPassword,
        isVendor,
    });

    await user.save();

    return {
        _id: user._id,
        email: user.email,
        accessToken: createToken(user),
        isVendor: user.isVendor,
    };
}

async function login(email, password) {
    const user = await User.findOne({ email });

    if (!user) {
        const err = new Error('Incorrect email or password');
        err.status = 401;
        throw err;
    }

    const match = await bcrypt.compare(password, user.hashedPassword);

    if (!match) {
        const err = new Error('Incorrect email or password');
        err.status = 401;
        throw err;
    }

    return {
        _id: user._id,
        email: user.email,
        accessToken: createToken(user),
        isVendor: user.isVendor,
    };
}

function createToken(user) {
    const token = jwt.sign({
        _id: user._id,
        email: user.email,
        isVendor: user.isVendor,
    }, SECRET);

    return token;
}

module.exports = {
    register,
    login,
}
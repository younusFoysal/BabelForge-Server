// utils/helpers.js
const jwt = require('jsonwebtoken');

const generateJwtToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '365d' });
};

module.exports = { generateJwtToken };

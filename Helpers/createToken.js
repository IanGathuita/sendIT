const jwt = require('jsonwebtoken');
const constants = require('../Helpers/constants');
const maxAge = constants.maxAge;
require('dotenv').config;
const createToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET, {
        expiresIn: maxAge
    });
};
module.exports = createToken;
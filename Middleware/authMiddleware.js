require('dotenv').config();
const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const token = req.cookies.jwt;
    // check json web token exists & is verified
    if (token) {
        jwt.verify(token, process.env.SECRET, (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.send('Invalid token');
            } else {
                console.log(decodedToken);
                next();
            }
        });
    } else {
        res.send('Please log in with valid credentials.');
    }
};


module.exports = {authenticate};
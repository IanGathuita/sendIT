require('dotenv').config();
const jwt = require('jsonwebtoken');
const controller = require("../Controller/controller");


const authenticate = async (req, res, next) => {
    const token = req.headers.authorization;
    console.log(req.headers)
    let user;
    // check json web token exists & is verified
    if (token) {
        
        jwt.verify(token, process.env.SECRET, async (err, decodedToken) => {
            if (err) {
                console.log(err.message + "\n");                
                res.json({"err":"Invalid token"});
            } else {
                const user = await controller.user_get_for_jwt(decodedToken.id)
                console.log("User is",user);                
                req.user = user;           
                next();
            }
        });
    } else {
        console.log("Token is not there")
        res.send({"err":"Please log in with valid credentials."});
    }
};


module.exports = {authenticate};
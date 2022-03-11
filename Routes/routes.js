const controller = require("../Controller/controller");
const express = require('express');
const router = express.Router();
const authMiddleware = require('../Middleware/authMiddleware');
const authenticate = authMiddleware.authenticate;


router.get('/',(req,res) => {
    res.send('got /');
});
router.get('/parcels',authenticate,controller.parcels_get_all);
router.get('/parcels/:id',authenticate,controller.parcel_get);
router.get('/users/:id/parcels',authenticate,controller.parcels_get);
router.delete('/parcels/:id/cancel',authenticate,controller.delete_parcel);
router.post('/parcels',authenticate,controller.create_parcel);
router.post('/user',controller.create_user);
router.post('/login',controller.get_a_user);
router.get('/logout',controller.log_out);
router.put('/update',controller.update_user);

//temporary route to test redirect after user logs out
router.get('/login',(req,res) => {
    res.send('You are not logged in.Please log in to access protected routes.');
});
module.exports = router;
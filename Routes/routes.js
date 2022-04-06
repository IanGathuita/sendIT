const controller = require("../Controller/controller");
const express = require('express');
const router = express.Router();
const authMiddleware = require('../Middleware/authMiddleware');
const authenticate = authMiddleware.authenticate;


router.get('/',(req,res) => {
    res.send('got /');
});
router.get('/api/parcels',authenticate,controller.parcels_get_all);
router.get('/parcels/:id',authenticate,controller.parcel_get);
router.get('/api/receivedparcels',authenticate,controller.received_parcels_get);
router.get('/users/:id/parcels',authenticate,controller.parcels_get);
router.delete('/api/parcels/:id/cancel',authenticate,controller.delete_parcel);
router.post('/api/parcels',authenticate,controller.create_parcel);
router.post('/api/user',controller.create_user);
router.post('/api/login',controller.get_a_user);
router.get('/api/users',authenticate,controller.users_get);
router.get('/logout',controller.log_out);
router.put('/api/updateuser',controller.update_user);
router.put('/api/updateparcel',controller.update_parcel);
router.delete('/deleteuser',authenticate,controller.delete_user);

//temporary route to test redirect after user logs out
router.get('/login',(req,res) => {
    res.send('You are not logged in.Please log in to access protected routes.');
});
module.exports = router;
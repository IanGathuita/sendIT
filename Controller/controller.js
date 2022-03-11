const config = require("../Config/config");
const mssql = require('mssql');
const jwt = require('jsonwebtoken');
const createToken = require('../Helpers/createToken');
const constants = require('../Helpers/constants');
const maxAge = constants.maxAge;
//import version 4 of uuid
const uuidVersion4 = require('uuid').v4;
const validation = require('../Helpers/validation');
const validateUser = validation.validateUser;
const validateParcel = validation.validateParcel;
require('dotenv').config();

const users_get = async (req, res) => {
    try {
        await mssql.connect(config);
        const result = await (new mssql.Request().execute('sp_get_users')
            .then((result) => {
                res.status(200).send(result.recordset);
            }).catch((err) => {
                res.status(400).send(err.message);
                console.log(err.message);
            }));
    }
    catch (e) {
        console.log(e.message);
        res.send(e.message);
    }
}


const parcel_get = async (req, res) => {
    const id = req.params.id;
    try {
        await mssql.connect(config);
        const result = await (new mssql.Request()
        .input('id', mssql.VarChar(100), `${id}`)
        .execute('sp_get_a_parcel')
            .then((result) => {
                res.status(200).send(result.recordset);
            }).catch((err) => {
                res.status(400).send(err.message);
                console.log(err.message);
            }));
    }
    catch (e) {
        console.log(e.message);
        res.send(e.message);
    }
}
const parcels_get = async (req, res) => {
    const sender_id = req.params.id;
    try {
        await mssql.connect(config);
        const result = await (new mssql.Request()
        .input('sender_id', mssql.VarChar(100), `${sender_id}`)
        .execute('sp_get_parcels_for_id')
            .then((result) => {
                res.status(200).send(result.recordset);
            }).catch((err) => {
                res.status(400).send(err.message);
                console.log(err.message);
            }));
    }
    catch (e) {
        console.log(e.message);
        res.send(e.message);
    }
}

const parcels_get_all = async (req, res) => {
    try {
        await mssql.connect(config);
        const result = await (new mssql.Request()
        .execute('sp_get_parcels')
            .then((result) => {
                res.status(200).send(result.recordset);
            }).catch((err) => {
                res.status(400).send(err.message);
                console.log(err.message);
            }));
    }
    catch (e) {
        console.log(e.message);
        res.send(e.message);
    }
}

const delete_parcel = async (req, res) => {
    const id = req.params.id;
    const is_deleted = req.body.is_deleted;
    try {
        await mssql.connect(config);
        const result = await (new mssql.Request()
        .input('id', mssql.VarChar(100), `${id}`)
        .input('is_deleted', mssql.Int, `${is_deleted}`)
        .execute('sp_delete_parcel')
            .then((result) => {
                res.status(200).json({"message":"parcel deleted"});
            }).catch((err) => {
                res.status(400).send(err.message);
                console.log(err.message);
            }));
    }
    catch (e) {
        console.log(e.message);
        res.send(e.message);
    }
}
const user_get = async (req, res) => {
    const id = req.params.id;
    try {
        await mssql.connect(config);
        const result = await (new mssql.Request()
        .input('id', mssql.VarChar(100), `${id}`)
        .execute('sp_get_a_user')
            .then((result) => {
                res.status(200).send(result.recordset);
            }).catch((err) => {
                res.status(400).send(err.message);
                console.log(err.message);
            }));
    }
    catch (e) {
        console.log(e.message);
        res.send(e.message);
    }
}

const create_user = async (req, res) => {
    const {username,full_name,phone_number,email, password,is_admin,is_deleted,is_sent } = req.body;
    //generate a random UUID
    const id = uuidVersion4();
    const userToCreate = {id,username,full_name,phone_number,email, password,is_admin,is_deleted,is_sent};
    try {
        const validationResponse = validateUser(userToCreate);
        if(validationResponse.error){
            //Send back an array of error objects, stop this function's execution.
            res.send(validationResponse.error.details);
            return;
        }        
        await mssql.connect(config);
        const result = await (new mssql.Request()
            .input('id', mssql.VarChar(100), `${id}`)
            .input('username', mssql.VarChar(100), `${username}`)
            .input('full_name', mssql.VarChar(100), `${full_name}`)
            .input('phone_number', mssql.VarChar(13), `${phone_number}`)
            .input('email', mssql.VarChar(100), `${email}`)
            .input('password', mssql.VarChar(50), `${password}`)
            .input('is_admin', mssql.Int, `${is_admin}`)
            .input('is_deleted', mssql.Int, `${is_deleted}`)
            .input('is_sent', mssql.Int, `${is_sent}`)
            .execute('sp_create_user')
            .then((result) => {
                const token = createToken(id);
                //maxAge is 3 days im milliseconds
                res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
                res.status(201).send(`User with an id of ${id} created successfully.`);
            }).catch((err) => {
                res.status(400).send(err.message);
            }));
    }
    catch (e) {
        console.log(e.message);
        res.send(e.message);
    }
};

const create_parcel = async (req, res) => {
    const id = uuidVersion4();
    const {description,sender_number,receiver_number,start_location,
        end_location, is_deleted,is_updated,is_sent,is_delivered,current_location,sender_id} = req.body;
    const parcelToCreate = {id,description,sender_number,receiver_number,start_location,
        end_location, is_deleted,is_updated,is_sent,is_delivered,current_location,sender_id};
    try {
        const validationResponse = validateParcel(parcelToCreate);
        if(validationResponse.error){
            //Send back an array of error objects, stop this function's execution.
            res.send(validationResponse.error.details);
            return;
        }         
        await mssql.connect(config);
        const result = await (new mssql.Request()
            .input('id', mssql.VarChar(100), `${id}`)
            .input('description', mssql.VarChar(100), `${description}`)
            .input('sender_number', mssql.VarChar(100), `${sender_number}`)
            .input('receiver_number', mssql.VarChar(13), `${receiver_number}`)
            .input('start_location', mssql.VarChar(100), `${start_location}`)
            .input('end_location', mssql.VarChar(50), `${end_location}`)
            .input('is_deleted', mssql.Int, `${is_deleted}`)
            .input('is_updated', mssql.Int, `${is_updated}`)
            .input('is_sent', mssql.Int, `${is_sent}`)
            .input('is_delivered', mssql.Int, `${is_delivered}`)
            .input('current_location', mssql.VarChar(100), `${current_location}`)
            .input('sender_id', mssql.VarChar(100), `${sender_id}`)
            .execute('sp_create_parcel')
            .then((result) => {
                res.status(201).send(`Parcel with an id of ${id} created successfully.`);
            }).catch((err) => {
                res.status(400).send(err.message);
            }));
    }
    catch (e) {
        console.log(e.message);
        res.send(e.message);
    }
};

const get_a_user = async (req, res) => {
    const { email, password } = req.body;
    try {
        await mssql.connect(config);
        await (new mssql.Request()
            .input('email', mssql.VarChar(200), `${email}`)
            .execute('sp_get_a_user')
            .then((result) => {
                if (result.recordset.length > 0) {
                    if (password === result.recordset[0].password) {
                        const token = createToken(result.recordset[0].id);
                        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
                        res.status(200).send(`You are now logged in as ${email}`);
                    }
                    else {
                        throw new Error('incorrect password');
                    }
                }
                else {
                    throw new Error('invalid email');
                }
            }).catch((err) => {
                res.send(err.message);
            })
        );
    }
    catch (e) {
        console.log(e);
        res.send(e);
    }
};
const update_user = async (req,res) => {
    const {id,username,full_name,phone_number,email, password,is_admin,is_deleted,is_sent } = req.body;
    try {
               
        await mssql.connect(config);
        const result = await (new mssql.Request()
            .input('id', mssql.VarChar(100), `${id}`)
            .input('username', mssql.VarChar(100), `${username}`)
            .input('full_name', mssql.VarChar(100), `${full_name}`)
            .input('phone_number', mssql.VarChar(13), `${phone_number}`)
            .input('email', mssql.VarChar(100), `${email}`)
            .input('password', mssql.VarChar(50), `${password}`)
            .input('is_admin', mssql.Int, `${is_admin}`)
            .input('is_deleted', mssql.Int, `${is_deleted}`)
            .input('is_sent', mssql.Int, `${is_sent}`)
            .execute('sp_update_user')
            .then((result) => {
                res.status(201).send(`User info updated successfully.`);
            }).catch((err) => {
                res.status(400).send(err.message);
            }));
    }
    catch (e) {
        console.log(e.message);
        res.send(e.message);
    }

}

const log_out = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/login');
};


module.exports = {user_get,users_get,parcels_get,parcels_get_all,parcel_get,create_user,get_a_user,delete_parcel,
    create_parcel,log_out,update_user}
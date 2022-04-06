const config = require("../Config/config");
const mssql = require('mssql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
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
                res.status(200).json({"users":result.recordset});
            }).catch((err) => {
                res.status(400).json({"err":err.message});
                console.log(err.message);
            }));
    }
    catch (e) {
        console.log(e.message);
        res.json({"err":e.message});
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
    const sender_id = req.user.id;
    try {
        await mssql.connect(config);
        const result = await (new mssql.Request()
        .input('sender_id', mssql.VarChar(100), `${sender_id}`)
        .execute('sp_get_parcels_for_id')
            .then((result) => {
                res.status(200).send({'sent':result.recordset});
            }).catch((err) => {
                res.status(400).send({'err':err.message});
                console.log(err.message);
            }));
    }
    catch (e) {
        console.log(e.message);
        res.send({'err':err.message});
    }
}
const received_parcels_get = async (req, res) => {
    const receiver_number = req.user.phone_number;
    console.log("Receiver's number ",receiver_number);
    try {
        await mssql.connect(config);
        const result = await (new mssql.Request()
        .input('receiver_number', mssql.VarChar(13), `${receiver_number}`)
        .execute('sp_get_received_parcels')
            .then((result) => {
                res.status(200).send({'received':result.recordset});
            }).catch((err) => {
                res.status(400).send({'err':err.message});
                console.log(err.message);
            }));
    }
    catch (e) {
        console.log(e.message);
        res.send({'err':e.message});
    }
}

const parcels_get_all = async (req, res) => {
    try {
        await mssql.connect(config);
        const result = await (new mssql.Request()
        .execute('sp_get_parcels')
            .then((result) => {
                res.status(200).json({"parcels":result.recordset});
            }).catch((err) => {
                res.status(400).json({"err":err.message});
                console.log(err.message);
            }));
    }
    catch (e) {
        console.log(e.message);
        res.json({"err":err.message});
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
                console.log("DELETED PARCEL");
            }).catch((err) => {
                res.status(400).json({"err":err.message});
                console.log(err.message);
            }));
    }
    catch (e) {
        console.log(e.message);
        res.json({"err":err.message});
    }
}

const delete_user = async (req, res) => {
    const id = req.body.id;
    const is_deleted = req.body.is_deleted;
    try {
        await mssql.connect(config);
        const result = await (new mssql.Request()
        .input('id', mssql.VarChar(100), `${id}`)
        .input('is_deleted', mssql.Int, `${is_deleted}`)
        .execute('sp_delete_user')
            .then((result) => {
                res.status(200).json({"message":"user deleted"});
                console.log("DELETED USER");
            }).catch((err) => {
                res.status(400).json({"err":err.message});
                console.log(err.message);
            }));
    }
    catch (e) {
        console.log(e.message);
        res.json({"err":e.message});
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
                res.status(400).json({"err": e.message});
                console.log(err.message);
            }));
    }
    catch (e) {
        console.log(e.message);
        res.json({"err": e.message});
    }
}
const user_get_for_jwt = async (id) => {
    let user;
    let error;
    
    try {
        await mssql.connect(config);
        const result = await (new mssql.Request()
        .input('id', mssql.VarChar(60), `${id}`)
        .execute('get_a_user_by_id')
            .then((result) => {
                // console.log(result.recordset[0]);
                user = result.recordset[0];
            }).catch((err) => {
                throw new Error(err.message);
            }));
    }
    catch (e) {
        error = e.message;
        return error;
    }
    return user;
}

const create_user = async (req, res) => {
    const {username,full_name,phone_number,email, } = req.body;
    console.log(req.body);
    is_admin = is_deleted = is_sent = 0;
    let password = req.body.password;
    //generate a random UUID
    const id = uuidVersion4();
    const userToCreate = {id,username,full_name,phone_number,email, password,is_admin,is_deleted,is_sent};
    try {
        const validationResponse = validateUser(userToCreate);
        if(validationResponse.error){
            //Send back an array of error objects, stop this function's execution.
            res.send({"err":validationResponse.error.details});
            console.log(validationResponse.error.details)
            return;
        }
        let salt = await bcrypt.genSalt();
        password = await bcrypt.hash(password, salt);
        await mssql.connect(config);
        const result = await (new mssql.Request()
            .input('id', mssql.VarChar(100), `${id}`)
            .input('username', mssql.VarChar(100), `${username}`)
            .input('full_name', mssql.VarChar(100), `${full_name}`)
            .input('phone_number', mssql.VarChar(13), `${phone_number}`)
            .input('email', mssql.VarChar(100), `${email}`)
            .input('password', mssql.VarChar(60), `${password}`)
            .input('is_admin', mssql.Int, `${is_admin}`)
            .input('is_deleted', mssql.Int, `${is_deleted}`)
            .input('is_sent', mssql.Int, `${is_sent}`)
            .execute('sp_create_user')
            .then((result) => {
                // const token = createToken(id);
                //maxAge is 3 days im milliseconds
                // res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    
                res.status(201).send({"message":`User with an id of ${id} created successfully.`});

            }).catch((err) => {
                console.log(err.message)
                res.status(400).send({"err":err.message});
            }));
    }
    catch (e) {
        console.log(e.message);
        res.send({"err":e.message});
    }
};

const create_parcel = async (req, res) => {
    const id = uuidVersion4();
    const {description,receiver_number,start_location,
        end_location, current_location} = req.body;
    const is_deleted = is_updated = is_sent = is_delivered = 0;
    //get user information from currently authenticated in user (set in authMiddleware)

    const user = req.user;  
    console.log(user) 
    const sender_number= user.phone_number;
    const sender_id = user.id;
    const parcelToCreate = {id,description,sender_number,receiver_number,start_location,
        end_location, is_deleted,is_updated,is_sent,is_delivered,start_location,sender_id};
    try {
        const validationResponse = validateParcel(parcelToCreate);
        if(validationResponse.error){
            //Send back an array of error objects, stop this function's execution.
            res.send({"err": validationResponse.error.details});
            return;
        }         
        await mssql.connect(config);
        const result = await (new mssql.Request()
            .input('id', mssql.VarChar(60), `${id}`)
            .input('description', mssql.VarChar(100), `${description}`)
            .input('sender_number', mssql.VarChar(100), `${sender_number}`)
            .input('receiver_number', mssql.VarChar(13), `${receiver_number}`)
            .input('start_location', mssql.VarChar(100), `${start_location}`)
            .input('end_location', mssql.VarChar(50), `${end_location}`)
            .input('is_deleted', mssql.Int, `${is_deleted}`)
            .input('is_updated', mssql.Int, `${is_updated}`)
            .input('is_sent', mssql.Int, `${is_sent}`)
            .input('is_delivered', mssql.Int, `${is_delivered}`)
            .input('current_location', mssql.VarChar(100), `${start_location}`)
            .input('sender_id', mssql.VarChar(100), `${sender_id}`)
            .execute('sp_create_parcel')
            .then((result) => {
               
                res.status(201).send({"message" :`Parcel with an id of ${id} created successfully.`});
            }).catch((err) => {
                res.status(400).send({"err": err.message});
            }));
    }
    catch (e) {
        console.log(e.message);
        res.send(e.message);
    }
};



const get_a_user = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    try{
        await mssql.connect(config);
        await (new mssql.Request()
            .input('email', mssql.VarChar(200), `${email}`)
            .execute('sp_get_a_user')
            .then(async (result) => {
                if (result.recordset.length > 0) {
                    const auth = await bcrypt.compare(password, result.recordset[0].password);
                    if (auth) {
                        const token = createToken(result.recordset[0].id);
                        // res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
                        console.log(result.recordset[0].is_admin);
                        res.status(200).json({"auth": true,"token":token,"is_admin":result.recordset[0].is_admin});
                    }
                    else {
                        throw new Error('incorrect password');
                    }
                }
                else {
                    throw new Error('invalid email');
                }
            }).catch((err) => {
                res.json({"err":err.message});
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
    console.log(req.body);
    try {
               
        await mssql.connect(config);
        const result = await (new mssql.Request()
            .input('id', mssql.VarChar(100), `${id}`)
            .input('username', mssql.VarChar(100), `${username}`)
            .input('full_name', mssql.VarChar(100), `${full_name}`)
            .input('phone_number', mssql.VarChar(13), `${phone_number}`)
            .input('email', mssql.VarChar(100), `${email}`)
            .input('password', mssql.VarChar(60), `${password}`)
            .input('is_admin', mssql.Int, `${is_admin}`)
            .input('is_deleted', mssql.Int, `${is_deleted}`)
            .input('is_sent', mssql.Int, `${is_sent}`)
            .execute('sp_update_user')
            .then((result) => {
                res.status(201).json({'message': `User info updated successfully.`});
            }).catch((err) => {
                res.status(400).json({"err":err.message});
            }));
    }
    catch (e) {
        console.log(e.message);
        res.json({"err":err.message});
    }

}

const update_parcel = async (req,res) => {
    const {id,description,sender_number,receiver_number,start_location,
        end_location, is_deleted,is_updated,is_sent,is_delivered,sender_id} = req.body;
        
    try {
               
        await mssql.connect(config);
        const result = await (new mssql.Request()
        .input('id', mssql.VarChar(60), `${id}`)
        .input('description', mssql.VarChar(100), `${description}`)
        .input('sender_number', mssql.VarChar(100), `${sender_number}`)
        .input('receiver_number', mssql.VarChar(13), `${receiver_number}`)
        .input('start_location', mssql.VarChar(100), `${start_location}`)
        .input('end_location', mssql.VarChar(50), `${end_location}`)
        .input('is_deleted', mssql.Int, `${is_deleted}`)
        .input('is_updated', mssql.Int, `${is_updated}`)
        .input('is_sent', mssql.Int, `${is_sent}`)
        .input('is_delivered', mssql.Int, `${is_delivered}`)
        .input('current_location', mssql.VarChar(100), `${start_location}`)
        .input('sender_id', mssql.VarChar(100), `${sender_id}`)
        .execute('sp_update_parcel')
            .then((result) => {
                res.status(201).json({'message': `Parcel info updated successfully.`});
            }).catch((err) => {
                res.status(400).json({"err":err.message});
            }));
    }
    catch (e) {
        console.log(e.message);
        res.json({"err":err.message});
    }

}

const log_out = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/login');
};


module.exports = {user_get,users_get,parcels_get,parcels_get_all,parcel_get,create_user,get_a_user,delete_parcel,
    create_parcel,log_out,update_user, user_get_for_jwt,delete_user,update_parcel,
    received_parcels_get}
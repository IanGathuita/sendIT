const Joi = require('joi');

function validateUser(user){
    //generate a blueprint(schema) object for user datatype (object)
    // abortEarly is set to false so if there are multiple errors, they are all displayed in the terminal.
    const userSchema = Joi.object({
        id:Joi.string().uuid({version:'uuidv4'}).required(),
        username: Joi.string().min(1).max(100).required(),
        full_name: Joi.string().min(1).max(100).required(),
        phone_number: Joi.string().min(13).max(13).required(),
        email: Joi.string().email().max(100).required(), 
        password: Joi.string().min(8).max(50).required(),
        is_admin: Joi.number().integer().min(0).max(1),
        is_deleted: Joi.number().integer().min(0).max(1),
        is_sent:Joi.number().integer().min(0).max(1)
    }).options({ abortEarly: false });

    return userSchema.validate(user);
}
function validateParcel(parcel){

    const parcelSchema = Joi.object({
        id:Joi.string().uuid({version:'uuidv4'}).required(),
        description:Joi.string().min(10).max(200).required(),
        sender_number:Joi.string().min(13).max(13).required(),
        receiver_number:Joi.string().min(13).max(13).required(),
        start_location: Joi.string().min(1).max(100).required(),
        end_location:Joi.string().min(1).max(100).required(),
        is_deleted:Joi.number().integer().min(0).max(1),
        is_updated:Joi.number().integer().min(0).max(1), 
        is_sent:Joi.number().integer().min(0).max(1),
        is_delivered:Joi.number().integer().min(0).max(1),
        current_location:Joi.string().min(1).max(100).required(),
        sender_id:Joi.string().uuid({version:'uuidv4'}).required()
    }).options({ abortEarly: false });

    return parcelSchema.validate(parcel);
}

module.exports = {validateUser,validateParcel};
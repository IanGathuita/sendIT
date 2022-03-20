import joi from 'joi';
export default function validateEmail(email){
    const emailSchema = joi.string(joi.string().email().max(100).required());
    return emailSchema.validate(email);
}
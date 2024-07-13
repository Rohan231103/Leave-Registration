const Joi = require('joi');

const userValidation = Joi.object({
    Fname: Joi.string().min(3).max(30).required(),
    Lname: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password:Joi.string().min(6).required()
})
const userLoginValidation = Joi.object({
    email: Joi.string().email().required(),
    password:Joi.string().min(6).required()
})
module.exports = {
    userValidation,
    userLoginValidation
}
const Joi = require('joi');

const leaveValidationSchema = Joi.object({
    CurrentDate:Joi.date().iso().greater('now').required(),
    title: Joi.string().min(3).max(100).required(),
    Description: Joi.string().min(10).required(),
    LeaveDate: Joi.date().iso().greater(Joi.ref('CurrentDate')).required()
});

const UpdateValidationSchema = Joi.object({
    CurrentDate:Joi.date().iso().greater('now'),
    title: Joi.string().min(3).max(100),
    Description: Joi.string().min(10),
    LeaveDate: Joi.date().iso().greater(Joi.ref('CurrentDate'))
});
module.exports = {
    leaveValidationSchema,
    UpdateValidationSchema
}
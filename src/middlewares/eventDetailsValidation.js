const Joi = require('joi');

const createEventDetailsValidation = (req, res, next) => {


    console.log("\n[Middleware] eventDetailsValidation: eventDetailsValidation")


    const schema = Joi.object({
        title: Joi.string().min(3).max(50).required(),
        description: Joi.string().min(10).max(200).required(),
        date: Joi.date().required(),
        venue: Joi.string().min(3).max(50).required(),
        time: Joi.time().required(),
        organizer: Joi.string().min(3).max(50).required(),
        category: Joi.string().min(3).max(50).required(),
        registrationDeadline: Joi.date().required(),
        status: Joi.string().valid('upcoming', 'ongoing', 'completed').required()
    }).custom((obj, helpers) => {
        if (obj.registrationDeadline >= obj.date) {
            return helpers.message('"Excuse me admin! registrationDeadline" must be before "date"');
        }
        return obj;
    }).unknown(false);


    const { error } = schema.validate(req.body);


    if (error) {
        console.log(`[Middleware] eventDetailsValidation: eventDetailsValidation: ${error.details[0].message}`)
        return res.status(400).json({
            status: 400,
            error: '[Middleware] eventDetailsValidation: eventDetailsValidation',
            message: error.details[0].message
        });
    }
    next()
}


const updateEventDetailsValidation = (req, res, next) => {


    console.log("\n[Middleware] updateEventDetailsValidation: updateEventDetailsValidation")


    const schema = Joi.object({
        title: Joi.string().min(3).max(50),
        description: Joi.string().min(10).max(200),
        date: Joi.date(),
        venue: Joi.string().min(3).max(50),
        time: Joi.time(),
        organizer: Joi.string().min(3).max(50),
        category: Joi.string().min(3).max(50),
        registrationDeadline: Joi.date(),
        status: Joi.string().valid('upcoming', 'ongoing', 'completed')
    }).custom((obj, helpers) => {
        if (obj.registrationDeadline >= obj.date) {
            return helpers.message('"Excuse me admin! registrationDeadline" must be before "date"');
        }
        return obj;
    }).unknown(false);


    const { error } = schema.validate(req.body);


    if (error) {
        console.log(`[Middleware] updateEventDetailsValidation: updateEventDetailsValidation: ${error.details[0].message}`)
        return res.status(400).json({
            status: 400,
            error: '[Middleware] updateEventDetailsValidation: updateEventDetailsValidation',
            message: error.details[0].message
        });
    }
    next()
}
module.exports = { createEventDetailsValidation, updateEventDetailsValidation };
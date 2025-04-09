const Joi = require('joi');


const validateUserRegistration = (req, res, next) => {

    console.log("\n[Middleware] validateUserRegistration: validateUserRegistration")


    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        dob: Joi.date().required(),
        gender: Joi.string().valid('male', 'female', 'Better not disclose').required(),
        role: Joi.string().valid('user', 'admin')
    });


    const { error } = schema.validate(req.body);


    if (error) {
        console.log(`[Middleware] validateUserRegistration: ValidationError: ${error.details[0].message}`)
        return res.status(400).json({
            status: 400,
            error: '[Middleware] validateUserRegistration: ValidationError',
            message: error.details[0].message
        });
    }
    next()
}




const validateUserLogin = (req, res, next) => {


    console.log("\n[Middleware] validateUserLogin")
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
    });


    const { error } = schema.validate(req.body);
    if (error) {
        console.log(`[Middleware] validateUserLogin: ValidationError: ${error.details[0].message}`)
        return res.status(400).json({
            status: 400,
            error: '[Middleware] validateUserLogin: ValidationError',
            message: error.details[0].message
        });
    }
    next()
}


module.exports = {
    validateUserRegistration,
    validateUserLogin
}

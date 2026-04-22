const Joi = require('joi');

const validateFields = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().min(2).max(200).required().messages({
            'string.base': 'The name must be a valid string (e.g., John, Betty)',
            'string.min': 'The name must have at least 2 characters (e.g., John, Betty)',
            'string.max': 'The name must not be more than 200 characters (e.g., John, Betty)',
            'string.empty': 'Name cannot be empty (e.g., John, Betty)',
            'any.required': 'A name is required (e.g., John, Betty)'
        }),
        email: Joi.string().email().min(5).max(200).required().messages({
            'string.base': 'The email must be a valid string (e.g., exampleEmail@gmail.com)',
            'string.email': 'The email must be in a valid email format (e.g., exampleEmail@gmail.com)',
            'string.min': 'The email must have at least 5 characters (e.g., exampleEmail@gmail.com)',
            'string.max': 'The email must not be more than 200 characters (e.g., exampleEmail@gmail.com)',
            'string.empty': 'Email cannot be empty (e.g., exampleEmail@gmail.com)',
            'any.required': 'A email is required (e.g., exampleEmail@gmail.com)'
        }),
        password: Joi.string().min(8).max(100).required().messages({
            'string.base': 'The password must be a valid string',
            'string.min': 'The password must have at least 8 characters',
            'string.max': 'The password must not be more than 100 characters',
            'string.empty': 'Password cannot be empty ',
            'any.required': 'A password is required'
        })
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(422).json({
            success: false,
            message: error.details[0].message,
            field: error.details[0].path[0]
        })
    }

    next();
}

module.exports = { validateFields }
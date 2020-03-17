const Joi = require('@hapi/joi');

const registerStudentsValidation = data =>{
    const schema = Joi.object({
        first_name: Joi.string().min(3).required(),
        last_name: Joi.string().min(3).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
        password_confirm: Joi.any().equal(Joi.ref('password')).required(),
        birthday:Joi.date().required(),
        city:Joi.string().min(3).required(),
        institution:Joi.string().min(3).required(),
        course:Joi.string().min(1).required(),
        ocr:Joi.string().min(3).required(),
        specialty:Joi.string().min(3).required(),
        photo:Joi.string().allow(''),
        interests:Joi.string().allow(''),
        hobby:Joi.string().allow(''),
        phone:Joi.string().allow(''),
        facebook:Joi.string().allow(''),
        linkedin:Joi.string().allow(''),
        instagramm:Joi.string().allow('')
    });

   return  schema.validate(data)
};

const registerEmployerValidation = data =>{
    const schema = Joi.object({
        first_name: Joi.string().min(3).required(),
        last_name: Joi.string().min(3).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });

   return  schema.validate(data)
};


const loginValidation = data =>{
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });

    return  schema.validate(data)
};

module.exports.registerStudentsValidation = registerStudentsValidation;
module.exports.registerEmployerValidation = registerEmployerValidation;
module.exports.loginValidation = loginValidation;


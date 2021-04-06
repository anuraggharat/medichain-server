const Joi = require("@hapi/joi");

const registerValidationUser = (data) => {
  const schema = {
    name: Joi.string().min(6).required(),
    account: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
    gender: Joi.string().min(1).required(),
    phoneno: Joi.string().min(6).required(),
    age: Joi.string().min(1).required(),
    city: Joi.string().required(),
  };
  return Joi.validate(data, schema);
};

const loginValidationUser = (data) => {
  const schema = {
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  };
  return Joi.validate(data, schema);
};

//validation for doctor

const registerValidationDoctor = (data) => {
  const schema = {
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    account: Joi.string().min(6).required(),
    password: Joi.string().min(6).required(),
    specialization: Joi.string().required(),
    gender: Joi.string().min(1).required(),
    phoneno: Joi.string().min(10).required(),
    age: Joi.string().min(1).required(),
    city: Joi.string().required(),
  };
  return Joi.validate(data, schema);
};

const loginValidationDoctor = (data) => {
  const schema = {
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  };
  return Joi.validate(data, schema);
};
module.exports.registerValidationUser = registerValidationUser;
module.exports.loginValidationUser = loginValidationUser;
module.exports.registerValidationDoctor = registerValidationDoctor;
module.exports.loginValidationDoctor = loginValidationDoctor;

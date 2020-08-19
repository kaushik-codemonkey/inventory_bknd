// Validation
const Joi = require("@hapi/joi");
// register validation
const registerValid = (data) => {
  const validschema = Joi.object({
    name: Joi.string().min(6).required(),
    password: Joi.string().min(6).required(),
    email: Joi.string().email().min(6).required(),
  });
  return validschema.validate(data);
};

const loginValid = (data) => {
  const validschema = Joi.object({
    password: Joi.string().min(6).required(),
    email: Joi.string().email().min(6).required(),
  });
  return validschema.validate(data);
};

module.exports.registerValid = registerValid;
module.exports.loginValid = loginValid;

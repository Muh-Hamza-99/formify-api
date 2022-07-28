const JOI = require("joi");

const registerSchema = JOI.object({
  username: JOI.string().min(5).max(30).trim().required().messages({
    "string.base": `"username" should be a 'string'`,
    "string.min": `"username" should have a minimum length of {#limit}`,
    "string.max": `"username" should have a maximum length of {#limit}`,
    "any.required": `"username" is a required field`,
  }),
  password: JOI.string().min(12).trim().required().messages({
    "string.base": `"password" should be a 'string'`,
    "string.min": `"password" should have a minimum length of {#limit}`,
    "any.required": `"password" is a required field`,
  }),
  email: JOI.string().email().required().messages({
    "string.base": `"email" should be an 'string'`,
    "any.required": `"email" is a required field`,
  }),
});

const loginSchema = JOI.object({
    password: JOI.string().min(12).trim().required().messages({
      "string.base": `"password" should be a 'string'`,
      "string.min": `"password" should have a minimum length of {#limit}`,
      "any.required": `"password" is a required field`,
    }),
    email: JOI.string().email().required().messages({
      "string.base": `"email" should be an 'string'`,
      "any.required": `"email" is a required field`,
    }),
});

module.exports = {
    registerSchema,
    loginSchema,
};
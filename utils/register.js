const emailValidator = require("deep-email-validator");
const isEmailValid = (email) => emailValidator.validate(email);

module.exports = isEmailValid;

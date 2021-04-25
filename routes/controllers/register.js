const User = require("../../models/User");
const emailValidator = require("deep-email-validator");

async function checkFirstStep(req, res) {
  try {
    const { firstName, lastName, email } = req.body;
    if (firstName.length > 0 && lastName.length > 0 && email.length > 0) {
      const validEmail = await emailValidator.validate({
        email,
        validateSMTP: false,
      });
      if (validEmail.valid) {
        const user = await User.findOne({ email });
        if (user) {
          return res.json({
            // Error
            errors: ["E-mail already taken."],
            isGood: false,
          });
        } else {
          return res.json({
            // Good
            errors: [],
            isGood: true,
          });
        }
      } else {
        return res.json({
          // Error
          errors: ["E-mail is not valid"],
          isGood: false,
        });
      }
    } else {
      return res.json({
        // Error
        errors: ["Name & e-mail are required parameters"],
        isGood: false,
      });
    }
  } catch (e) {
    console.error(e.message);
    res.status(500).json({
      // Error
      msg: "Internal server error.",
    });
  }
}

async function checkSecondStep(req, res) {
  try {
    const { username, password } = req.body;
    if (username.length > 0 && password.length > 0) {
      const user = await User.findOne({ username });
      if (user) {
        return res.json({
          // Error
          errors: ["Username must be unique."],
          isGood: false,
        });
      } else if (password.length < 6) {
        return res.json({
          errors: ["Password must contain at least 6 characters (of any type)"],
          isGood: false,
        });
      } else {
        return res.json({
          errors: [],
          isGood: true,
        });
      }
    } else {
      return res.json({
        // Error
        errors: ["Username & password are required parameters"],
        isGood: false,
      });
    }
  } catch (e) {
    console.error(e.message);
    res.status(500).json({
      // Error
      msg: "Internal server error.",
    });
  }
}

const register = {
  checkFirstStep,
  checkSecondStep,
};

module.exports = register;

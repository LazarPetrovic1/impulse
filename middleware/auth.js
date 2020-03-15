const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function(req, res, next) {
  // Get the token from the header
  const token = req.header("x-auth-token");

  // Check if not token
  if (!token) {
    return res.status(401).json({
      msg: "Unauthorized access. Token does not exist. Access denied."
    });
  }

  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    req.user = decoded.user;
    next();
  } catch (e) {
    res
      .status(401)
      .json({ msg: "Unauthorized access. Token invalid. Access denied." });
  }
};

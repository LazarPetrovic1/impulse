const router = require("express").Router();
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcryptjs");

// @route -- GET -- api/auth
// @desc -- -- Get authenticated user
// @access -- -- Public
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    console.log(req.user);
    res.json(user);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Internal server error.");
  }
});

// @route -- POST -- api/auth
// @desc -- -- Authenticate the user and get the token
// @access -- -- Public
router.post("/", async (req, res) => {
  const { email, password, phone, username } = req.body;
  let user;

  try {
    if (email) {
      user = await User.findOne({ email });
    } else if (phone) {
      user = await User.findOne({ phone });
    } else {
      user = await User.findOne({ username });
    }

    if (!user) {
      return res
      .status(400)
      .json({ errors: [{ msg: "Invalid credentials." }] });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Invalid credentials." }] });
    }

    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      config.get("jwtSecret"),
      { expiresIn: 3600000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;

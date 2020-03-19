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

router.put("/firstName", auth, async (req, res) => {
  const { firstName } = req.body;
  console.log(`REQ_BODY: ${JSON.stringify(req.body)}`);
  try {
    const user = await User.findByIdAndUpdate(
      { _id: req.user.id },
      { firstName }
    );
    res.json(user);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Internal server error");
  }
});

router.put("/lastName", auth, async (req, res) => {
  const { lastName } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      { _id: req.user.id },
      { lastName }
    );
    res.json(user);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Internal server error");
  }
});

router.put("/sex", auth, async (req, res) => {
  const { sex } = req.body;

  try {
    const user = await User.findByIdAndUpdate({ _id: req.user.id }, { sex });
    res.json(user);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Internal server error");
  }
});

router.put("/email", auth, async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findByIdAndUpdate({ _id: req.user.id }, { email });
    res.json(user);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Internal server error");
  }
});

router.put("/username", auth, async (req, res) => {
  const { username } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      { _id: req.user.id },
      { username }
    );
    res.json(user);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Internal server error");
  }
});

router.put("/dob", auth, async (req, res) => {
  const { dob } = req.body;
  await console.log(dob);

  try {
    const user = await User.findByIdAndUpdate({ _id: req.user.id }, { dob });
    res.json(user);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Internal server error");
  }
});

router.put("/city", auth, async (req, res) => {
  const { city } = req.body;

  try {
    const user = await User.findByIdAndUpdate({ _id: req.user.id }, { city });
    res.json(user);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Internal server error");
  }
});

router.put("/country", auth, async (req, res) => {
  const { country } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      { _id: req.user.id },
      { country }
    );
    res.json(user);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Internal server error");
  }
});

router.put("/zip", auth, async (req, res) => {
  const { zip } = req.body;

  try {
    const user = await User.findByIdAndUpdate({ _id: req.user.id }, { zip });
    res.json(user);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Internal server error");
  }
});

router.put("/security", auth, async (req, res) => {
  const { security } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      { _id: req.user.id },
      { security }
    );
    res.json(user);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Internal server error");
  }
});

router.put("/phone", auth, async (req, res) => {
  const { phone } = req.body;

  try {
    const user = await User.findByIdAndUpdate({ _id: req.user.id }, { phone });
    res.json(user);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Internal server error");
  }
});

router.put("/question", auth, async (req, res) => {
  const { question } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      { _id: req.user.id },
      { question }
    );
    res.json(user);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Internal server error");
  }
});

router.put("/bio", auth, async (req, res) => {
  const { bio } = req.body;

  try {
    const user = await User.findByIdAndUpdate({ _id: req.user.id }, { bio });
    res.json(user);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;

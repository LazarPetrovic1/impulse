const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { validationResult } = require("express-validator");
const User = require("../../models/User");

async function register(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });
  const {
    firstName,
    lastName,
    email,
    sex,
    bio,
    dob,
    username,
    password,
    city,
    country,
    zip,
    phone,
    question,
    security,
    imageTaken,
    dismissedPosts,
  } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user)
      return res
        .status(400)
        .json({ errors: [{ msg: "User already exists." }] });
    user = new User({
      firstName,
      lastName,
      email,
      sex,
      bio,
      dob,
      username,
      password,
      city,
      country,
      zip,
      phone,
      question,
      security,
      imageTaken,
      dismissedPosts,
      imgSrc: [],
      friends: [],
      friendRequestsSent: [],
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    const payload = { user: { id: user.id } };
    jwt.sign(
      payload,
      config.get("jwtSecret"),
      { expiresIn: 36000000 },
      (err, token) => {
        if (err) throw err;
        return res.json({ token });
      }
    );
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Internal server error");
  }
}

async function getUserById(req, res) {
  try {
    const user = await User.findById(req.params.id).select(
      "-imageTaken -phone -dismissedPosts -password -question -security"
    );
    return res.json(user);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Internal server error");
  }
}

async function hideUsersInfo(req, res) {
  try {
    const user = await User.findById(req.params.id);
    user.hidden = req.body.hidden;
    await user.save();
    return res.json(user);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Internal server error");
  }
}

async function searchUsers(req, res) {
  let allusers = [];
  try {
    // users = await User.find({ firstName: req.body.search }).select("-imageTaken -phone -dismissedPosts -password -question -security -bio -date -dob")
    // if (users.length <= 0) users = await User.find({ lastName: req.body.search }).select("-imageTaken -phone -dismissedPosts -password -question -security -bio -date -dob")
    // else if (users.length <= 0) users = await User.find({ username: req.body.search }).select("-imageTaken -phone -dismissedPosts -password -question -security -bio -date -dob")
    // else if (users.length <= 0) users = await User.find({ email: req.body.search }).select("-imageTaken -phone -dismissedPosts -password -question -security -bio -date -dob")
    // users = await User.find({ $text: { $search: req.body.search } });
    const fnusers = await User.find({
      firstName: { $regex: req.body.search, $options: "i" },
    });
    if (Array.from(fnusers).length > 0) allusers = [...allusers, ...fnusers];
    const lnusers = await User.find({
      lastName: { $regex: req.body.search, $options: "i" },
    });
    if (Array.from(lnusers).length > 0) allusers = [...allusers, ...lnusers];
    const emusers = await User.find({
      email: { $regex: req.body.search, $options: "i" },
    });
    if (Array.from(emusers).length > 0) allusers = [...allusers, ...emusers];
    const unusers = await User.find({
      username: { $regex: req.body.search, $options: "i" },
    });
    if (Array.from(unusers).length > 0) allusers = [...allusers, ...unusers];
    if (allusers.length <= 0)
      res.json({ msg: "No users found, unfortunately. Try something else!" });
    return res.json(allusers);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Internal server error");
  }
}

async function getAuthor(req, res) {
  try {
    const user = await User.findById(req.params.id).select(
      "firstName lastName"
    );
    return res.json(user);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Internal server error");
  }
}

async function getUserByUsername(req, res) {
  try {
    const user = await User.findOne({ username: req.params.username }).select(
      "-imageTaken -phone -dismissedPosts -password -question -security -bio -date -dob"
    );
    res.json(user);
  } catch (e) {
    console.error(e.message);
  }
}

async function getFreeTrial(req, res) {
  try {
    const user = await User.findById(req.user.id);
    const x = new Date();
    user.trial.isUsingTrial = true;
    user.trial.dateStarted = x;
    user.trial.dateEnded = new Date(
      x.getFullYear(),
      x.getMonth() + 1,
      x.getDate()
    );
    await user.save();
    res.json(user);
  } catch (e) {
    console.error(e.message);
  }
}

async function endFreeTrial(req, res) {
  try {
    const user = await User.findById(req.user.id);
    user.trial.isUsingTrial = false;
    await user.save();
    res.json(user);
  } catch (e) {
    console.error(e.message);
  }
}

async function getPremiumAccount(req, res) {
  try {
    const user = await User.findById(req.user.id);
    user.isPremium = true;
    await user.save();
    res.json(user);
  } catch (e) {
    console.error(e.message);
  }
}

async function stopPremiumAccount(req, res) {
  try {
    const user = await User.findById(req.user.id);
    user.isPremium = false;
    await user.save();
    res.json(user);
  } catch (e) {
    console.error(e.message);
  }
}

const user = {
  register,
  getUserById,
  searchUsers,
  getAuthor,
  getUserByUsername,
  hideUsersInfo,
  getFreeTrial,
  endFreeTrial,
  getPremiumAccount,
  stopPremiumAccount,
};

module.exports = user;

const router = require("express").Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../../models/User");

router.post(
  "/public",
  [
    check("firstName", "Name is required.").not().isEmpty(),
    check("lastName", "Name is required.").not().isEmpty(),
    check("email", "E-mail is required.").isEmail(),
    check(
      "password",
      "Please enter a password with more than 6 characters."
    ).isLength({ min: 6 }),
    check("username", "You will need an alias.").not().isEmpty(),
    check("question", "What is your backup?").not().isEmpty(),
    check("security", "Security.").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    const {
      firstName,
      lastName,
      email,
      username,
      password,
      question,
      security,
    } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user)
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists." }] });
      user = {
        firstName,
        lastName,
        email,
        username,
        password,
        question,
        security,
      }
      res.json(user)
    } catch (e) {
      console.error(e.message);
      res.status(500).json({ msg: "The public API is experiencing some issues. Please be patient" });
    }
  }
); // CREATE
router.get("/public/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select(
      `-imageTaken -phone -dismissedPosts -password -question -security -sex -bio -dob -city -country -zip -imgSrc -friends -friendRequestsSent`
    );
    return res.json(user);
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ msg: "The public API is experiencing some issues. Please be patient" });
  }
}); // READ
router.post("/public/search", async (req, res) => {
  const uniqueArray = (arr) =>
    arr.filter((thing, index) => {
      const _thing = JSON.stringify(thing);
      return (
        index ===
        arr.findIndex((obj) => {
          return JSON.stringify(obj) === _thing;
        })
      );
    });
  let allusers = [];
  try {
    const fnusers = await User.find({ firstName: { $regex: req.body.search, $options: "i" } });
    if (Array.from(fnusers).length > 0) allusers = [...allusers, ...fnusers];
    const lnusers = await User.find({ lastName: { $regex: req.body.search, $options: "i" } });
    if (Array.from(lnusers).length > 0) allusers = [...allusers, ...lnusers];
    const emusers = await User.find({ email: { $regex: req.body.search, $options: "i" } });
    if (Array.from(emusers).length > 0) allusers = [...allusers, ...emusers];
    const unusers = await User.find({ username: { $regex: req.body.search, $options: "i" } });
    if (Array.from(unusers).length > 0) allusers = [...allusers, ...unusers];
    if (allusers.length <= 0)
      res.json({ msg: "No users found, unfortunately. Try something else!" });
    const finalarr = uniqueArray(allusers)
    return res.json(finalarr);
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ msg: "The public API is experiencing some issues. Please be patient" });
  }
}); // SEARCH
router.get("/public/postedby/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("firstName lastName username");
    return res.json(user);
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ msg: "The public API is experiencing some issues. Please be patient" });
  }
}); // SPECIFIC
router.get("/public/uname/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username }).select("-imageTaken -phone -dismissedPosts -password -question -security -bio -date -dob");
    res.json(user);
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ msg: "The public API is experiencing some issues. Please be patient" });
  }
}); // SPECIFIC
router.put("/public/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    const newUser = {
      ...user.toString(),
      ...req.body
    }
    return res.json(newUser)
  } catch (e) {
    res.status(500).json({ msg: "The public API is experiencing some issues. Please be patient" });
  }
}) // UPDATE
router.delete("/public/:id", async (req, res) => {
  try {
    const users = await User.find({})
    const newUsers = await Array.from(users).filter(u => u.id.toString() !== req.params.id.toString())
    return res.json(newUsers)
  } catch (e) {
    res.status(500).json({ msg: "The public API is experiencing some issues. Please be patient" });
  }
}) // DELETE

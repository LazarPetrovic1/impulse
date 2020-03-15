const express = require("express"),
  { check, validationResult } = require("express-validator"),
  router = express.Router(),
  auth = require("../../middleware/auth"),
  Profile = require("../../models/Profile"),
  User = require("../../models/User"),
  VideoPost = require("../../models/VideoPost"),
  ForumPost = require("../../models/ForumPost"),
  ImagePost = require("../../models/ImagePost"),
  config = require("config");

// @route -- GET -- api/profile/me
// @desc -- -- Get users profile based on _id
// @access -- -- Private
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      ["name"]
    );

    if (!profile) {
      return res.status(400).json({ msg: "No profile found." });
    }

    res.json(profile);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Internal server error.");
  }
});

// @route -- POST -- api/profile
// @desc -- -- Create or update a user profile
// @access -- -- Private
router.post("/", auth, async (req, res) => {
  const {
    status,
    dateofbirth,
    bio,
    friends,
    youtube,
    twitter,
    facebook,
    linkedin,
    instagram,
    date
  } = req.body;

  const profileFields = {};
  profileFields.user = req.user.id;
  if (status) profileFields.status = status;
  if (dateofbirth) profileFields.dateofbirth = dateofbirth;
  if (bio) profileFields.bio = bio;
  if (friends) profileFields.friends = friends;
  if (date) profileFields.date = date;
  profileFields.social = {};
  if (youtube) profileFields.social.youtube = youtube;
  if (twitter) profileFields.social.twitter = twitter;
  if (facebook) profileFields.social.facebook = facebook;
  if (linkedin) profileFields.social.linkedin = linkedin;
  if (instagram) profileFields.social.instagram = instagram;

  try {
    let profile = await Profile.findOne({ user: req.user.id });
    if (profile) {
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );
      return res.json(profile);
    }

    profile = new Profile(profileFields);
    await profile.save();
    res.json(profile);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Internal server error.");
  }
});

// @route -- GET -- api/profile
// @desc -- -- Get all profiles
// @access -- -- Public
router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name"]);
    res.json(profiles);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Internal server error.");
  }
});

// @route -- GET -- api/profile/user/:user_id
// @desc -- -- Get profile by user ID
// @access -- -- Public
router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate("user", ["name"]);

    if (!profile) return res.status(400).json({ msg: "Profile not found." });

    res.json(profile);
  } catch (e) {
    console.error(e.message);
    if (e.kind == "ObjectId") {
      return res.status(400).json({ msg: "Profile not found." });
    }
    res.status(500).send("Internal server error.");
  }
});

// @route -- DELETE -- api/profile
// @desc -- -- Delete profile, user and posts
// @access -- -- Private
router.delete("/", auth, async (req, res) => {
  try {
    // Remove user's videos
    await VideoPost.deleteMany({ user: req.user.id });
    // Remove user's forum posts
    await ForumPost.deleteMany({ user: req.user.id });
    // Remove user's images
    await ImagePost.deleteMany({ user: req.user.id });
    // Remove profile
    await Profile.findOneAndRemove({ user: req.user.id });
    // Remove user
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: "User removed" });
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Internal server error.");
  }
});

module.exports = router;

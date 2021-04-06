const router = require("express").Router();
const auth = require("../../middleware/auth");
const config = require("config");
const profile = require("../controllers/profile");

router.get("/me", auth, profile.getMyProfile);
router.post("/", auth, profile.createProfile);
router.get("/", profile.getProfiles);
router.get("/user/:user_id", profile.getUsersProfile);
router.delete("/", auth, profile.deleteProfile);

module.exports = router;

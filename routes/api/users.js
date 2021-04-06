const router = require("express").Router();
const { check } = require("express-validator");
const auth = require("../../middleware/auth");
const user = require("../controllers/users");

router.post(
  "/",
  [
    check("firstName", "Name is required.").not().isEmpty(),
    check("lastName", "Name is required.").not().isEmpty(),
    check("email", "E-mail is required.").isEmail(),
    check(
      "password",
      "Please enter a password with more than 6 characters."
    ).isLength({ min: 6 }),
    check("sex", "Please choose a gender.").not().isEmpty(),
    check("bio", "Tell us a bit about yourself.").not().isEmpty(),
    check("dob", "When were you born?").not().isEmpty(),
    check("username", "You will need an alias.").not().isEmpty(),
    check("city", "Where are you from?").not().isEmpty(),
    check("country", "Where are you from?").not().isEmpty(),
    check("zip", "Where are you from?").not().isEmpty(),
    check("phone", "Your phone number is required.").not().isEmpty(),
    check("question", "What is your backup?").not().isEmpty(),
    check("security", "Security.").not().isEmpty(),
  ],
  user.register
);

router.get("/:id", user.getUserById);
router.post("/hide/:id", user.hideUsersInfo);
router.post("/search", user.searchUsers);
router.get("/postedby/:id", user.getAuthor);
router.get("/uname/:username", user.getUserByUsername);

module.exports = router;

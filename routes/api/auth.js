const router = require("express").Router();
const auth = require("../../middleware/auth");
const authObj = require("../controllers/auth");

router.get("/", auth, authObj.getUser);
router.post("/", authObj.login);
router.put("/password", auth, authObj.changePassword);
router.put("/firstName", auth, authObj.updateFirstName);
router.put("/lastName", auth, authObj.updateLastName);
router.put("/sex", auth, authObj.updateSex);
router.put("/email", auth, authObj.updateEmail);
router.put("/username", auth, authObj.updateUsername);
router.put("/dob", auth, authObj.updateDateOfBirth);
router.put("/city", auth, authObj.updateCity);
router.put("/country", auth, authObj.updateCountry);
router.get("/country", auth, authObj.getCountry);
router.put("/zip", auth, authObj.updateZip);
router.put("/security", auth, authObj.updateSecurity);
router.put("/phone", auth, authObj.updatePhone);
router.put("/question", auth, authObj.updateQuestion);
router.put("/bio", auth, authObj.updateBio);
router.put("/profileImage", auth, authObj.updateProfileImage);
router.post("/changepassword", auth, authObj.mailToChangePassword);

module.exports = router;

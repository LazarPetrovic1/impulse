const router = require("express").Router();
const register = require("../controllers/register");

router.post("/stepone", register.checkFirstStep);
router.post("/steptwo", register.checkSecondStep);

module.exports = router;

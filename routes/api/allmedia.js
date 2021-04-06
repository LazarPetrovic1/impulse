const router = require("express").Router();
const auth = require("../../middleware/auth");
const allmedia = require("../controllers/allmedia");

router.get("/mine", auth, allmedia.getMyMedia);
router.get("/:id", auth, allmedia.getUsersMedia);
router.post("/bulk", auth, allmedia.getMediaInBulk);

module.exports = router;

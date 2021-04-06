const router = require("express").Router();
const auth = require("../../middleware/auth");
const group = require("../controllers/group");

router.get("/", auth, group.getAllGroups);
router.get("/mine", auth, group.meInGroups);
router.get("/:id", auth, group.getGroup);
router.post("/", auth, group.createGroup);
router.post("/:id", auth, group.postInGroup);
router.delete("/:id/:postid", auth, group.deletePost);
router.delete("/:id", auth, group.deleteGroup);

module.exports = router;

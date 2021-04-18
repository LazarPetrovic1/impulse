const router = require("express").Router();
const auth = require("../../middleware/auth");
const group = require("../controllers/group");

router.get("/", auth, group.getAllGroups);
router.get("/mine", auth, group.meInGroups);
router.get("/:id", auth, group.getGroup);
router.post("/", auth, group.createGroup);
router.post("/:id", auth, group.postInGroup);
router.delete("/:id/:postid", auth, group.deletePost);
router.put("/impulse/:id/:post_id", auth, group.impulsePost);
router.put("/like/:id/:post_id", auth, group.likePost);
router.put("/dislike/:id/:post_id", auth, group.dislikePost);
router.delete("/:id", auth, group.deleteGroup);
router.post("/:id/:post_id", auth, group.commentGroupPost);
router.put("/:id/:post_id/:comment_id", auth, group.updateComment);
router.delete("/:id/:post_id/:comment_id", auth, group.deleteComment);
router.post("/:id/:post_id/:comment_id", auth, group.replyToComment);
router.put("/:id/:post_id/:comment_id/:reply_id", auth, group.updateReply);
router.delete("/:id/:post_id/:comment_id/:reply_id", auth, group.deleteReply);

module.exports = router;

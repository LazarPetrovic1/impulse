const router = require("express").Router();
const auth = require("../../middleware/auth");
const group = require("../controllers/group");

router.get("/mine", auth, group.meInGroups);
router.post("/", auth, group.createGroup);
router.get("/", auth, group.getAllGroups);
router.get("/:id", auth, group.getGroup);
router.delete("/:id", auth, group.deleteGroup);
// updatePost
// savePost
router.post("/:id", auth, group.postInGroup);
router.post("/getposts/:id", auth, group.getAllPosts);
router.delete("/:id/:postId", auth, group.deletePost);
router.get("/:id/:postId/impulse", auth, group.seeAllWhoImpulsed);
router.get("/:id/:postId/like", auth, group.seeAllWhoLiked);
router.get("/:id/:postId/dislike", auth, group.seeAllWhoDisliked);
router.put("/impulse/:id/:post_id", auth, group.impulsePost);
router.put("/like/:id/:post_id", auth, group.likePost);
router.put("/dislike/:id/:post_id", auth, group.dislikePost);
router.post("/:id/:postId/", auth, group.commentGroupPost);
router.get("/:id/:postId", auth, group.getPostComments)
router.put("/:id/:post_id/:comment_id", auth, group.updateComment);
router.delete("/:id/:post_id/:comment_id", auth, group.deleteComment);
// dismissPost
router.post("/:id/:post_id/:comment_id", auth, group.replyToComment);
router.put("/:id/:post_id/:comment_id/:reply_id", auth, group.updateReply);
router.delete("/:id/:post_id/:comment_id/:reply_id", auth, group.deleteReply);
router.put("/:id/:postId/:commentId/impulse", auth, group.impulsifyComment)
router.put("/:id/:postId/:commentId/like", auth, group.likeComment)
router.put("/:id/:postId/:commentId/dislike", auth, group.dislikeComment)
router.put("/:id/:postId/:commentId/:replyId/impulse", auth, group.impulsifyReplyToImageComment)
router.put("/:id/:postId/:commentId/like", auth, group.likeReplyToImageComment)
router.put("/:id/:postId/:commentId/:replyId/dislike", auth, group.dislikeReplyToImageComment)

module.exports = router;

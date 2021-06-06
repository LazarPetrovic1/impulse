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
router.get("/getposts/:id", auth, group.getPostsOfGroup);

router.delete("/:id/:postId", auth, group.deletePost);
router.post("/:id/:postId", auth, group.commentGroupPost);
router.get("/:id/:postId/impulse", auth, group.seeAllWhoImpulsed);
router.get("/:id/:postId/like", auth, group.seeAllWhoLiked);
router.get("/:id/:postId/dislike", auth, group.seeAllWhoDisliked);
router.put("/impulse/:id/:postId", auth, group.impulsePost);
router.put("/like/:id/:postId", auth, group.likePost);
router.put("/dislike/:id/:postId", auth, group.dislikePost);
router.get("/:id/:postId", auth, group.getPostComments);
router.get("/:id/:postId/:commentId", auth, group.getCommentReplies);
router.put("/:id/:postId/:commentId", auth, group.updateComment);
router.delete("/:id/:postId/:commentId", auth, group.deleteComment);
// dismissPost
router.post("/:id/:postId/:commentId", auth, group.replyToComment);
router.put("/:id/:postId/:commentId/impulse", auth, group.impulsifyComment);
router.put("/:id/:postId/:commentId/like", auth, group.likeComment);
router.put("/:id/:postId/:commentId/dislike", auth, group.dislikeComment);
router.put(
  "/:id/:postId/:commentId/:replyId/like",
  auth,
  group.likeReplyToImageComment
);
router.put(
  "/:id/:postId/:commentId/:replyId/dislike",
  auth,
  group.dislikeReplyToImageComment
);
router.put(
  "/:id/:postId/:commentId/:replyId/impulse",
  auth,
  group.impulsifyReplyToImageComment
);

router.put("/:id/:postId/:commentId/:replyId", auth, group.updateReply);
router.delete("/:id/:postId/:commentId/:replyId", auth, group.deleteReply);

module.exports = router;

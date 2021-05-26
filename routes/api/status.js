const router = require("express").Router();
const auth = require("../../middleware/auth");
const status = require("../controllers/status");

router.post("/", auth, status.createStatus);
router.get("/", auth, status.getAllStatuses);
router.get("/status/:id", auth, status.getStatusById);
router.delete("/:id", auth, status.deleteStatus);
router.put("/:id", auth, status.editStatus);
router.put("/save/:id", auth, status.saveStatus);
router.post("/comment/:id", auth, status.addCommentToStatus);
router.get("/comment/:id", auth, status.getCommentsOfStatus);
router.put("/comment/:id/:comment_id", auth, status.editCommentOfStatus);
router.delete("/comment/:id/:comment_id", auth, status.deleteCommentOfStatus);
router.put("/:id/dismiss", auth, status.dismissStatus);
router.post("/comment/:id/:comment_id/reply", auth, status.replyToCommentOfStatus);
router.put("/comment/:id/:comment_id/:reply_id", auth, status.editReplyToCommentOfStatus);
router.get("/comment/:id/reply", auth, status.getAllRepliesToCommentOfStatus);
router.delete("/comment/:id/:comment_id/:reply_id", auth, status.deleteReplyToCommentOfStatus);
router.get("/mine", auth, status.getMyStatuses);
router.get("/:id", auth, status.getPersonsStatuses);
router.get("/impulse/:id", auth, status.seeAllWhoImpulsed)
router.get("/like/:id", auth, status.seeAllWhoLiked)
router.get("/dislike/:id", auth, status.seeAllWhoDisliked)
router.put("/impulse/:id", auth, status.impulseStatus);
router.put("/like/:id", auth, status.likeStatus);
router.put("/dislike/:id", auth, status.dislikeStatus);
router.put("/:id/:commentId/impulse", auth, status.impulsifyComment)
router.put("/:id/:commentId/like", auth, status.likeComment)
router.put("/:id/:commentId/dislike", auth, status.dislikeComment)
router.put("/:id/:commentId/:replyId/impulse", auth, status.impulsifyReplyToComment)
router.put("/:id/:commentId/:replyId/like", auth, status.likeReplyToComment)
router.put("/:id/:commentId/:replyId/dislike", auth, status.dislikeReplyToComment)

module.exports = router;

const router = require("express").Router();
const auth = require("../../middleware/auth");
const { check } = require("express-validator");
const image = require("../controllers/imagepost");

router.post("/", auth, image.uploadImage);
router.get("/", auth, image.getAllImages);
router.get("/image/:id", auth, image.getImageById);
router.delete("/:id", auth, image.deleteImage);
router.put("/save/:id", auth, image.saveImage);
router.post(
  "/comment/:id",
  [auth, [check("text", "Text is required.").not().isEmpty()]],
  image.commentOnImage
);
router.get("/comment/:id", auth, image.getPostComments);
router.get("/comment/:id", auth, image.getImageComments);
router.put("/comment/:id/:commentId", auth, image.editImageComments);
router.delete("/comment/:id/:commentId", auth, image.deleteComment);
router.put("/:id/dismiss", auth, image.dismissImage);
router.post("/comment/:id/:commentId/reply", auth, image.replyToImageComment);
router.put(
  "/comment/:id/:commentId/:replyId",
  auth,
  image.editReplyToImageComment
);
router.get("/comment/:id/:commentId/reply", auth, image.getAllRepliesToComment);
router.delete(
  "/comment/:id/:commentId/:replyId",
  auth,
  image.deleteReplyToComment
);

// getallreplies

router.get("/mine", auth, image.getMyImages);
router.get("/:id", auth, image.getUsersImages);
router.get("/:id/impulse", auth, image.seeAllWhoImpulsed);
router.get("/:id/like", auth, image.seeAllWhoLiked);
router.get("/:id/dislike", auth, image.seeAllWhoDisliked);
router.put("/impulse/:id", auth, image.impulseImage);
router.put("/like/:id", auth, image.likeImage);
router.put("/dislike/:id", auth, image.dislikeImage);
router.put("/:id/:commentId/impulse", auth, image.impulsifyImageComment);
router.put("/:id/:commentId/like", auth, image.likeImageComment);
router.put("/:id/:commentId/dislike", auth, image.dislikeImageComment);
router.put(
  "/:id/:commentId/:replyId/impulse",
  auth,
  image.impulsifyReplyToImageComment
);
router.put(
  "/:id/:commentId/:replyId/like",
  auth,
  image.likeReplyToImageComment
);
router.put(
  "/:id/:commentId/:replyId/dislike",
  auth,
  image.dislikeReplyToImageComment
);

module.exports = router;

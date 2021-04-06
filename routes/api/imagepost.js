const router = require("express").Router();
const auth = require("../../middleware/auth");
const { check } = require("express-validator");
const image = require("../controllers/imagepost");

router.post("/", auth, image.uploadImage);
router.get("/", auth, image.getAllImages);
router.get("/mine", auth, image.getMyImages);
router.get("/:id", auth, image.getUsersImages);
router.delete("/:id", auth, image.deleteImage);
router.get("/:id/impulse", auth, image.seeAllWhoImpulsed);
router.get("/:id/like", auth, image.seeAllWhoLiked);
router.get("/:id/dislike", auth, image.seeAllWhoDisliked);
router.put("/impulse/:id", auth, image.impulseImage);
router.put("/like/:id", auth, image.likeImage);
router.put("/dislike/:id", auth, image.dislikeImage);

router.post(
  "/comment/:id",
  [auth, [check("text", "Text is required.").not().isEmpty()]],
  image.commentOnImage
);

router.delete("/comment/:id/:comment_id", auth, image.deleteComment);

module.exports = router;

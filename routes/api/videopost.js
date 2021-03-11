const router = express = require("express").Router();
const auth = require("../../middleware/auth");
const { check } = require("express-validator");
const video = require('../controllers/videopost');

router.post("/", auth, video.uploadVideo);

router.get("/", auth, video.getAllVideos);

router.get("/mine", auth, video.getMyVideos)

router.get("/:id", auth, video.getUsersVideos)

router.get("/video/:id", auth, video.getVideoById);

router.delete("/:id", auth, video.deleteVideo);

router.put("/impulse/:id", auth, video.impulseVideo);

router.put("/like/:id", auth, video.likeVideo);

router.put("/dislike/:id", auth, video.dislikeVideo);

router.post(
  "/comment/:id",
  [
    auth,
    [
      check("text", "Text is required.")
        .not()
        .isEmpty()
    ]
  ],
  video.commentVideo
);

router.get("/comment/:id", auth, video.getVideoComments)

router.put("/comment/:id/:comment_id", auth, video.updateComment)

router.delete("/comment/:id/:comment_id", auth, video.deleteComment);

router.post("/comment/:id/:comment_id/reply", auth, video.replyToComment)

router.put("/comment/:id/:comment_id/:reply_id", auth, video.updateReply)

router.get("/comment/:id/reply", auth, video.getRepliesToComment)

router.delete("/comment/:id/:comment_id/:reply_id", auth, video.deleteReply)

module.exports = router;

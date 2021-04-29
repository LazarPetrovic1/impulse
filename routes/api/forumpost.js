const router = require("express").Router();
const auth = require("../../middleware/auth");
const { check } = require("express-validator");
const User = require("../../models/User");
const ForumPost = require("../../models/ForumPost");
const Profile = require("../../models/Profile");
const forum = require("../controllers/forumpost");

// Make post
router.post(
  "/",
  [
    auth,
    [
      check("title", "Title is required.").not().isEmpty(),
      check("body", "Content (at least textual) is required for a post")
        .not()
        .isEmpty(),
    ],
  ],
  forum.makeForumPost
);

router.get("/", auth, forum.getAllForumPosts);
router.get("/:id", auth, forum.getForumPostById);
router.delete("/:id", auth, forum.deleteForumPost);
router.put("/:id", auth, forum.updateForumPost);
router.put("/save/:id", auth, forum.saveForumPost);
// Add comment
router.post(
  "/comment/:id",
  [auth, [check("content", "Text is required.").not().isEmpty()]],
  forum.addCommentToForumPost
);
router.get("/comment/:id", auth, forum.getCommentsOfForumPost);
router.put("/comment/:id/:comment_id", auth, forum.editCommentOfForumPost);
router.delete("/comment/:id/:comment_id", auth, forum.deleteCommentOfForumPost);
router.put("/:id/dismiss", auth, forum.dismissPost);
router.post(
  "/comment/:id/:comment_id/reply",
  auth,
  forum.replyToCommentOfForumPost
);
router.put(
  "/comment/:id/:comment_id/:reply_id",
  auth,
  forum.editReplyToCommentOfForumPost
);
router.get("/comment/:id/reply", auth, forum.getAllRepliesToCommentOfForumPost);
router.delete(
  "/comment/:id/:comment_id/:reply_id",
  auth,
  forum.deleteReplyToCommentOfForumPost
);

// THESE ARE NEW
// THESE ARE NEW
// THESE ARE NEW

router.get("/mine", auth, forum.getMyForumPosts)
router.get("/user/:id", auth, forum.getUsersForumPosts)
router.get("/impulse/:id", auth, forum.seeAllWhoImpulsed)
router.get("/like/:id", auth, forum.seeAllWhoLiked)
router.get("/dislike/:id", auth, forum.seeAllWhoDisliked)
router.put("/:id/impulse", auth, forum.impulsifyForumPost)
router.put("/:id/like", auth, forum.likeForumPost)
router.put("/:id/dislike", auth, forum.dislikeForumPost)
router.post("/search/me", auth, forum.meInForumPosts)
router.put("/:id/:commentId/impulse", auth, forum.impulsifyCommentOfForumPost)
router.put("/:id/:commentId/like", auth, forum.likeCommentOfForumPost)
router.put("/:id/:commentId/dislike", auth, forum.dislikeCommentOfForumPost)
router.put("/:id/:commentId/:replyId/impulse", auth, forum.impulsifyReplyToCommentOfForumPost)
router.put("/:id/:commentId/like", auth, forum.likeReplyToCommentOfForumPost)
router.put("/:id/:commentId/:replyId/dislike", auth, forum.dislikeReplyToCommentOfForumPost)

module.exports = router;

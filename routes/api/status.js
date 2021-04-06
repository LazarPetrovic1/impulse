const router = require("express").Router();
const auth = require("../../middleware/auth");
const status = require("../controllers/status");

router.post("/", auth, status.createStatus);
router.get("/", auth, status.getAllStatuses);
router.get("/mine", auth, status.getMyStatuses);
router.get("/:id", auth, status.getPersonsStatuses);
router.delete("/:id", auth, status.deleteStatus);
router.put("/:id", auth, status.editStatus);
router.post("/comment/:id", auth, status.addCommentToStatus);
router.get("/comment/:id", auth, status.getCommentsOfStatus);
router.put("/comment/:id/:comment_id", auth, status.editCommentOfStatus);
router.delete("/comment/:id/:comment_id", auth, status.deleteCommentOfStatus);
router.post(
  "/comment/:id/:comment_id/reply",
  auth,
  status.replyToCommentOfStatus
);
router.put(
  "/comment/:id/:comment_id/:reply_id",
  auth,
  status.editReplyToCommentOfStatus
);
router.get("/comment/:id/reply", auth, status.getAllRepliesToCommentOfStatus);
router.delete(
  "/comment/:id/:comment_id/:reply_id",
  auth,
  status.deleteReplyToCommentOfStatus
);

module.exports = router;

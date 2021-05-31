const router = require("express").Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");
const ForumPost = require("../../models/ForumPost");

// Make post
router.post(
  "/public/:id",
  [
    auth,
    [
      check("title", "Title is required.").not().isEmpty(),
      check("body", "Content (at least textual) is required for a post")
        .not()
        .isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    try {
      const user = await User.findById(req.params.id).select("username");
      const newPost = {
        user: req.params.id,
        author: user.username,
        body: req.body.body,
        title: req.body.title,
        comments: [],
      };
      await res.json(newPost);
    } catch (e) {
      console.error(e.message);
      res.status(500).send("Internal server error.");
    }
  }
);
router.get("/public/user/:id", async (req, res) => {
  try {
    const forumposts = await Forum.findMany({ user: req.params.id });
    return res.json(forumposts);
  } catch (e) {
    console.log(e.message);
  }
});
router.get("/public", async (req, res) => {
  try {
    const posts = await ForumPost.find().sort({ date: -1 });
    res.json(posts);
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ msg: "Internal server error." });
  }
});
router.get("/public/:id", async (req, res) => {
  try {
    const post = await ForumPost.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: "Post not found." });
    res.json(post);
  } catch (e) {
    if (e.kind === "ObjectId")
      return res.status(404).json({ msg: "Post not found" });
    res.status(500).send("Internal server error.");
  }
});
router.delete("/public/:id", async (req, res) => {
  try {
    const posts = await ForumPost.find({});
    const newPosts = await Array.from(posts).filter(
      (p) => p.id.toString() !== req.params.id.toString()
    );
    res.json(newPosts);
  } catch (e) {
    console.error(e.message);
    if (e.kind === "ObjectId")
      return res.status(404).json({ msg: "Post not found" });
    res.status(500).send("Internal server error.");
  }
});
router.put("/public/:id", async (req, res) => {
  try {
    const post = await ForumPost.findById(req.params.id);
    const { body } = req.body;
    const newPost = {
      ...post,
      body,
    };
    return res.json(newPost);
  } catch (e) {
    console.error(e.message);
    if (e.kind === "ObjectId")
      return res.status(404).json({ msg: "Post not found" });
    res.status(500).send("Internal server error.");
  }
});
// Add comment
router.post(
  "/public/comment/:id/:uid",
  [auth, [check("content", "Text is required.").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.params.uid).select("username");
      const post = await ForumPost.findById(req.params.id);
      const newComment = {
        user: user.id,
        content: req.body.content,
        by: user.username,
        replies: [],
      };
      post.comments.unshift(newComment);
      res.json(post.comments);
    } catch (e) {
      console.error(e.message);
      res.status(500).send("Internal server error.");
    }
  }
);
router.get("/public/comment/:id", async (req, res) => {
  try {
    const post = await ForumPost.findById(req.params.id);
    return res.json(post.comments);
  } catch (e) {
    res.status(500).send("Internal server error.");
  }
});
router.put("/public/comment/:id/:comment_id/:uid", async (req, res) => {
  try {
    const post = await ForumPost.findById(req.params.id);
    const comment = post.comments.find(
      (comm) => comm.id === req.params.comment_id
    );
    if (!comment) return res.status(404).json({ msg: "Comment not found." });
    const { content } = req.body;
    if (comment.user.toString() !== req.params.uid)
      return res.status(401).json({ msg: "User not authorised." });
    const newComment = {
      ...comment,
      content,
    };
    post.comments = post.comments.map((comm) =>
      comm.id === req.params.comment_id ? newComment : comm
    );
    return res.json(post.comments);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Internal server error.");
  }
}); // .toObject()
router.delete("/public/comment/:id/:comment_id/:uid", async (req, res) => {
  try {
    const post = await ForumPost.findById(req.params.id);
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );
    if (!comment) return res.status(404).json({ msg: "Comment not found." });
    if (comment.user.toString() !== req.params.uid)
      return res.status(401).json({ msg: "User not authorised." });
    const removeIndex = post.comments
      .map((comment) => comment.user.toString())
      .indexOf(req.params.uid);
    post.comments.splice(removeIndex, 1);
    return res.json(post.comments);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Internal server error.");
  }
});
router.post("/public/comment/:id/:comment_id/:uid/reply", async (req, res) => {
  try {
    const user = await User.findById(req.params.uid).select("username");
    const post = await ForumPost.findById(req.params.id);
    const comment = await post.comments.find(
      (comm) => comm.id === req.params.comment_id
    );
    const newReply = {
      user: req.params.uid,
      content: req.body.content,
      by: user.username,
    };
    const newComment = {
      ...comment,
      replies: [...comment.replies, newReply],
    };
    post.comments = post.comments.map((comm) =>
      comm.id === req.params.comment_id ? newComment : comm
    );
    res.json(post.comments);
  } catch (e) {
    res.status(500).send("Internal server error.");
  }
});
router.put(
  "/public/comment/:id/:comment_id/:reply_id/:uid",
  async (req, res) => {
    try {
      const user = await User.findById(req.params.uid).select("username");
      const post = await ForumPost.findById(req.params.id);
      const comment = await post.comments.find(
        (comm) => comm.id === req.params.comment_id
      );
      const reply = await comment.replies.find(
        (rep) => rep.id === req.params.reply_id
      );
      const newReply = {
        ...reply,
        content: req.body.content,
      };
      comment.replies = comment.replies.map((rep) =>
        rep.id === req.params.reply_id ? newReply : rep
      );
      res.json(newReply);
    } catch (e) {
      res.status(500).send("Internal server error.");
    }
  }
); // .toObject()
router.get("/public/comment/:id/:comment_id/reply", async (req, res) => {
  try {
    const post = await ForumPost.findById(req.params.id);
    const comment = await post.comments.find(
      (comm) => comm.id.toString() === req.params.comment_id
    );
    return res.json(comment.replies);
  } catch (e) {
    res.status(500).send("Internal server error.");
  }
});
router.delete(
  "/public/comment/:id/:comment_id/:reply_id/:uid",
  async (req, res) => {
    try {
      const post = await ForumPost.findById(req.params.id);
      const comment = post.comments.find(
        (comm) => comm.id === req.params.comment_id
      );
      if (!comment) return res.status(404).json({ msg: "Comment not found." });
      if (comment.user.toString() !== req.params.uid)
        return res.status(401).json({ msg: "User not authorised." });
      const reply = comment.replies.find(
        (rep) => rep.id === req.params.reply_id
      );
      if (!reply) return res.status(404).json({ msg: "Reply not found." });
      if (reply.user.toString() !== req.params.uid)
        return res.status(401).json({ msg: "User not authorised." });
      comment.replies = comment.replies.filter(
        (rep) => rep.id !== req.params.reply_id
      );
      return res.json(post.comments);
    } catch (e) {
      console.error(e.message);
      res.status(500).send("Internal server error.");
    }
  }
);

module.exports = router;

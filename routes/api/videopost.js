const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");
const VideoPost = require("../../models/VideoPost");
const Profile = require("../../models/Profile");

// @route -- POST -- api/posts
// @desc -- -- Create a post
// @access -- -- Private
router.post(
  "/",
  [
    auth,
    [
      check("name", "The name of the video is required.")
        .not()
        .isEmpty(),
      check("content", "The video is required.")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");

      const newPost = new VideoPost({
        user: req.user.id,
        name: req.body.name,
        content: req.body.content
      });

      const post = await newPost.save();

      res.json(post);
    } catch (e) {
      console.error(e.message);
      res.status(500).send("Internal server error.");
    }
  }
);

// @route -- GET -- api/posts
// @desc -- -- Get all posts
// @access -- -- Private
router.get("/", auth, async (req, res) => {
  try {
    const posts = await VideoPost.find().sort({ date: -1 });
    res.json(posts);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Internal server error.");
  }
});

// @route -- GET -- api/posts/:id
// @desc -- -- Get a post by id
// @access -- -- Private
router.get("/:id", auth, async (req, res) => {
  try {
    const post = await VideoPost.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    res.json(post);
  } catch (e) {
    console.error(e.message);

    if (e.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }

    res.status(500).send("Internal server error.");
  }
});

// @route -- DELETE -- api/posts/:id
// @desc -- -- Delete a post
// @access -- -- Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await VideoPost.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    // Check user
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorised." });
    }

    await post.remove();

    res.json({ msg: "Post removed." });
  } catch (e) {
    console.error(e.message);

    if (e.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }

    res.status(500).send("Internal server error.");
  }
});

// @route -- PUT -- api/posts/like/:id
// @desc -- -- Like a post
// @access -- -- Private
router.put("/like/:id", auth, async (req, res) => {
  try {
    const post = await VideoPost.findById(req.params.id);

    // Check if the post has already been liked by this user
    if (
      post.endorsements.filter(end => end.user.toString() === req.user.id)
        .length > 0
    ) {
      const removeIndex = post.endorsements
        .map(end => end.user.toString())
        .indexOf(req.user.id);
      post.endorsements.splice(removeIndex, 1);
    }

    if (
      post.endorsements.filter(end => end.user.toString() === req.user.id)
        .length === 0 &&
      post.judgements.filter(jud => jud.user.toString() === req.user.id)
        .length > 0
    ) {
      const removeIndex = post.judgements
        .map(jud => jud.user.toString())
        .indexOf(req.user.id);
      post.judgements.splice(removeIndex, 1);
    }

    post.endorsements.unshift({ user: req.user.id });

    await post.save();

    return res.json(post.endorsements);
  } catch (e) {
    console.error(e.message);

    if (e.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }

    res.status(500).send("Internal server error.");
  }
});

// @route -- PUT -- api/posts/dislike/:id
// @desc -- -- Un-like a post
// @access -- -- Private
router.put("/dislike/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if the post has already been liked by this user
    if (
      post.judgements.filter(jud => jud.user.toString() === req.user.id)
        .length === 0
    ) {
      const removeIndex = post.judgements
        .map(jud => jud.user.toString())
        .indexOf(req.user.id);
      post.judgements.splice(removeIndex, 1);
    }

    if (
      post.judgements.filter(jud => jud.user.toString() === req.user.id)
        .length === 0 &&
      post.endorsements.filter(end => end.user.toString() === req.user.id)
        .length > 0
    ) {
      const removeIndex = post.endorsements
        .map(end => end.user.toString())
        .indexOf(req.user.id);
      post.endorsements.splice(removeIndex, 1);
    }

    await post.save();

    return res.json(post.endorsements);
  } catch (e) {
    console.error(e.message);

    if (e.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }

    res.status(500).send("Internal server error.");
  }
});

// @route -- POST -- api/posts/comment/:id
// @desc -- -- Comment on a post
// @access -- -- Private
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
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id).select("-password");
      const post = await VideoPost.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      };

      post.comments.unshift(newComment);

      await post.save();

      res.json(post.comments);
    } catch (e) {
      console.error(e.message);
      res.status(500).send("Internal server error.");
    }
  }
);

// @route -- DELETE -- api/posts/comment/:id/:comment_id
// @desc -- -- Delete a comment
// @access -- -- Private
router.delete("/comment/:id/:comment_id", auth, async (req, res) => {
  try {
    const post = await VideoPost.findById(req.params.id);

    // Pull out comment
    const comment = post.comments.find(
      comment => comment.id === req.params.comment_id
    );

    // Make sure that the comment exists
    if (!comment) {
      return res.status(404).json({ msg: "Comment not found." });
    }

    // Check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorised." });
    }

    // Get remove index
    const removeIndex = post.comments
      .map(comment => comment.user.toString())
      .indexOf(req.user.id);
    post.comments.splice(removeIndex, 1);

    await post.save();

    return res.json(post.comments);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Internal server error.");
  }
});

module.exports = router;

const router = (express = require("express").Router());
const VideoPost = require("../../models/VideoPost");

router.get("/public", async (req, res) => {
  try {
    const posts = await VideoPost.find().sort({ date: -1 });
    res.json(posts);
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ msg: "The public API is experiencing some issues. Please be patient" });
  }
});
router.get("/public/:id", async (req, res) => {
  try {
    const post = await VideoPost.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: "Post not found" });
    res.json(post);
  } catch (e) {
    console.error(e.message);
    if (e.kind === "ObjectId")
    return res.status(404).json({ msg: "Post not found" });
    res.status(500).json({ msg: "The public API is experiencing some issues. Please be patient" });
  }
});

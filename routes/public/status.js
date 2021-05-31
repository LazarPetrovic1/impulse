const router = require("express").Router();
const status = require("../controllers/status");
const User = require("../../models/User");
const Status = require("../../models/Status");

// res.status(500).json({ msg: "The public API is experiencing some issues. Please be patient" });

router.post("/public/:id", async (req, res) => {
  try {
    const newPost = {
      user: req.params.id,
      body: req.body.body,
      date: new Date(),
      comments: [],
      endorsements: [],
      judgements: [],
      impulsions: [],
      savedBy: [],
    };
    return res.json(newPost);
  } catch (e) {
    console.error(e.message);
    res
      .status(500)
      .json({
        msg: "The public API is experiencing some issues. Please be patient",
      });
  }
});
router.get("/public", async (req, res) => {
  try {
    const statuses = await Status.find();
    res.json(statuses);
  } catch (e) {
    console.error(e.message);
    res
      .status(500)
      .json({
        msg: "The public API is experiencing some issues. Please be patient",
      });
  }
});
router.get("/public/status/:id", async (req, res) => {
  try {
    const status = await Status.findById(req.params.id);
    res.json(status);
  } catch (e) {
    console.error(e.message);
    res
      .status(500)
      .json({
        msg: "The public API is experiencing some issues. Please be patient",
      });
  }
});
router.delete("/public/:id", async (req, res) => {
  try {
    const statuses = await Status.find({});
    const newStatuses = await Array.from(statuses).filter(
      (s) => s.id.toString() !== req.params.id.toString()
    );
    res.json({ msg: "Post deleted successfully" });
  } catch (e) {
    console.error(e.message);
    res
      .status(500)
      .json({
        msg: "The public API is experiencing some issues. Please be patient",
      });
  }
});
router.get("/public/:id", async (req, res) => {
  try {
    const statuses = await Status.find({ user: req.params.id });
    res.json(statuses);
  } catch (e) {
    console.error(e.message);
    res
      .status(500)
      .json({
        msg: "The public API is experiencing some issues. Please be patient",
      });
  }
});
router.put("/public/impulse/:id", async (req, res) => {
  try {
    const post = await Status.findById(req.params.id);
    if (
      post.impulsions.filter((imp) => imp.user.toString() === req.body.likerId)
        .length > 0
    ) {
      post.impulsions.splice(
        post.impulsions
          .map((imp) => imp.user.toString())
          .indexOf(req.body.likerId),
        1
      );
      return res.json({
        impulsions: post.impulsions,
        endorsements: post.endorsements,
        judgements: post.judgements,
      });
    }
    post.impulsions.unshift({ user: req.body.likerId });
    if (
      post.judgements.filter((jud) => jud.user.toString() === req.body.likerId)
        .length > 0
    ) {
      post.judgements.splice(
        post.judgements
          .map((jud) => jud.user.toString())
          .indexOf(req.body.likerId),
        1
      );
    }
    if (
      post.endorsements.filter(
        (end) => end.user.toString() === req.body.likerId
      ).length > 0
    ) {
      // Get remove index
      post.endorsements.splice(
        post.endorsements
          .map((end) => end.user.toString())
          .indexOf(req.body.likerId),
        1
      );
    }
    return res.json({
      impulsions: post.impulsions,
      endorsements: post.endorsements,
      judgements: post.judgements,
    });
  } catch (e) {
    console.error(e.message);
    if (e.kind === "ObjectId")
      return res.status(404).json({ msg: "Post not found" });
    res
      .status(500)
      .json({
        msg: "The public API is experiencing some issues. Please be patient",
      });
  }
});
router.put("/public/like/:id", async (req, res) => {
  try {
    const post = await Status.findById(req.params.id);
    if (
      post.endorsements.filter(
        (end) => end.user.toString() === req.body.likerId
      ).length > 0
    ) {
      post.endorsements.splice(
        post.endorsements
          .map((end) => end.user.toString())
          .indexOf(req.body.likerId),
        1
      );
      return res.json({
        impulsions: post.impulsions,
        endorsements: post.endorsements,
        judgements: post.judgements,
      });
    }
    post.endorsements.unshift({ user: req.body.likerId });
    if (
      post.judgements.filter((jud) => jud.user.toString() === req.body.likerId)
        .length > 0
    ) {
      post.judgements.splice(
        post.judgements
          .map((jud) => jud.user.toString())
          .indexOf(req.body.likerId),
        1
      );
    }
    if (
      post.impulsions.filter((imp) => imp.user.toString() === req.body.likerId)
        .length > 0
    ) {
      // Get remove index
      post.impulsions.splice(
        post.impulsions
          .map((imp) => imp.user.toString())
          .indexOf(req.body.likerId),
        1
      );
    }
    return res.json({
      impulsions: post.impulsions,
      endorsements: post.endorsements,
      judgements: post.judgements,
    });
  } catch (e) {
    console.error(e.message);
    if (e.kind === "ObjectId")
      return res.status(404).json({ msg: "Post not found" });
    res
      .status(500)
      .json({
        msg: "The public API is experiencing some issues. Please be patient",
      });
  }
});
router.put("/public/dislike/:id", async (req, res) => {
  try {
    const post = await Status.findById(req.params.id);
    if (
      post.judgements.filter((jud) => jud.user.toString() === req.body.likerId)
        .length > 0
    ) {
      post.judgements.splice(
        post.judgements
          .map((jud) => jud.user.toString())
          .indexOf(req.body.likerId),
        1
      );
      return res.json({
        impulsions: post.impulsions,
        endorsements: post.endorsements,
        judgements: post.judgements,
      });
    }
    post.judgements.unshift({ user: req.body.likerId });
    if (
      post.endorsements.filter(
        (end) => end.user.toString() === req.body.likerId
      ).length > 0
    ) {
      // Get remove index
      post.endorsements.splice(
        post.endorsements
          .map((end) => end.user.toString())
          .indexOf(req.body.likerId),
        1
      );
    }
    if (
      post.impulsions.filter((imp) => imp.user.toString() === req.body.likerId)
        .length > 0
    ) {
      // Get remove index
      post.impulsions.splice(
        post.impulsions
          .map((imp) => imp.user.toString())
          .indexOf(req.body.likerId),
        1
      );
    }
    return res.json({
      impulsions: post.impulsions,
      endorsements: post.endorsements,
      judgements: post.judgements,
    });
  } catch (e) {
    console.error(e.message);
    if (e.kind === "ObjectId")
      return res.status(404).json({ msg: "Post not found" });
    res
      .status(500)
      .json({
        msg: "The public API is experiencing some issues. Please be patient",
      });
  }
});

module.exports = router;

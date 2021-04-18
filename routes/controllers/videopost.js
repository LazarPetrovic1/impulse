const { validationResult } = require("express-validator");
const User = require("../../models/User");
const VideoPost = require("../../models/VideoPost");
const cloudinary = require("../../utils/cloudinary");

async function uploadVideo(req, res) {
  try {
    const fileStr = await req.body.data;
    const user = await User.findById(req.user.id).select("username");
    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      resource_type: "video",
    });
    const newPost = new VideoPost({
      user: req.user.id,
      name: req.body.name,
      description: req.body.description,
      by: user.username,
      url: uploadResponse.url, // || secure_url
      comments: [],
      endorsements: [],
      judgements: [],
      impulsions: [],
      isVideo: true,
      meta: req.body.meta,
      category: req.body.category,
    });
    const post = await newPost.save();
    res.json(post);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Internal server error.");
  }
}

async function getAllVideos(req, res) {
  try {
    const posts = await VideoPost.find().sort({ date: -1 });
    res.json(posts);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Internal server error.");
  }
}

async function getMyVideos(req, res) {
  try {
    const posts = await VideoPost.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(posts);
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ msg: "Internal server error." });
  }
}

async function getUsersVideos(req, res) {
  try {
    const posts = await VideoPost.find({ user: req.params.id }).sort({
      date: -1,
    });
    res.json(posts);
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ msg: "Internal server error." });
  }
}

async function getVideoById(req, res) {
  try {
    const post = await VideoPost.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: "Post not found" });
    res.json(post);
  } catch (e) {
    console.error(e.message);
    if (e.kind === "ObjectId")
      return res.status(404).json({ msg: "Post not found" });
    res.status(500).send("Internal server error.");
  }
}

async function deleteVideo(req, res) {
  try {
    const post = await VideoPost.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: "Post not found" });
    if (post.user.toString() !== req.user.id)
      return res.status(401).json({ msg: "User not authorised." });
    await post.remove();
    res.json({ msg: "Post removed." });
  } catch (e) {
    console.error(e.message);
    if (e.kind === "ObjectId")
      return res.status(404).json({ msg: "Post not found" });
    res.status(500).send("Internal server error.");
  }
}

async function impulseVideo(req, res) {
  try {
    const post = await VideoPost.findById(req.params.id);
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
      await post.save();
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
    await post.save();
    return res.json({
      impulsions: post.impulsions,
      endorsements: post.endorsements,
      judgements: post.judgements,
    });
  } catch (e) {
    console.error(e.message);
    if (e.kind === "ObjectId")
      return res.status(404).json({ msg: "Post not found" });
    res.status(500).send("Internal server error.");
  }
}

async function likeVideo(req, res) {
  try {
    const post = await VideoPost.findById(req.params.id);
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
      await post.save();
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
    await post.save();
    return res.json({
      impulsions: post.impulsions,
      endorsements: post.endorsements,
      judgements: post.judgements,
    });
  } catch (e) {
    console.error(e.message);
    if (e.kind === "ObjectId")
      return res.status(404).json({ msg: "Post not found" });
    res.status(500).send("Internal server error.");
  }
}

async function dislikeVideo(req, res) {
  try {
    const post = await VideoPost.findById(req.params.id);
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
      await post.save();
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
    await post.save();
    return res.json({
      impulsions: post.impulsions,
      endorsements: post.endorsements,
      judgements: post.judgements,
    });
  } catch (e) {
    console.error(e.message);
    if (e.kind === "ObjectId")
      return res.status(404).json({ msg: "Post not found" });
    res.status(500).send("Internal server error.");
  }
}

async function commentVideo(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });
  try {
    const user = await User.findById(req.user.id).select("-password");
    const post = await VideoPost.findById(req.params.id);
    const newComment = {
      text: req.body.text,
      name: user.username,
      user: req.user.id,
    };
    post.comments.unshift(newComment);
    await post.save();
    res.json(post.comments);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Internal server error.");
  }
}

async function getVideoComments(req, res) {
  try {
    const post = await VideoPost.findById(req.params.id);
    return res.json(post.comments);
  } catch (e) {
    res.status(500).send("Internal server error.");
  }
}

async function updateComment(req, res) {
  try {
    const post = await VideoPost.findById(req.params.id);
    const comment = post.comments.find(
      (comm) => comm.id === req.params.comment_id
    );
    if (!comment) return res.status(404).json({ msg: "Comment not found." });
    const { content } = req.body;
    if (comment.user.toString() !== req.user.id)
      return res.status(401).json({ msg: "User not authorised." });
    const newComment = {
      user: comment.user,
      text: content,
      name: comment.name,
      replies: comment.replies,
    };
    const index = post.comments
      .map((comm) => comm.id)
      .indexOf(req.params.comment_id);
    post.comments = post.comments.map((comm) =>
      comm.id === req.params.comment_id ? newComment : comm
    );
    await post.save();
    return res.json(post.comments[index]);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Internal server error.");
  }
}

async function deleteComment(req, res) {
  try {
    const post = await VideoPost.findById(req.params.id);
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );
    if (!comment) return res.status(404).json({ msg: "Comment not found." });
    if (comment.user.toString() !== req.user.id)
      return res.status(401).json({ msg: "User not authorised." });
    const removeIndex = post.comments
      .map((comment) => comment.user.toString())
      .indexOf(req.user.id);
    post.comments.splice(removeIndex, 1);
    await post.save();
    return res.json(post.comments);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Internal server error.");
  }
}

async function replyToComment(req, res) {
  try {
    const user = await User.findById(req.user.id).select("username");
    const post = await VideoPost.findById(req.params.id);
    const comment = await post.comments.find(
      (comm) => comm.id === req.params.comment_id
    );
    const newReply = {
      user: req.user.id,
      content: req.body.content,
      by: user.username,
    };
    const newComment = {
      user: comment.user,
      text: comment.text,
      name: comment.name,
      replies: [...comment.replies, newReply],
    };
    const index = post.comments
      .map((comm) => comm.id)
      .indexOf(req.params.comment_id);
    post.comments = post.comments.map((comm) =>
      comm.id === req.params.comment_id ? newComment : comm
    );
    await post.save();
    res.json(post.comments[index]);
  } catch (e) {
    res.status(500).send("Internal server error.");
  }
}

async function updateReply(req, res) {
  try {
    const user = await User.findById(req.user.id).select("username");
    const post = await VideoPost.findById(req.params.id);
    const comment = await post.comments.find(
      (comm) => comm.id === req.params.comment_id
    );
    const reply = await comment.replies.find(
      (rep) => rep.id === req.params.reply_id
    );
    const newReply = {
      user: req.user.id,
      content: req.body.content,
      by: user.username,
    };
    comment.replies = comment.replies.map((rep) =>
      rep.id === req.params.reply_id ? newReply : rep
    );
    await post.save();
    res.json(comment);
  } catch (e) {
    res.status(500).send("Internal server error.");
  }
}

async function getRepliesToComment(req, res) {
  try {
    const post = await VideoPost.findById(req.params.id);
    return res.json(post.comments.replies);
  } catch (e) {
    res.status(500).send("Internal server error.");
  }
}

async function deleteReply(req, res) {
  try {
    const post = await VideoPost.findById(req.params.id);
    const comment = post.comments.find(
      (comm) => comm.id === req.params.comment_id
    );
    if (!comment) return res.status(404).json({ msg: "Comment not found." });
    const reply = comment.replies.find((rep) => rep.id === req.params.reply_id);
    if (!reply) return res.status(404).json({ msg: "Reply not found." });
    if (reply.user.toString() !== req.user.id)
      return res.status(401).json({ msg: "User not authorised." });
    const removeIndex = comment.replies
      .map((rep) => rep.user.toString())
      .indexOf(req.user.id);
    comment.replies = comment.replies.filter(
      (rep) => rep.id !== req.params.reply_id
    );
    await post.save();
    return res.json(post.comments);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Internal server error.");
  }
}

const video = {
  uploadVideo,
  getAllVideos,
  getMyVideos,
  getVideoById,
  deleteVideo,
  impulseVideo,
  likeVideo,
  dislikeVideo,
  commentVideo,
  getVideoComments,
  updateComment,
  deleteComment,
  replyToComment,
  updateReply,
  getRepliesToComment,
  deleteReply,
  getUsersVideos,
};

module.exports = video;

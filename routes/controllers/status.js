const auth = require("../../middleware/auth");
const User = require("../../models/User");
const Status = require("../../models/Status");
const cloudinary = require("../../utils/cloudinary");

async function createStatus(req, res) {
  try {
    const newPost = new Status({
      user: req.user.id,
      body: req.body.body,
      date: new Date(),
      comments: [],
      endorsements: [],
      judgements: [],
      impulsions: [],
      isVideo: false,
      type: "textual",
    });
    const post = await newPost.save();
    await res.json(post);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Internal server error.");
  }
}

async function getAllStatuses(req, res) {
  try {
    const statuses = await Status.find();
    res.json(statuses);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Internal server error.");
  }
}

async function getMyStatuses(req, res) {
  try {
    const statuses = await Status.find({ user: req.user.id });
    res.json(statuses);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Internal server error.");
  }
}

async function getPersonsStatuses(req, res) {
  try {
    const statuses = await Status.find({ user: req.params.id });
    res.json(statuses);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Internal server error.");
  }
}

async function deleteStatus(req, res) {
  try {
    const status = await Status.findById(req.params.id);
    await status.remove();
    res.json({ msg: "Post deleted successfully" });
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Internal server error.");
  }
}

async function editStatus(req, res) {
  try {
    const post = await Status.findByIdAndUpdate(
      req.params.id,
      {
        body: req.body.body,
        date: new Date(),
      },
      { new: true }
    );
    await res.json(post);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Internal server error.");
  }
}

async function impulseStatus(req, res) {
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

async function likeStatus(req, res) {
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

async function dislikeStatus(req, res) {
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

async function addCommentToStatus(req, res) {
  try {
    const user = await User.findById(req.user.id).select("username");
    const post = await Status.findById(req.params.id);
    const newComment = {
      user: user.id,
      content: req.body.content,
      by: user.username,
      replies: [],
    };
    post.comments.unshift(newComment);
    await post.save();
    res.json(newComment);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Internal server error.");
  }
}

async function getCommentsOfStatus(req, res) {
  try {
    const post = await Status.findById(req.params.id);
    return res.json(post.comments);
  } catch (e) {
    res.status(500).send("Internal server error.");
  }
}

async function editCommentOfStatus(req, res) {
  try {
    const post = await Status.findById(req.params.id);
    const comment = post.comments.find(
      (comm) => comm.id === req.params.comment_id
    );
    if (!comment) {
      return res.status(404).json({ msg: "Comment not found." });
    }
    const { content } = req.body;
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorised." });
    }
    const newComment = {
      user: comment.user,
      content,
      by: comment.by,
      replies: comment.replies,
    };
    const index = post.comments
      .map((comm) => comm.id)
      .indexOf(req.params.comment_id);
    post.comments = post.comments.map((comm) =>
      comm.id === req.params.comment_id ? newComment : post
    );
    await post.save();
    return res.json(post.comments[index]);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Internal server error.");
  }
}

async function deleteCommentOfStatus(req, res) {
  try {
    const post = await Status.findById(req.params.id);
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );
    if (!comment) {
      return res.status(404).json({ msg: "Comment not found." });
    }
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorised." });
    }
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

async function replyToCommentOfStatus(req, res) {
  try {
    const user = await User.findById(req.user.id).select("username");
    const post = await Status.findById(req.params.id);
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
      content: comment.content,
      by: comment.by,
      replies: [...comment.replies, newReply],
    };
    const index = post.comments
      .map((comm) => comm.id)
      .indexOf(req.params.comment_id);
    post.comments = post.comments.map((comm) =>
      comm.id === req.params.comment_id ? newComment : post
    );
    await post.save();
    res.json(post.comments[index]);
  } catch (e) {
    res.status(500).send("Internal server error.");
  }
}

async function editReplyToCommentOfStatus(req, res) {
  try {
    const user = await User.findById(req.user.id).select("username");
    const post = await Status.findById(req.params.id);
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

async function getAllRepliesToCommentOfStatus(req, res) {
  try {
    const post = await Status.findById(req.params.id);
    return res.json(post.comments.replies);
  } catch (e) {
    res.status(500).send("Internal server error.");
  }
}

async function deleteReplyToCommentOfStatus(req, res) {
  try {
    const post = await Status.findById(req.params.id);
    const comment = post.comments.find(
      (comm) => comm.id === req.params.comment_id
    );
    if (!comment) return res.status(404).json({ msg: "Comment not found." });
    if (comment.user.toString() !== req.user.id)
      return res.status(401).json({ msg: "User not authorised." });
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

const status = {
  createStatus,
  getAllStatuses,
  getMyStatuses,
  getPersonsStatuses,
  deleteStatus,
  editStatus,
  impulseStatus,
  likeStatus,
  dislikeStatus,
  addCommentToStatus,
  getCommentsOfStatus,
  editCommentOfStatus,
  deleteCommentOfStatus,
  replyToCommentOfStatus,
  editReplyToCommentOfStatus,
  getAllRepliesToCommentOfStatus,
  deleteReplyToCommentOfStatus,
};

module.exports = status;

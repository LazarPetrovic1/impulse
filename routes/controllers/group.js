const Group = require("../../models/Group");
const cloudinary = require("../../utils/cloudinary");

async function getAllGroups(req, res) {
  try {
    const groups = await Group.find();
    res.json(groups);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Internal server error.");
  }
}

async function getGroup(req, res) {
  try {
    const group = await Group.findById(req.params.id);
    res.json(group);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Internal server error.");
  }
}

async function meInGroups(req, res) {
  try {
    const groups = await Group.find({ people: req.user.id });
    res.json(groups);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Internal server error.");
  }
}

async function createGroup(req, res) {
  try {
    const fileStr = await req.body.data;
    const uploadResponse = await cloudinary.uploader.upload(fileStr);
    const newGroup = new Group({
      people: req.body.people,
      pendingPeople: [],
      requiresAdmin: req.body.requiresAdmin,
      isSeen: req.body.isSeen,
      name: req.body.name,
      admin: req.user.id,
      groupImage: uploadResponse.url,
      about: req.body.about,
      posts: [],
      date: new Date(),
    });
    const group = await newGroup.save();
    res.json(group);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Internal server error.");
  }
}

async function postInGroup(req, res) {
  try {
    const group = await Group.findById(req.params.id);
    let meds = [];
    if (req.body.post.isMedia) {
      for (const item of req.body.post.media) {
        const fileStr = item.res;
        const uploadResponse = await cloudinary.uploader.upload(fileStr, {
          resource_type: req.body.post.media.type,
        });
        await meds.push({
          name: item.name,
          src: uploadResponse.url,
          type: item.type,
        });
      }
    }
    const post = {
      user: req.user.id,
      body: req.body.post.body,
      isMedia: req.body.post.isMedia,
      media: req.body.post.isMedia ? meds : {},
      comments: [],
      endorsements: [],
      judgements: [],
      impulsions: [],
      date: new Date(),
    };
    await group.posts.unshift(post);
    await group.save();
    res.json(post);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Internal server error.");
  }
}

async function deletePost(req, res) {
  try {
    const group = await Group.findById(req.params.id);
    group.posts = group.posts.filter(
      (p) => p.id.toString() !== req.params.postid.toString()
    );
    await group.save();
    res.json(group.posts);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Internal server error.");
  }
}

async function impulsePost(req, res) {
  try {
    const group = await Group.findById(req.params.id);
    const post = await group.posts.find(
      (post) => post.id === req.params.post_id
    );
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
      await group.save();
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
    await group.save();
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

async function likePost(req, res) {
  try {
    const group = await Group.findById(req.params.id);
    const post = await group.posts.find(
      (post) => post.id === req.params.post_id
    );
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
      await group.save();
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
    await group.save();
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

async function dislikePost(req, res) {
  try {
    const group = await Group.findById(req.params.id);
    const post = await group.posts.find(
      (post) => post.id === req.params.post_id
    );
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
      await group.save();
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
    await group.save();
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

async function deleteGroup(req, res) {
  try {
    const group = await Group.findById(req.params.id);
    await group.remove();
    res.json({ msg: "Group deleted successfully" });
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Internal server error.");
  }
}

async function commentGroupPost(req, res) {
  try {
    const user = await User.findById(req.user.id).select("-password");
    const group = await Group.findById(req.params.id);
    const post = group.posts.find((post) => post.id === req.params.post_id);
    const newComment = {
      text: req.body.text,
      name: user.username,
      user: req.user.id,
    };
    post.comments.unshift(newComment);
    await group.save();
    res.json(post.comments);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Internal server error.");
  }
}

async function updateComment(req, res) {
  try {
    const group = await Group.findById(req.params.id);
    const post = group.posts.find((post) => post.id === req.params.post_id);
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
    await group.save();
    return res.json(post.comments[index]);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Internal server error.");
  }
}

async function deleteComment(req, res) {
  try {
    const group = await Group.findById(req.params.id);
    const post = group.posts.find((post) => post.id === req.params.post_id);
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
    await group.save();
    return res.json(post.comments);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Internal server error.");
  }
}

async function replyToComment(req, res) {
  try {
    const user = await User.findById(req.user.id).select("username");
    const group = await Group.findById(req.params.id);
    const post = group.posts.find((post) => post.id === req.params.post_id);
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
    await group.save();
    res.json(post.comments[index]);
  } catch (e) {
    res.status(500).send("Internal server error.");
  }
}

async function updateReply(req, res) {
  try {
    const user = await User.findById(req.user.id).select("username");
    const group = await Group.findById(req.params.id);
    const post = group.posts.find((post) => post.id === req.params.post_id);
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
    await group.save();
    res.json(newReply);
  } catch (e) {
    res.status(500).send("Internal server error.");
  }
}

async function deleteReply(req, res) {
  try {
    const group = await Group.findById(req.params.id);
    const post = group.posts.find((post) => post.id === req.params.post_id);
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
    await group.save();
    return res.json({ msg: "Reply deleted successfully" });
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Internal server error.");
  }
}

const group = {
  getAllGroups,
  getGroup,
  meInGroups,
  createGroup,
  postInGroup,
  deletePost,
  impulsePost,
  likePost,
  dislikePost,
  deleteGroup,
  commentGroupPost,
  updateComment,
  deleteComment,
  replyToComment,
  updateReply,
  deleteReply,
};

module.exports = group;

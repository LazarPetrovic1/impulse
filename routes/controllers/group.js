const Group = require("../../models/Group");
const cloudinary = require("../../utils/cloudinary");

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
// some group updates...
// save group technically in redux
// black group as well as dismiss post functionalities needed
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
async function getAllPosts(req, res) {
  try {
    const group = await Group.findById(req.params.id)
    return res.json(group.posts)
  } catch (e) {
    res.status(500).send("Internal server error.");
  }
}
// async function editPost(req, res) {}
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
// no dismiss
async function seeAllWhoImpulsed(req, res) {
  try {
    let users = [];
    const group = await Group.findById(req.params.id);
    const post = await group.posts.find(p => p._id === req.params.postId)
    if (post) {
      for await (const person of post.impulsions) {
        let user = await User.findById(person.user).select(
          "firstName lastName username"
        );
        await users.push(
          `${user.firstName} ${user.lastName} (@${user.username})`
        );
      }
    } else {
      return res.json({ msg: "Either loading or 404: Not Found." })
    }
    res.json(users);
  } catch (e) {
    res.status(500).json({ msg: "Internal server error" })
  }
}
async function seeAllWhoLiked(req, res) {
  try {
    let users = [];
    const group = await Group.findById(req.params.id);
    const post = await group.posts.find(p => p._id === req.params.postId)
    if (post) {
      for await (const person of post.endorsements) {
        let user = await User.findById(person.user).select(
          "firstName lastName username"
        );
        await users.push(
          `${user.firstName} ${user.lastName} (@${user.username})`
        );
      }
    } else {
      return res.json({ msg: "Either loading or 404: Not Found." })
    }
    res.json(users);
  } catch (e) {
    return res.json({ msg: "Either loading or 404: Not Found." })
  }
}
async function seeAllWhoDisliked(req, res) {
  try {
    let users = [];
    const group = await Group.findById(req.params.id);
    const post = await group.posts.find(p => p._id === req.params.postId)
    if (post) {
      for await (const person of post.judgements) {
        let user = await User.findById(person.user).select(
          "firstName lastName username"
        );
        await users.push(
          `${user.firstName} ${user.lastName} (@${user.username})`
        );
      }
    } else {
      return res.json({ msg: "Either loading or 404: Not Found." })
    }
    res.json(users);
  } catch (e) {
    return res.json({ msg: "Either loading or 404: Not Found." })
  }
}
async function impulsePost(req, res) {
  try {
    const group = await Group.findById(req.params.id);
    const post = await group.posts.find(
      (post) => post.id === req.params.postId
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
      (post) => post.id === req.params.postId
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
      (post) => post.id === req.params.postId
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
async function meInGroups(req, res) {
  try {
    const groups = await Group.find({ people: req.user.id });
    res.json(groups);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Internal server error.");
  }
}
async function commentGroupPost(req, res) {
  try {
    const user = await User.findById(req.user.id).select("-password");
    const group = await Group.findById(req.params.id);
    const post = group.posts.find((post) => post.id === req.params.postId);
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
async function getPostComments(req, res) {
  try {
    const group = await Group.findById(req.params.id);
    const post = await group.posts.find(p => p._id === req.params.postId)
    return res.json(post.comments)
  } catch (e) {
    return res.json({ msg: "Either loading or 404: Not Found." })
  }
}
async function updateComment(req, res) {
  try {
    const group = await Group.findById(req.params.id);
    const post = group.posts.find((post) => post.id === req.params.postId);
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
    const post = group.posts.find((post) => post.id === req.params.postId);
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
    const post = group.posts.find((post) => post.id === req.params.postId);
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
    const post = group.posts.find((post) => post.id === req.params.postId);
    const comment = await post.comments.find(
      (comm) => comm.id === req.params.comment_id
    );
    const reply = await comment.replies.find(
      (rep) => rep.id === req.params.replyId
    );
    const newReply = {
      user: req.user.id,
      content: req.body.content,
      by: user.username,
    };
    comment.replies = comment.replies.map((rep) =>
      rep.id === req.params.replyId ? newReply : rep
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
    const post = group.posts.find((post) => post.id === req.params.postId);
    const comment = post.comments.find(
      (comm) => comm.id === req.params.comment_id
    );
    if (!comment) return res.status(404).json({ msg: "Comment not found." });
    const reply = comment.replies.find((rep) => rep.id === req.params.replyId);
    if (!reply) return res.status(404).json({ msg: "Reply not found." });
    if (reply.user.toString() !== req.user.id)
      return res.status(401).json({ msg: "User not authorised." });
    const removeIndex = comment.replies
      .map((rep) => rep.user.toString())
      .indexOf(req.user.id);
    comment.replies = comment.replies.filter(
      (rep) => rep.id !== req.params.replyId
    );
    await group.save();
    return res.json({ msg: "Reply deleted successfully" });
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Internal server error.");
  }
}
async function impulsifyComment(req, res) {
  try {
    const group = await Group.findById(req.params.id);
    const post = await group.posts.find(p => p.id === req.params.postId)
    const comment = await post.comments.find(c => c.id === req.params.commentId)
    if (
      comment.impulsions.filter((imp) => imp.user.toString() === req.body.likerId)
        .length > 0
    ) {
      comment.impulsions.splice(
        comment.impulsions
          .map((imp) => imp.user.toString())
          .indexOf(req.body.likerId),
        1
      );
      await group.save();
      return res.json({
        impulsions: comment.impulsions,
        endorsements: comment.endorsements,
        judgements: comment.judgements,
      });
    }
    comment.impulsions.unshift({ user: req.body.likerId })
    if (
      comment.judgements.filter((jud) => jud.user.toString() === req.body.likerId)
        .length > 0
    ) {
      comment.judgements.splice(
        comment.judgements
          .map((jud) => jud.user.toString())
          .indexOf(req.body.likerId),
        1
      );
    }
    if (
      comment.endorsements.filter(
        (end) => end.user.toString() === req.body.likerId
      ).length > 0
    ) {
      // Get remove index
      comment.endorsements.splice(
        comment.endorsements
          .map((end) => end.user.toString())
          .indexOf(req.body.likerId),
        1
      );
    }
    await group.save();
    return res.json({
      impulsions: comment.impulsions,
      endorsements: comment.endorsements,
      judgements: comment.judgements,
    });
  } catch (e) {
    console.error(e.message);
    if (e.kind === "ObjectId")
      return res.status(404).json({ msg: "Post not found" });
    res.status(500).send("Internal server error.");
  }
}
async function likeComment(req, res) {
  try {
  const group = await Group.findById(req.params.id);
  const post = await group.posts.find(p => p.id === req.params.postId)
  const comment = await post.comments.find(c => c.id === req.params.commentId)
  if (
    comment.endorsements.filter(
      (end) => end.user.toString() === req.body.likerId
    ).length > 0
  ) {
    comment.endorsements.splice(
      comment.endorsements
        .map((end) => end.user.toString())
        .indexOf(req.body.likerId),
      1
    );
    console.log("IMPALZHNS", comment.impulsions);
    console.log("DZADZMENC", comment.judgements);
    console.log("ENDORSMENC", comment.endorsements);
    await group.save();
    return res.json({
      impulsions: comment.impulsions,
      endorsements: comment.endorsements,
      judgements: comment.judgements,
    });
  }
  comment.endorsements.unshift({ user: req.body.likerId });
  if (
    comment.judgements.filter((jud) => jud.user.toString() === req.body.likerId)
      .length > 0
  ) {
    comment.judgements.splice(
      comment.judgements
        .map((jud) => jud.user.toString())
        .indexOf(req.body.likerId),
      1
    );
  }
  if (
    comment.impulsions.filter((imp) => imp.user.toString() === req.body.likerId)
      .length > 0
  ) {
    // Get remove index
    comment.impulsions.splice(
      comment.impulsions
        .map((imp) => imp.user.toString())
        .indexOf(req.body.likerId),
      1
    );
  }
  await group.save();
  await console.log("RES.JSON", {
    impulsions: comment.impulsions,
    endorsements: comment.endorsements,
    judgements: comment.judgements,
  });
  return res.json({
      impulsions: comment.impulsions,
      endorsements: comment.endorsements,
      judgements: comment.judgements,
    });
  } catch (e) {
    console.error(e.message);
      if (e.kind === "ObjectId")
        return res.status(404).json({ msg: "Post not found" });
      res.status(500).send("Internal server error.");
    }
}
async function dislikeComment(req, res) {
  try {
    const group = await Group.findById(req.params.id);
    const post = await group.posts.find(p => p.id === req.params.postId)
    const comment = await post.comments.find(c => c.id === req.params.commentId)
    if (
      comment.judgements.filter((jud) => jud.user.toString() === req.body.likerId)
        .length > 0
    ) {
      comment.judgements.splice(
        comment.judgements
          .map((jud) => jud.user.toString())
          .indexOf(req.body.likerId),
        1
      );
      await group.save();
      return res.json({
        impulsions: comment.impulsions,
        endorsements: comment.endorsements,
        judgements: comment.judgements,
      });
    }
    comment.judgements.unshift({ user: req.body.likerId });
    if (
      comment.endorsements.filter(
        (end) => end.user.toString() === req.body.likerId
      ).length > 0
    ) {
      // Get remove index
      comment.endorsements.splice(
        comment.endorsements
          .map((end) => end.user.toString())
          .indexOf(req.body.likerId),
        1
      );
    }
    if (
      comment.impulsions.filter((imp) => imp.user.toString() === req.body.likerId)
        .length > 0
    ) {
      // Get remove index
      comment.impulsions.splice(
        comment.impulsions
          .map((imp) => imp.user.toString())
          .indexOf(req.body.likerId),
        1
      );
    }
    await group.save();
    return res.json({
      impulsions: comment.impulsions,
      endorsements: comment.endorsements,
      judgements: comment.judgements,
    });
  } catch (e) {
    console.error(e.message);
    if (e.kind === "ObjectId")
      return res.status(404).json({ msg: "Post not found" });
    res.status(500).send("Internal server error.");
  }
}
async function impulsifyReplyToImageComment(req, res) {
  try {
    const group = await Group.findById(req.params.id)
    const post = await group.posts.find(p => p.id === req.params.postId )
    const comment = await post.comments.find(c => c.id === req.params.commentId)
    const reply = await comment.replies.find(r => r.id === req.params.replyId)
    if (
      reply.impulsions.filter((imp) => imp.user.toString() === req.body.likerId)
        .length > 0
    ) {
      reply.impulsions.splice(
        reply.impulsions
          .map((imp) => imp.user.toString())
          .indexOf(req.body.likerId),
        1
      );
      await group.save();
      return res.json({
        impulsions: reply.impulsions,
        endorsements: reply.endorsements,
        judgements: reply.judgements,
      });
    }
    reply.impulsions.unshift({ user: req.body.likerId })
    if (
      reply.judgements.filter((jud) => jud.user.toString() === req.body.likerId)
        .length > 0
    ) {
      reply.judgements.splice(
        reply.judgements
          .map((jud) => jud.user.toString())
          .indexOf(req.body.likerId),
        1
      );
    }
    if (
      reply.endorsements.filter(
        (end) => end.user.toString() === req.body.likerId
      ).length > 0
    ) {
      // Get remove index
      reply.endorsements.splice(
        reply.endorsements
          .map((end) => end.user.toString())
          .indexOf(req.body.likerId),
        1
      );
    }
    await group.save();
    return res.json({
      impulsions: reply.impulsions,
      endorsements: reply.endorsements,
      judgements: reply.judgements,
    });
  } catch (e) {
    console.error(e.message);
    if (e.kind === "ObjectId")
      return res.status(404).json({ msg: "Post not found" });
    res.status(500).send("Internal server error.");
  }
}
async function likeReplyToImageComment(req, res) {
  try {
    const group = await Group.findById(req.params.id)
    const post = await group.posts.find(p => p.id === req.params.postId )
    const comment = await post.comments.find(c => c.id === req.params.commentId)
    const reply = await comment.replies.find(r => r.id === req.params.replyId)
    if (
      reply.endorsements.filter(
        (end) => end.user.toString() === req.body.likerId
      ).length > 0
    ) {
      reply.endorsements.splice(
        reply.endorsements
          .map((end) => end.user.toString())
          .indexOf(req.body.likerId),
        1
      );
      await group.save();
      return res.json({
        impulsions: reply.impulsions,
        endorsements: reply.endorsements,
        judgements: reply.judgements,
      });
    }
    reply.endorsements.unshift({ user: req.body.likerId });
    if (
      reply.judgements.filter((jud) => jud.user.toString() === req.body.likerId)
        .length > 0
    ) {
      reply.judgements.splice(
        reply.judgements
          .map((jud) => jud.user.toString())
          .indexOf(req.body.likerId),
        1
      );
    }
    if (
      reply.impulsions.filter((imp) => imp.user.toString() === req.body.likerId)
        .length > 0
    ) {
      // Get remove index
      reply.impulsions.splice(
        reply.impulsions
          .map((imp) => imp.user.toString())
          .indexOf(req.body.likerId),
        1
      );
    }
    await group.save();
    return res.json({
      impulsions: reply.impulsions,
      endorsements: reply.endorsements,
      judgements: reply.judgements,
    });
  } catch (e) {
    console.error(e.message);
      if (e.kind === "ObjectId")
        return res.status(404).json({ msg: "Post not found" });
      res.status(500).send("Internal server error.");
    }
}
async function dislikeReplyToImageComment(req, res) {
  try {
    const group = await Group.findById(req.params.id)
    const post = await group.posts.find(p => p.id === req.params.postId )
    const comment = await post.comments.find(c => c.id === req.params.commentId)
    const reply = await comment.replies.find(r => r.id === req.params.replyId)
    if (
      reply.judgements.filter((jud) => jud.user.toString() === req.body.likerId)
        .length > 0
    ) {
      reply.judgements.splice(
        reply.judgements
          .map((jud) => jud.user.toString())
          .indexOf(req.body.likerId),
        1
      );
      await group.save();
      return res.json({
        impulsions: reply.impulsions,
        endorsements: reply.endorsements,
        judgements: reply.judgements,
      });
    }
    reply.judgements.unshift({ user: req.body.likerId });
    if (
      reply.endorsements.filter(
        (end) => end.user.toString() === req.body.likerId
      ).length > 0
    ) {
      // Get remove index
      reply.endorsements.splice(
        reply.endorsements
          .map((end) => end.user.toString())
          .indexOf(req.body.likerId),
        1
      );
    }
    if (
      reply.impulsions.filter((imp) => imp.user.toString() === req.body.likerId)
        .length > 0
    ) {
      // Get remove index
      reply.impulsions.splice(
        reply.impulsions
          .map((imp) => imp.user.toString())
          .indexOf(req.body.likerId),
        1
      );
    }
    await group.save();
    return res.json({
      impulsions: reply.impulsions,
      endorsements: reply.endorsements,
      judgements: reply.judgements,
    });
  } catch (e) {
    console.error(e.message);
    if (e.kind === "ObjectId")
      return res.status(404).json({ msg: "Post not found" });
    res.status(500).send("Internal server error.");
  }
}

const group = {
  createGroup,
  getAllGroups,
  getGroup,
  deleteGroup,
  postInGroup,
  getAllPosts,
  deletePost,
  seeAllWhoImpulsed,
  seeAllWhoLiked,
  seeAllWhoDisliked,
  impulsePost,
  likePost,
  dislikePost,
  meInGroups,
  commentGroupPost,
  getPostComments,
  updateComment,
  deleteComment,
  replyToComment,
  updateReply,
  deleteReply,
  impulsifyComment,
  likeComment,
  dislikeComment,
  impulsifyReplyToImageComment,
  likeReplyToImageComment,
  dislikeReplyToImageComment
};

module.exports = group;

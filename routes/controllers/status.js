const User = require("../../models/User");
const Status = require("../../models/Status");

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
      savedBy: [],
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
async function getStatusById(req, res) {
  try {
    const status = await Status.findById(req.params.id);
    res.json(status);
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
async function saveStatus(req, res) {
  try {
    const post = await Status.findById(req.params.id);
    if (
      (await post.savedBy.filter(
        (sb) => sb.user.toString() === req.user.id.toString()
      ).length) > 0
    )
      post.savedBy = await post.savedBy.filter(
        (sb) => sb.user.toString() !== req.user.id.toString()
      );
    else post.savedBy.push({ user: req.user.id });
    await post.save();
    res.json(post);
  } catch (e) {
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
      endorsements: [],
      judgements: [],
      impulsions: [],
    };
    post.comments.unshift(newComment);
    await post.save();
    res.json(post.comments);
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
    const user = await User.findById(req.user.id).select("username");
    const post = await Status.findById(req.params.id);
    const comment = post.comments.find(
      (comm) => comm.id === req.params.comment_id
    );
    if (!comment) return res.status(404).json({ msg: "Comment not found." });
    if (comment.user.toString() !== req.user.id.toString())
      return res.status(401).json({ msg: "User not authorised." });
    const newComment = {
      ...comment.toObject(),
      content: req.body.content,
    };
    post.comments = post.comments.map((comm) =>
      comm.id === req.params.comment_id ? newComment : comment
    );
    await post.save();
    return res.json(newComment);
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
async function dismissStatus(req, res) {
  try {
    const user = await User.findById(req.user.id);
    const { dismissedPosts } = req.body;
    const newUser = await User.findByIdAndUpdate(
      req.user.id,
      { dismissedPosts: [...dismissedPosts, req.params.id] },
      { new: true }
    );
    return res.json(newUser);
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
      endorsements: [],
      judgements: [],
      impulsions: [],
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
      comm.id === req.params.comment_id ? newComment : comm
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
      endorsements: reply.endorsements,
      judgements: reply.judgements,
      impulsions: reply.impulsions,
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
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const commentPage = parseInt(req.query.comment_page) || 1;
    const commentLimit = parseInt(req.query.comment_limit) || 10;
    const replyPage = parseInt(req.query.reply_page) || 1;
    const replyLimit = parseInt(req.query.reply_limit) || 5;
    const [startIndexPosts, startIndexComments, startIndexReplies] = [
      (page - 1) * limit,
      (commentPage - 1) * commentLimit,
      (replyPage - 1) * replyLimit,
    ];
    const [endIndexPosts, endIndexComments, endIndexReplies] = [
      page * limit,
      commentPage * commentLimit,
      replyPage * replyLimit,
    ];
    const status = await Status.find({ user: req.params.id });
    const posts = await status.slice(startIndexPosts, endIndexPosts);
    const newPosts = await posts.map((post) => {
      post.comments = post.comments
        .slice(startIndexComments, endIndexComments)
        .map((comm) => {
          comm.replies = comm.replies.slice(startIndexReplies, endIndexReplies);
          return comm;
        });
      return post;
    });
    const hasMoreValue =
      startIndexPosts < newPosts.length && endIndexPosts < posts.length;
    return res.json({
      posts: newPosts,
      hasMore: hasMoreValue,
    });
    // return res.json({
    //   hasMore: false,
    //   posts: [],
    // });
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Internal server error.");
  }
}
async function seeAllWhoImpulsed(req, res) {
  try {
    let users = [];
    const status = await Status.findById(req.params.id);
    if (status) {
      for await (const person of status.impulsions) {
        let user = await User.findById(person.user).select(
          "firstName lastName username"
        );
        await users.push(
          `${user.firstName} ${user.lastName} (@${user.username})`
        );
      }
    } else {
      return res.json({ msg: "Either loading or 404: Not Found." });
    }
    res.json(users);
  } catch (e) {
    console.error(e.message);
    if (e.kind === "ObjectId")
      return res.status(404).json({ msg: "Post not found" });
    res.status(500).send("Internal server error.");
  }
}
async function seeAllWhoLiked(req, res) {
  try {
    let users = [];
    const status = await Status.findById(req.params.id);
    if (status) {
      for await (const person of status.endorsements) {
        let user = await User.findById(person.user).select(
          "firstName lastName username"
        );
        await users.push(
          `${user.firstName} ${user.lastName} (@${user.username})`
        );
      }
    } else {
      return res.json({ msg: "Either loading or 404: Not Found." });
    }
    res.json(users);
  } catch (e) {
    console.error(e.message);
    if (e.kind === "ObjectId")
      return res.status(404).json({ msg: "Post not found" });
    res.status(500).send("Internal server error.");
  }
}
async function seeAllWhoDisliked(req, res) {
  try {
    let users = [];
    const status = await Status.findById(req.params.id);
    if (status) {
      for await (const person of status.judgements) {
        let user = await User.findById(person.user).select(
          "firstName lastName username"
        );
        await users.push(
          `${user.firstName} ${user.lastName} (@${user.username})`
        );
      }
    } else {
      return res.json({ msg: "Either loading or 404: Not Found." });
    }
    res.json(users);
  } catch (e) {
    console.error(e.message);
    if (e.kind === "ObjectId")
      return res.status(404).json({ msg: "Post not found" });
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
async function impulsifyComment(req, res) {
  try {
    const post = await Status.findById(req.params.id);
    const comment = await post.comments.find(
      (c) => c.id === req.params.commentId
    );
    if (
      comment.impulsions.filter(
        (imp) => imp.user.toString() === req.body.likerId
      ).length > 0
    ) {
      comment.impulsions.splice(
        comment.impulsions
          .map((imp) => imp.user.toString())
          .indexOf(req.body.likerId),
        1
      );
      await post.save();
      return res.json({
        impulsions: comment.impulsions,
        endorsements: comment.endorsements,
        judgements: comment.judgements,
      });
    }
    comment.impulsions.unshift({ user: req.body.likerId });
    if (
      comment.judgements.filter(
        (jud) => jud.user.toString() === req.body.likerId
      ).length > 0
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
    await post.save();
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
    const post = await Status.findById(req.params.id);
    const comment = await post.comments.find(
      (c) => c.id === req.params.commentId
    );
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
      await post.save();
      return res.json({
        impulsions: comment.impulsions,
        endorsements: comment.endorsements,
        judgements: comment.judgements,
      });
    }
    comment.endorsements.unshift({ user: req.body.likerId });
    if (
      comment.judgements.filter(
        (jud) => jud.user.toString() === req.body.likerId
      ).length > 0
    ) {
      comment.judgements.splice(
        comment.judgements
          .map((jud) => jud.user.toString())
          .indexOf(req.body.likerId),
        1
      );
    }
    if (
      comment.impulsions.filter(
        (imp) => imp.user.toString() === req.body.likerId
      ).length > 0
    ) {
      // Get remove index
      comment.impulsions.splice(
        comment.impulsions
          .map((imp) => imp.user.toString())
          .indexOf(req.body.likerId),
        1
      );
    }
    await post.save();
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
    const post = await Status.findById(req.params.id);
    const comment = await post.comments.find(
      (c) => c.id === req.params.commentId
    );
    if (
      comment.judgements.filter(
        (jud) => jud.user.toString() === req.body.likerId
      ).length > 0
    ) {
      comment.judgements.splice(
        comment.judgements
          .map((jud) => jud.user.toString())
          .indexOf(req.body.likerId),
        1
      );
      await post.save();
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
      comment.impulsions.filter(
        (imp) => imp.user.toString() === req.body.likerId
      ).length > 0
    ) {
      // Get remove index
      comment.impulsions.splice(
        comment.impulsions
          .map((imp) => imp.user.toString())
          .indexOf(req.body.likerId),
        1
      );
    }
    await post.save();
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
async function impulsifyReplyToComment(req, res) {
  try {
    const post = await Status.findById(req.params.id);
    const comment = await post.comments.find(
      (c) => c.id === req.params.commentId
    );
    const reply = await comment.replies.find(
      (r) => r.id === req.params.replyId
    );
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
      await post.save();
      return res.json({
        impulsions: reply.impulsions,
        endorsements: reply.endorsements,
        judgements: reply.judgements,
      });
    }
    reply.impulsions.unshift({ user: req.body.likerId });
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
    await post.save();
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
async function likeReplyToComment(req, res) {
  try {
    const post = await Status.findById(req.params.id);
    const comment = await post.comments.find(
      (c) => c.id === req.params.commentId
    );
    const reply = await comment.replies.find(
      (r) => r.id === req.params.replyId
    );
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
      await post.save();
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
    await post.save();
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
async function dislikeReplyToComment(req, res) {
  try {
    const post = await Status.findById(req.params.id);
    const comment = await post.comments.find(
      (c) => c.id === req.params.commentId
    );
    const reply = await comment.replies.find(
      (r) => r.id === req.params.replyId
    );
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
      await post.save();
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
    await post.save();
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

const status = {
  createStatus,
  getAllStatuses,
  getStatusById,
  deleteStatus,
  editStatus,
  saveStatus,
  addCommentToStatus,
  getCommentsOfStatus,
  editCommentOfStatus,
  deleteCommentOfStatus,
  dismissStatus,
  replyToCommentOfStatus,
  editReplyToCommentOfStatus,
  getAllRepliesToCommentOfStatus,
  deleteReplyToCommentOfStatus,
  getMyStatuses,
  getPersonsStatuses,
  seeAllWhoImpulsed,
  seeAllWhoLiked,
  seeAllWhoDisliked,
  impulseStatus,
  likeStatus,
  dislikeStatus,
  impulsifyComment,
  likeComment,
  dislikeComment,
  impulsifyReplyToComment,
  likeReplyToComment,
  dislikeReplyToComment,
};

module.exports = status;

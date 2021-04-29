const { validationResult } = require("express-validator");
const User = require("../../models/User");
const ImagePost = require("../../models/ImagePost");
const Profile = require("../../models/Profile");
const cloudinary = require("../../utils/cloudinary");
const paginate = require("../../utils/paginate");

async function uploadImage(req, res) {
  try {
    const fileStr = await req.body.data;
    const uploadResponse = await cloudinary.uploader.upload(fileStr);
    const newPost = await new ImagePost({
      user: req.user.id,
      content: req.body.content,
      url: uploadResponse.url, // || secure_url
      comments: [],
      endorsements: [],
      judgements: [],
      impulsions: [],
    });
    const post = await newPost.save();
    return res.json(post);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Internal server error.");
  }
}
async function getAllImages(req, res) {
  try {
    const posts = await ImagePost.find().sort({ date: -1 });
    res.json(posts);
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ msg: "Internal server error." });
  }
}
async function getImageById(req, res) {
  try {
    const post = await ImagePost.findById(req.params.id);
    res.json(post);
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ msg: "Internal server error." });
  }
}
async function deleteImage(req, res) {
  try {
    const post = await ImagePost.findById(req.params.id);
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
// no update
async function saveImage(req, res) {
  try {
    const post = await ImagePost.findById(req.params.id)
    if (await post.savedBy.filter(sb => sb.user.toString() === req.user.id.toString()).length > 0)
      post.savedBy = await post.savedBy.filter(sb => sb.user.toString() !== req.user.id.toString())
    else
      post.savedBy.push({ user: req.user.id })
    await post.save()
    res.json(post)
  } catch (e) {
    if (e.kind === 'ObjectId') return res.status(404).json({ msg: 'Post not found' })
    res.status(500).send('Internal server error.')
  }
}
async function commentOnImage(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });
  try {
    const user = await User.findById(req.user.id).select("-password");
    const post = await ImagePost.findById(req.params.id);
    const newComment = {
      text: req.body.text,
      name: user.username,
      user: req.user.id,
      date: Date.now(),
    };
    post.comments.unshift(newComment);
    await post.save();
    res.json(post.comments);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Internal server error.");
  }
}
async function getImageComments(req, res) {
  try {
    const post = await ImagePost.findById(req.params.id)
    return res.json(post.comments)
  } catch (e) {
    res.status(500).send('Internal server error.')
  }
}
async function editImageComments(req, res) {
  try {
    const post = await ImagePost.findById(req.params.id)
    const comment = post.comments.find(comm => comm.id === req.params.comment_id)
    if (!comment) {
      return res.status(404).json({ msg: 'Comment not found.' })
    }
    const { content } = req.body
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorised.' })
    }
    const newComment = {
      user: comment.user,
      content,
      by: comment.by,
      replies: comment.replies
    }
    const index = post.comments.map(comm => comm.id).indexOf(req.params.comment_id)
    post.comments = post.comments.map(comm => comm.id === req.params.comment_id ? newComment : post)
    await post.save()
    return res.json(post.comments[index])
  } catch (e) {
    console.error(e.message)
    res.status(500).send('Internal server error.')
  }
}
async function deleteComment(req, res) {
  try {
    const post = await ImagePost.findById(req.params.id);
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
async function dismissImage(req, res) {
  try {
    const user = await User.findById(req.user.id)
    const { dismissedPosts } = req.body
    const newUser = await User.findByIdAndUpdate(
      req.user.id,
      { dismissedPosts: [...dismissedPosts, req.params.id] },
      { new: true }
    )
    return res.json(newUser)
  } catch (e) {
    console.error(e.message)
    res.status(500).send('Internal server error.')
  }
}
async function replyToImageComment(req, res) {
  try {
    const user = await User.findById(req.user.id).select("username")
    const post = await ImagePost.findById(req.params.id)
    const comment = await post.comments.find(comm => comm.id === req.params.comment_id)
    const newReply = {
      user: req.user.id,
      content: req.body.content,
      by: user.username
    }
    const newComment = {
      user: comment.user,
      content: comment.content,
      by: comment.by,
      replies: [...comment.replies, newReply]
    }
    const index = post.comments.map(comm => comm.id).indexOf(req.params.comment_id)
    post.comments = post.comments.map(comm => comm.id === req.params.comment_id ? newComment : post)
    await post.save()
    res.json(post.comments[index])
  } catch (e) {
    res.status(500).send('Internal server error.')
  }
}
async function editReplyToImageComment(req, res) {
  try {
    const user = await User.findById(req.user.id).select("username")
    const post = await ImagePost.findById(req.params.id)
    const comment = await post.comments.find(comm => comm.id === req.params.comment_id)
    const reply = await comment.replies.find(rep => rep.id === req.params.reply_id)
    const newReply = {
      user: req.user.id,
      content: req.body.content,
      by: user.username
    }
    comment.replies = comment.replies.map(rep => rep.id === req.params.reply_id ? newReply : rep)
    await post.save()
    res.json(comment)
  } catch (e) {
    res.status(500).send('Internal server error.')
  }
}
async function getAllRepliesToComment(req, res) {
  try {
    const post = await ImagePost.findById(req.params.id)
    return res.json(post.comments.replies)
  } catch (e) {
    res.status(500).send('Internal server error.')
  }
}
async function deleteReplyToComment(req, res) {
  try {
    const post = await ImagePost.findById(req.params.id)
    const comment = post.comments.find(comm => comm.id === req.params.comment_id)
    if (!comment) return res.status(404).json({ msg: 'Comment not found.' })
    if (comment.user.toString() !== req.user.id) return res.status(401).json({ msg: 'User not authorised.' })
    const reply = comment.replies.find(rep => rep.id === req.params.reply_id)
    if (!reply) return res.status(404).json({ msg: 'Reply not found.' })
    if (reply.user.toString() !== req.user.id) return res.status(401).json({ msg: 'User not authorised.' })
    const removeIndex = comment.replies
      .map(rep => rep.user.toString())
      .indexOf(req.user.id);
    comment.replies = comment.replies.filter(rep => rep.id !== req.params.reply_id)
    await post.save()
    return res.json(post.comments)
  } catch (e) {
    console.error(e.message)
    res.status(500).send('Internal server error.')
  }
}
// ADDITIONALS
async function seeAllWhoImpulsed(req, res) {
  try {
    let users = [];
    const image = await ImagePost.findById(req.params.id);
    if (image) {
      for await (const person of image.impulsions) {
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
    console.error(e.message);
    if (e.kind === "ObjectId")
      return res.status(404).json({ msg: "Post not found" });
    res.status(500).send("Internal server error.");
  }
}
async function seeAllWhoLiked(req, res) {
  try {
    let users = [];
    const image = await ImagePost.findById(req.params.id);
    if (image) {
      for await (const person of image.endorsements) {
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
    console.error(e.message);
    if (e.kind === "ObjectId")
      return res.status(404).json({ msg: "Post not found" });
    res.status(500).send("Internal server error.");
  }
}
async function seeAllWhoDisliked(req, res) {
  try {
    let users = [];
    const image = await ImagePost.findById(req.params.id);
    if (image) {
      for await (const person of image.judgements) {
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
    console.error(e.message);
    if (e.kind === "ObjectId")
      return res.status(404).json({ msg: "Post not found" });
    res.status(500).send("Internal server error.");
  }
}
async function impulseImage(req, res) {
  try {
    const post = await ImagePost.findById(req.params.id);
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
async function likeImage(req, res) {
  try {
    const post = await ImagePost.findById(req.params.id);
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
async function dislikeImage(req, res) {
  try {
    const post = await ImagePost.findById(req.params.id);
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
async function getMyImages(req, res) {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 5;
    const allMyPosts = await ImagePost.find({ user: req.user.id });
    const posts = await paginate(ImagePost, { user: req.user.id }, page, limit);
    res.json(posts);
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ msg: "Internal server error." });
  }
}
async function getUsersImages(req, res) {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 5;
    const posts = await paginate(
      ImagePost,
      { user: req.params.id },
      page,
      limit
    );
    res.json(posts);
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ msg: "Internal server error." });
  }
}
async function impulsifyImageComment(req, res) {
  try {
    const post = await ImagePost.findById(req.params.id)
    const comment = await post.comments.find(c => c._id === req.params.commentId)
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
      await post.save();
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
async function likeImageComment(req, res) {
try {
  const post = await ImagePost.findById(req.params.id);
  const comment = await post.comments.find(c => c._id === req.params.commentId)
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
async function dislikeImageComment(req, res) {
  try {
    const post = await Image.findById(req.params.id);
    const comment = await post.comments.find(c => c._id === req.params.commentId)
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
async function impulsifyReplyToImageComment(req, res) {
  try {
    const post = await Image.findById(req.params.id)
    const comment = await post.comments.find(c => c._id === req.params.commentId)
    const reply = await comment.replies.find(r => r._id === req.params.replyId)
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
async function likeReplyToImageComment(req, res) {
  try {
    const post = await Image.findById(req.params.id);
    const comment = await post.comments.find(c => c._id === req.params.commentId)
    const reply = await comment.replies.find(r => r._id === req.params.replyId)
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
async function dislikeReplyToImageComment(req, res) {
  try {
    const post = await Image.findById(req.params.id);
    const comment = await post.comments.find(c => c._id === req.params.commentId)
    const reply = await comment.replies.find(r => r._id === req.params.replyId)
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

const image = {
  uploadImage,
  getAllImages,
  getImageById,
  deleteImage,
  saveImage,
  commentOnImage,
  getImageComments,
  editImageComments,
  deleteComment,
  dismissImage,
  replyToImageComment,
  editReplyToImageComment,
  getAllRepliesToComment,
  deleteReplyToComment,
  seeAllWhoImpulsed,
  seeAllWhoLiked,
  seeAllWhoDisliked,
  impulseImage,
  likeImage,
  dislikeImage,
  getMyImages,
  getUsersImages,
  impulsifyImageComment,
  likeImageComment,
  dislikeImageComment,
  impulsifyReplyToImageComment,
  likeReplyToImageComment,
  dislikeReplyToImageComment
};

module.exports = image;

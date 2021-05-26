const auth = require('../../middleware/auth')
const User = require('../../models/User')
const ForumPost = require('../../models/ForumPost')
const Profile = require('../../models/Profile')
const { validationResult } = require('express-validator')

// editCommentOfForumPost
// editReplyToCommentOfForumPost

async function makeForumPost(req, res) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  try {
    const user = await User.findById(req.user.id).select('-password')
    const newPost = new ForumPost({
      user: req.user.id,
      author: user.username,
      body: req.body.body,
      title: req.body.title,
      isDismissed: false,
      savedBy: [],
      media: req.body.media || [],
      endorsements: [],
      judgements: [],
      impulsions: [],
      comments: []
    })
    const post = await newPost.save()
    await res.json(post)
  } catch (e) {
    console.error(e.message)
    res.status(500).send('Internal server error.')
  }
}
async function getAllForumPosts(req, res) {
  try {
    const posts = await ForumPost.find().sort({ date: -1 })
    res.json(posts)
  } catch (e) {
    console.error(e.message)
    res.status(500).json({ msg: 'Internal server error.' })
  }
}
async function getForumPostById(req, res) {
  try {
    const post = await ForumPost.findById(req.params.id)
    if (!post) {
      return res.status(404).json({ msg: 'Post not found.' })
    }
    res.json(post)
  } catch (e) {
    console.error(e.message)
    if (e.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' })
    }
    res.status(500).send('Internal server error.')
  }
}
async function deleteForumPost(req, res) {
  try {
    const post = await ForumPost.findById(req.params.id)
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' })
    }
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorised.' })
    }
    await post.remove()
    res.json({ msg: 'Post removed.' })
  } catch (e) {
    console.error(e.message)
    if (e.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' })
    }
    res.status(500).send('Internal server error.')
  }
}
async function updateForumPost(req, res) {
  try {
    const post = await ForumPost.findById(req.params.id)
    const { body } = req.body
    const newPost = await ForumPost.findByIdAndUpdate(
      req.params.id,
      { body },
      { new: true }
    )
    return res.json(newPost)
  } catch (e) {
    console.error(e.message)
    if (e.kind === 'ObjectId') return res.status(404).json({ msg: 'Post not found' })
    res.status(500).send('Internal server error.')
  }
}
async function saveForumPost(req, res) {
  try {
    const post = await ForumPost.findById(req.params.id)
    if (await post.savedBy.filter(sb => sb.user.toString() === req.user.id.toString()).length > 0) post.savedBy = await post.savedBy.filter(sb => sb.user.toString() !== req.user.id.toString())
    else post.savedBy.push({ user: req.user.id })
    await post.save()
    res.json(post)
  } catch (e) {
    if (e.kind === 'ObjectId') return res.status(404).json({ msg: 'Post not found' })
    res.status(500).send('Internal server error.')
  }
}
async function addCommentToForumPost(req, res) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  try {
    const user = await User.findById(req.user.id).select('-dismissedPosts -firstName -lastName -email -sex -bio -dob -password -city -country -zip -phone -security -question -imageTaken -friends')
    const post = await ForumPost.findById(req.params.id)
    const newComment = {
      user: user.id,
      content: req.body.content,
      by: user.username,
      endorsements: [],
      judgements: [],
      impulsions: [],
      replies: []
    }
    post.comments.unshift(newComment)
    await post.save()
    res.json(post.comments)
  } catch (e) {
    console.error(e.message)
    res.status(500).send('Internal server error.')
  }
}
async function getCommentsOfForumPost(req, res) {
  try {
    const post = await ForumPost.findById(req.params.id)
    return res.json(post.comments)
  } catch (e) {
    res.status(500).send('Internal server error.')
  }
}
async function editCommentOfForumPost(req, res) {
  try {
    const post = await ForumPost.findById(req.params.id)
    const comment = post.comments.find(comm => comm.id === req.params.comment_id)
    if (!comment) return res.status(404).json({ msg: 'Comment not found.' })
    const { content } = req.body
    if (comment.user.toString() !== req.user.id) return res.status(401).json({ msg: 'User not authorised.' })
    const newComment = {
      ...comment.toObject(),
      content,
    }
    post.comments = post.comments.map(comm => comm.id === req.params.comment_id ? newComment : comm)
    await post.save()
    return res.json(newComment)
  } catch (e) {
    console.error(e.message)
    res.status(500).send('Internal server error.')
  }
}
async function deleteCommentOfForumPost(req, res) {
  try {
    const post = await ForumPost.findById(req.params.id)
    const comment = post.comments.find(
      comment => comment.id === req.params.comment_id
    )
    if (!comment) {
      return res.status(404).json({ msg: 'Comment not found.' })
    }
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorised.' })
    }
    const removeIndex = post.comments
      .map(comment => comment.user.toString())
      .indexOf(req.user.id)
    post.comments.splice(removeIndex, 1)
    await post.save()
    return res.json(post.comments)
  } catch (e) {
    console.error(e.message)
    res.status(500).send('Internal server error.')
  }
}
async function dismissPost(req, res) {
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
async function replyToCommentOfForumPost(req, res) {
  try {
    const user = await User.findById(req.user.id).select("username")
    const post = await ForumPost.findById(req.params.id)
    const comment = await post.comments.find(comm => comm.id === req.params.comment_id)
    const newReply = {
      user: req.user.id,
      content: req.body.content,
      by: user.username,
      endorsements: [],
      judgements: [],
      impulsions: []
    }
    const newComment = {
      ...comment.toObject(),
      replies: [...comment.replies, newReply]
    }
    post.comments = post.comments.map(comm => comm.id === req.params.comment_id ? newComment : comm)
    await post.save()
    res.json(newReply)
  } catch (e) {
    res.status(500).send('Internal server error.')
  }
}
async function editReplyToCommentOfForumPost(req, res) {
  try {
    const user = await User.findById(req.user.id).select("username")
    const post = await ForumPost.findById(req.params.id)
    const comment = await post.comments.find(comm => comm.id === req.params.comment_id)
    const reply = await comment.replies.find(rep => rep.id === req.params.reply_id)
    const newReply = {
      ...reply.toObject(),
      content: req.body.content,
    }
    comment.replies = comment.replies.map(rep => rep.id === req.params.reply_id ? newReply : rep)
    await post.save()
    res.json(newReply)
  } catch (e) {
    res.status(500).send('Internal server error.')
  }
}
async function getAllRepliesToCommentOfForumPost(req, res) {
  try {
    const post = await ForumPost.findById(req.params.id)
    return res.json(post.comments.replies)
  } catch (e) {
    res.status(500).send('Internal server error.')
  }
}
async function deleteReplyToCommentOfForumPost(req, res) {
  try {
    const post = await ForumPost.findById(req.params.id)
    const comment = post.comments.find(comm => comm.id === req.params.comment_id)
    if (!comment) return res.status(404).json({ msg: 'Comment not found.' })
    if (comment.user.toString() !== req.user.id) return res.status(401).json({ msg: 'User not authorised.' })
    const reply = comment.replies.find(rep => rep.id === req.params.reply_id)
    if (!reply) return res.status(404).json({ msg: 'Reply not found.' })
    if (reply.user.toString() !== req.user.id) return res.status(401).json({ msg: 'User not authorised.' })
    comment.replies = comment.replies.filter(rep => rep.id !== req.params.reply_id)
    await post.save()
    return res.json(post.comments)
  } catch (e) {
    console.error(e.message)
    res.status(500).send('Internal server error.')
  }
}

// Added

async function getMyForumPosts(req, res) {
  try {
    const forumposts = await Forum.findMany({ user: req.user.id })
    return res.json(forumposts)
  } catch (e) {
    console.log(e.message);
  }
}
async function getUsersForumPosts(req, res) {
  try {
    const forumposts = await Forum.findMany({ user: req.params.id })
    return res.json(forumposts)
  } catch (e) {
    console.log(e.message);
  }
}
async function seeAllWhoImpulsed(req, res) {
  try {
    let users = [];
    const forumpost = await ForumPost.findById(req.params.id);
    if (forumpost) {
      for await (const person of forumpost.impulsions) {
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
    const forumpost = await ForumPost.findById(req.params.id);
    if (forumpost) {
      for await (const person of forumpost.endorsements) {
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
    const forumpost = await ForumPost.findById(req.params.id);
    if (forumpost) {
      for await (const person of forumpost.judgements) {
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
async function impulsifyForumPost(req, res) {
  try {
    const post = await ForumPost.findById(req.params.id);
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
async function likeForumPost(req, res) {
  try {
    const post = await ForumPost.findById(req.params.id);
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
async function dislikeForumPost(req, res) {
  try {
    const post = await ForumPost.findById(req.params.id);
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
async function meInForumPosts(req, res) {
  // create search by forumpost || (_||_ && .comments[TEXT] && .comments.replies[TEXT])
  // return the line where the user is mentioned and link in to the postId
  // maybe animate the post paragraph where this thing is located in
}
async function impulsifyCommentOfForumPost(req, res) {
  try {
    const post = await ForumPost.findById(req.params.id)
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
async function likeCommentOfForumPost(req, res) {
try {
  const post = await ForumPost.findById(req.params.id);
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
async function dislikeCommentOfForumPost(req, res) {
  try {
    const post = await ForumPost.findById(req.params.id);
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
async function impulsifyReplyToCommentOfForumPost(req, res) {
  try {
    const post = await ForumPost.findById(req.params.id)
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
async function likeReplyToCommentOfForumPost(req, res) {
  try {
    const post = await ForumPost.findById(req.params.id);
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
async function dislikeReplyToCommentOfForumPost(req, res) {
  try {
    const post = await ForumPost.findById(req.params.id);
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

const forum = {
  makeForumPost,
  getAllForumPosts,
  getForumPostById,
  deleteForumPost,
  updateForumPost,
  saveForumPost,
  addCommentToForumPost,
  getCommentsOfForumPost,
  editCommentOfForumPost,
  deleteCommentOfForumPost,
  dismissPost,
  replyToCommentOfForumPost,
  editReplyToCommentOfForumPost,
  getAllRepliesToCommentOfForumPost,
  deleteReplyToCommentOfForumPost,
  // THERE ARE NEW AND ARE TO BE IMPLEMENTED
  // THERE ARE NEW AND ARE TO BE IMPLEMENTED
  // THERE ARE NEW AND ARE TO BE IMPLEMENTED
  getMyForumPosts,
  getUsersForumPosts,
  seeAllWhoImpulsed,
  seeAllWhoLiked,
  seeAllWhoDisliked,
  impulsifyForumPost,
  likeForumPost,
  dislikeForumPost,
  meInForumPosts,
  impulsifyCommentOfForumPost,
  likeCommentOfForumPost,
  dislikeCommentOfForumPost,
  impulsifyReplyToCommentOfForumPost,
  likeReplyToCommentOfForumPost,
  dislikeReplyToCommentOfForumPost
}

module.exports = forum;

const auth = require('../../middleware/auth')
const User = require('../../models/User')
const ForumPost = require('../../models/ForumPost')
const Profile = require('../../models/Profile')
const { validationResult } = require('express-validator')

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
      comments: [],
      savedBy: []
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
      by: user.username
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

async function editReplyToCommentOfForumPost(req, res) {
  try {
    const user = await User.findById(req.user.id).select("username")
    const post = await ForumPost.findById(req.params.id)
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
  deleteReplyToCommentOfForumPost
}

module.exports = forum;

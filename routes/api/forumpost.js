const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const { check, validationResult } = require('express-validator')
const User = require('../../models/User')
const ForumPost = require('../../models/ForumPost')
const Profile = require('../../models/Profile')

// @route -- POST -- api/forumposts
// @desc -- -- Create a post
// @access -- -- Private
router.post(
  '/',
  [
    auth,
    [
      check('title', 'Title is required.')
        .not()
        .isEmpty(),
      check('body', 'Content (at least textual) is required for a post')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    try {
      const user = await User.findById(req.user.id).select('-password')

      const newPost = new ForumPost({
        title: req.body.title,
        body: req.body.body,
        user: req.user.id,
        author: user.username,
        comments: []
      })

      const post = await newPost.save()
    } catch (e) {
      console.error(e.message)
      res.status(500).send('Internal server error.')
    }
  }
)

// @route -- GET -- api/forumposts
// @desc -- -- Get all posts
// @access -- -- Private
router.get('/', auth, async (req, res) => {
  try {
    const posts = await ForumPost.find().sort({ date: -1 })
    res.json(posts)
  } catch (e) {
    console.error(e.message)
    res.status(500).json({ msg: 'Internal server error.' })
  }
})

// @route -- GET -- api/forumposts/:id
// @desc -- -- Get a post by id
// @access -- -- Private
router.get('/:id', auth, async (req, res) => {
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
})

// @route -- DELETE -- api/forumposts/:id
// @desc -- -- Delete a post
// @access -- -- Private
router.delete('/:id', auth, async (req, res) => {
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
})

// @route -- PUT -- api/forumposts/:id/edit
// @desc -- -- Edit a post
// @access -- -- Private
router.put('/:id/edit', auth, async (req, res) => {
  try {
    const post = await ForumPost.findById(req.params.id)

    const { body } = req.body

    const newPost = await post.FindByIdAndUpdate(req.params.id, { ...post, body })
    return res.json(newPost)
  } catch (e) {
    console.error(e.message)

    if (e.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' })
    }

    res.status(500).send('Internal server error.')
  }
})

// @route -- POST -- api/forumposts/comment/:id
// @desc -- -- Comment on a post
// @access -- -- Private
router.post(
  '/comment/:id',
  [
    auth,
    [
      check('content', 'Text is required.')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    try {
      const user = await User.findById(req.user.id).select('-password')
      const post = await ForumPost.findById(req.params.id)

      const newComment = {
        content: req.body.text,
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
)

// @route -- DELETE -- api/forumposts/comment/:id/:comment_id
// @desc -- -- Delete a comment
// @access -- -- Private
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
  try {
    const post = await ForumPost.findById(req.params.id)

    // Pull out comment
    const comment = post.comments.find(
      comment => comment.id === req.params.comment_id
    )

    // Make sure that the comment exists
    if (!comment) {
      return res.status(404).json({ msg: 'Comment not found.' })
    }

    // Check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorised.' })
    }

    // Get remove index
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
})

module.exports = router

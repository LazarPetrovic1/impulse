const router = require('express').Router()
const auth = require('../../middleware/auth')
const { check } = require('express-validator')
const User = require('../../models/User')
const ForumPost = require('../../models/ForumPost')
const Profile = require('../../models/Profile')
const forum = require('../controllers/forumpost');

// Make post
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
  forum.makeForumPost
)

// Get posts
router.get('/', auth, forum.getAllForumPosts)

// Get post by id
router.get('/:id', auth, forum.getForumPostById)

// Remove post
router.delete('/:id', auth, forum.deleteForumPost)

// Edit post
router.put('/:id', auth, forum.updateForumPost)

// Save forum post
router.put("/save/:id", auth, forum.saveForumPost)

// Add comment
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
  forum.addCommentToForumPost
)

// Get comments
router.get("/comment/:id", auth, forum.getCommentsOfForumPost)

// Edit comment
router.put("/comment/:id/:comment_id", auth, forum.editCommentOfForumPost)

// Remove comment
router.delete('/comment/:id/:comment_id', auth, forum.deleteCommentOfForumPost)

// Dismiss post
router.put('/:id/dismiss', auth, forum.dismissPost)

// Add reply
router.post("/comment/:id/:comment_id/reply", auth, forum.replyToCommentOfForumPost)

// Edit reply
router.put("/comment/:id/:comment_id/:reply_id", auth, forum.editReplyToCommentOfForumPost)

// Get replies
router.get("/comment/:id/reply", auth, forum.getAllRepliesToCommentOfForumPost)

// Remove reply
router.delete("/comment/:id/:comment_id/:reply_id", auth, forum.deleteReplyToCommentOfForumPost)

module.exports = router

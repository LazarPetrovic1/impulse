import React, { useState, useEffect, Fragment } from 'react'
import forumPosts from '../../utils/forumPosts'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Editor from '../Editor/Editor'
import Reply from './Reply'
import PropTypes from 'prop-types'
import { getForumPostById } from '../../actions/forum'
import MarkdownRenderer from 'react-markdown-renderer'

function ForumPost ({match: {params}, auth, getForumPostById, forum}) {
  const { post } = forum

  useEffect(() => {
    getForumPostById(params.id)
  }, [getForumPostById])

  const deletePost = () => console.log('Post purged!')

  return post ? (
    <div className='container'>
      <h1 className='text-primary text-center display-3'>{post.title}</h1>
      <p className='lead text-right display-4'>- by {post.author}</p>
      <MarkdownRenderer markdown={post.body} />
      <div className='text-right mb-4'>
        {
          auth.user.username.toString() === post.author.toString() &&
          (
            <Fragment>
              <Link className='btn btn-lg btn-primary mx-2' to={`/forum/forum-post/${post._id}/edit`}>
                <i className='fas fa-edit' />&nbsp;
                Edit
              </Link>
              <button className='btn btn-lg btn-danger mx-2' onClick={deletePost}>
                <i className='fas fa-trash-alt' />&nbsp;
                Delete
              </button>
            </Fragment>
          )
        }
        <Link className='btn btn-lg btn-info mx-2' to={`/forum/forum-post/${post._id}/discuss`}>Discussion</Link>
        <Link className='btn btn-lg btn-secondary mx-2' to='/forum'>Go back</Link>
      </div>
      {
        post.comments && post.comments.map(comment => (
          <Reply comment={comment} key={comment.id} />
        ))
      }
    </div>
  ) : (
    <h1>Please wait</h1>
  )
}

ForumPost.propTypes = {
  auth: PropTypes.object.isRequired,
  forum: PropTypes.object.isRequired,
  getForumPostById: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  forum: state.forum
})

export default connect(
  mapStateToProps,
  { getForumPostById }
)(ForumPost)

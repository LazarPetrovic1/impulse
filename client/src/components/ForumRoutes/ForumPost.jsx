import React, { useState, Fragment } from 'react'
import forumPosts from '../../utils/forumPosts'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Editor from '../Editor/Editor'
import Reply from './Reply'
import PropTypes from 'prop-types'

function ForumPost ({match: {params}, auth}) {
  const [post, setPost] = useState(
    forumPosts.filter(
      post => post.id === parseInt(params.id)
    )[0]
  )

  const {
    id,
    author,
    title,
    body
  } = post

  const deletePost = () => console.log('Post purged!')

  return post ? (
    <div className='container'>
      <h1 className='text-primary text-center display-3'>{title}</h1>
      <p className='lead text-right display-4'>- by {author}</p>
      <div className='lead mb-4'>{body}</div>
      <div className='text-right mb-4'>
        {
          auth.user.username.toString() === author.toString() &&
          (
            <Fragment>
              <Link className='btn btn-lg btn-primary mx-2' to={`/forum-post/${id}/edit`}>
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
        <Link className='btn btn-lg btn-info mx-2' to={`/forum-post/${id}/discuss`}>Discussion</Link>
        <Link className='btn btn-lg btn-secondary mx-2' to='/forum'>Go back</Link>
      </div>
      {
        post.comments.map(comment => (
          <Reply comment={comment} key={comment.id} />
        ))
      }
    </div>
  ) : (
    <h1>Please wait</h1>
  )
}

ForumPost.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(
  mapStateToProps,
  null
)(ForumPost)

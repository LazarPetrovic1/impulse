import React, { useState, useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import ForumComment from './ForumComment'
import PropTypes from 'prop-types'
import { getForumPostById, deleteForumPost } from '../../actions/forum'
import MarkdownRenderer from 'react-markdown-renderer'
import Spinner from '../layout/Spinner'
import ForumDiscussion from './ForumDiscussion';

function ForumPost ({
  match: {params},
  auth,
  getForumPostById,
  deleteForumPost,
  forum
}) {
  const { post, loading } = forum
  const [isCommenting, setIsCommenting] = useState(false)

  useEffect(() => {
    getForumPostById(params.id)
    // eslint-disable-next-line
  }, [getForumPostById])

  return post && !loading ? (
    <div className='container' style={{ pointerEvents: "all" }}>
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
              <button className='btn btn-lg btn-danger mx-2' onClick={() => deleteForumPost(post._id)}>
                <i className='fas fa-trash-alt' />&nbsp;
                Delete
              </button>
            </Fragment>
          )
        }
        <button className='btn btn-lg btn-info mx-2' onClick={() => setIsCommenting(!isCommenting)}>{isCommenting ? "Cancel" : "Discussion"}</button>
        <Link className='btn btn-lg btn-secondary mx-2' to='/forum'>Go back</Link>
      </div>
      {isCommenting && <ForumDiscussion params={params} setIsCommenting={setIsCommenting} />}
      {
        post.comments && post.comments.map(comment => (
          <ForumComment comment={comment} postid={post._id} key={comment._id} />
        ))
      }
    </div>
  ) : (
    <Spinner />
  )
}

ForumPost.propTypes = {
  auth: PropTypes.object.isRequired,
  forum: PropTypes.object.isRequired,
  getForumPostById: PropTypes.func.isRequired,
  deleteForumPost: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  forum: state.forum
})

export default connect(
  mapStateToProps,
  { getForumPostById, deleteForumPost }
)(ForumPost)

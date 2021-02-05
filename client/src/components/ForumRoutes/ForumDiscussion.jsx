import React, { useState, useEffect } from 'react'
import Spinner from '../layout/Spinner'
import { getForumPostById } from '../../actions/forum'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

function ForumDiscussion ({ match: {params}, forum, getForumPostById }) {
  // eslint-disable-next-line
  const [reply, setReply] = useState(false)

  const { post, loading } = forum

  useEffect(() => {
    getForumPostById(params.id)
    // eslint-disable-next-line
  }, [])

  return post && !loading ? (
    <div className='container' style={{ pointerEvents: "all" }}>
      {
        post.comments.map(
          comment => (
            <div className='container border border-primary rounded my-3 p-3' key={comment._id}>
              <p className='mt-2'>{comment.content}</p>
              <div className='d-flex justify-content-between'>
                <button onClick={() => setReply(true)} className='btn btn-primary'>
                  <i className='fas fa-plus' /> Reply
                </button>
                <p className='text-secondary mt-2 mb-0'>- by {comment.by}</p>
              </div>
            </div>
          )
        )
      }
    </div>
  ) : (
    <Spinner />
  )
}

ForumDiscussion.propTypes = {
  forum: PropTypes.object.isRequired,
  getForumPostById: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  forum: state.forum
})

export default connect(
  mapStateToProps,
  { getForumPostById }
)(ForumDiscussion)

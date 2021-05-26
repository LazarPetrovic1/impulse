import React, { useState } from 'react'
import { getForumPostById, forumPostAddComment } from '../../actions/forum'
import PropTypes from 'prop-types'
import Autosaving from '../Editor/Autosaving';
import { connect } from 'react-redux'

function ForumDiscussion ({
  params,
  forum,
  getForumPostById,
  forumPostAddComment,
  setIsCommenting
}) {
  const [commentText, setCommentText] = useState("")

  const onSubmit = async (e) => {
    e.preventDefault()
    await forumPostAddComment({ content: commentText }, params.id)
    await setCommentText("")
    await setIsCommenting(false)
  }

  return (
    <div className='container px-0' style={{ pointerEvents: "all" }}>
      <form onSubmit={onSubmit}>
        <div className="position-relative">
          <Autosaving value={commentText} onChange={value => setCommentText(value)} />
          <button style={{ top: 0, right: 0 }} className="btn btn-primary btn-lg position-absolute">
            <i className="fas fa-save" />
          </button>
        </div>
      </form>
    </div>
  )
}

ForumDiscussion.propTypes = {
  forum: PropTypes.object.isRequired,
  getForumPostById: PropTypes.func.isRequired,
  forumPostAddComment: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  forum: state.forum
})

export default connect(
  mapStateToProps,
  { getForumPostById, forumPostAddComment }
)(ForumDiscussion)

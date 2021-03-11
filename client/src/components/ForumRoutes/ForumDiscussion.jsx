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
        <Autosaving value={commentText} onChange={value => setCommentText(value)} />
        <button className="btn btn-primary btn-block">
          <i className="fas fa-paper-plane pr-2" /> Submit
        </button>
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

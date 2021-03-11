import React from 'react';
import { forumPostDeleteComment } from '../../../actions/forum';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function ForumCommentControls({
  reply,
  edit,
  setReply,
  setEdit,
  commentuser,
  postid,
  commentid,
  forumPostDeleteComment,
  auth
}) {
  return !reply && !edit && (
    <div className='text-right mb-4'>
      <button title="Reply" onClick={() => setReply(true)} className='btn btn-primary mx-2'>
        <i className='fas fa-plus' />
      </button>
      <button title="Edit" className='btn btn-secondary mx-2' onClick={() => setEdit(true)}>
        <i className='fas fa-edit' />
      </button>
      {auth.user._id === commentuser && (
        <button title="Delete" className='btn btn-danger mx-2' onClick={() => forumPostDeleteComment(postid, commentid)}>
          <i className='fas fa-trash' />
        </button>
      )}
    </div>
  )
}

ForumCommentControls.propTypes = {
  auth: PropTypes.object.isRequired,
  forumPostDeleteComment: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
})

export default connect(mapStateToProps, { forumPostDeleteComment })(ForumCommentControls);

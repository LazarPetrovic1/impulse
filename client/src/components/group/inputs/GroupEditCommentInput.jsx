import React, { useState } from 'react';
import { updateComment } from '../../../actions/group';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function GroupEditCommentInput({ groupId, postId, commentId, updateComment, combod, setIsEditing }) {
  const [commentBody, setCommentBody] = useState(combod)
  const onSubmit = async (e) => {
    e.preventDefault();
    await updateComment(groupId, postId, commentId, commentBody);
    await setCommentBody("");
    await setIsEditing(false)
  };
  return (
    <form onSubmit={onSubmit} className="d-flex mt-4">
      <input
        type="text"
        value={commentBody}
        onChange={(e) => setCommentBody(e.target.value)}
        className="form-control"
        placeholder="Type a message"
      />
      <button className="btn btn-secondary" type="submit">
        <i className="fas fa-paper-plane" />
      </button>
    </form>
  )
}

GroupEditCommentInput.propTypes = {
  groupId: PropTypes.string.isRequired,
  postId: PropTypes.string.isRequired,
  commentId: PropTypes.string.isRequired,
  updateComment: PropTypes.func.isRequired,
  setCommentBody: PropTypes.func.isRequired,
}

export default connect(null, { updateComment })(GroupEditCommentInput);

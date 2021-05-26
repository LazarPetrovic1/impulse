import React, { useState } from 'react';
import { replyToComment } from '../../../actions/group';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function GroupInput({ groupId, postId, commentId, replyToComment, setIsReplying }) {
  const [reply, setReply] = useState("")
  const onSubmit = async (e) => {
    e.preventDefault();
    // await addCommentTopost(reply, post._id);
    await replyToComment(groupId, postId, commentId, reply);
    await setReply("");
    await setIsReplying(false)
  };
  return (
    <form onSubmit={onSubmit} className="d-flex mt-4">
      <input
        type="text"
        value={reply}
        onChange={(e) => setReply(e.target.value)}
        className="form-control"
        placeholder="Type a message"
      />
      <button className="btn btn-secondary" type="submit">
        <i className="fas fa-paper-plane" />
      </button>
    </form>
  )
}

GroupInput.propTypes = {
  groupId: PropTypes.string.isRequired,
  postId: PropTypes.string.isRequired,
  commentId: PropTypes.string.isRequired,
  replyToComment: PropTypes.func.isRequired,
}

export default connect(null, { replyToComment })(GroupInput);

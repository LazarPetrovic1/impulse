import React, { useState } from 'react';
import { commentGroupPost } from '../../../actions/group';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function GroupInput({ groupId, postId, commentGroupPost }) {
  const [comment, setComment] = useState("")
  const onSubmit = async (e) => {
    e.preventDefault();
    // await addCommentTopost(comment, post._id);
    await commentGroupPost(groupId, postId, comment);
    await setComment("");
  };
  return (
    <form onSubmit={onSubmit} className="d-flex mt-4">
      <input
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
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
  commentGroupPost: PropTypes.func.isRequired,
}

export default connect(null, { commentGroupPost })(GroupInput);

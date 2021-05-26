import React from 'react';
import { forumPostEditReplyToComment } from '../../../actions/forum';
import { connect } from 'react-redux';
import { getUserByUsername } from "../../../utils/users";
import PropTypes from 'prop-types';
import Autosaving from "../../Editor/Autosaving";
// import { sendNotif } from '../../../actions/notifs';

function ForumReplyEditInput({ forumPostEditReplyToComment, replyText, setReplyText, auth, postId, commentId, replyId, getUserByUsername, setIsReply }) {
  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      await forumPostEditReplyToComment(
        postId,
        commentId,
        replyId,
        replyText
      );
      await setIsReply(false);
    } catch (e) {
      console.warn(e.message);
    }
  }

  return (
    <form
      className="container"
      onSubmit={onSubmit}
    >
      <div className="position-relative">
        <Autosaving value={replyText} onChange={(e) => setReplyText(e)} />
        <button className="btn btn-lg btn-primary position-absolute" style={{ top: 0, right: 0 }} type="submit">
          <i className="fas fa-save" />
        </button>
      </div>
    </form>
  )
}

ForumReplyEditInput.propTypes = {
  // sendNotif: PropTypes.func.isRequired,
  forumPostEditReplyToComment: PropTypes.func.isRequired,
  getUserByUsername: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
  commentId: PropTypes.string.isRequired,
  setIsReply: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  replyTextMain: PropTypes.string.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps, { forumPostEditReplyToComment, getUserByUsername })(ForumReplyEditInput);

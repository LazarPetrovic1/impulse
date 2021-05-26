import React, { useState, useContext } from 'react';
import { forumPostReplyToComment } from '../../../actions/forum';
import { connect } from 'react-redux';
import { LanguageContext } from "../../../contexts/LanguageContext";
import { getUserByUsername } from "../../../utils/users";
import PropTypes from 'prop-types';
import Autosaving from "../../Editor/Autosaving";
import { sendNotif } from '../../../actions/notifs';

function ForumReplyInput({ forumPostReplyToComment, auth, comment, postId, commentId, getUserByUsername, setReply, sendNotif }) {
  const [replyText, setReplyText] = useState("")
  const { language } = useContext(LanguageContext)

  const getName = async (uname) => {
    const { firstName, lastName } = await getUserByUsername(uname);
    return { firstName, lastName };
  };

  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      await forumPostReplyToComment(postId, commentId, replyText);
      await setReply(false);
      const { firstName, lastName } = await getName(comment.by);
      if (auth.user._id !== comment.user) {
        await sendNotif({
          userId: comment.user,
          type: "forumpostreply",
          language,
          username: comment.by,
          name: `${firstName} ${lastName}`,
          url: `/forum/forum-post/${postId}`,
        });
      }
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

ForumReplyInput.propTypes = {
  sendNotif: PropTypes.func.isRequired,
  forumPostReplyToComment: PropTypes.func.isRequired,
  getUserByUsername: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
  commentId: PropTypes.string.isRequired,
  setReply: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps, { forumPostReplyToComment, getUserByUsername, sendNotif })(ForumReplyInput);

import React, { useState, useContext } from "react";
import Autosaving from "../Editor/Autosaving";
import {
  forumPostDeleteComment,
  forumPostEditComment,
  forumPostReplyToComment,
  forumPostDeleteReplyToComment,
} from "../../actions/forum";
import { getUserByUsername } from "../../utils/users";
import { sendNotif } from "../../actions/notifs";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ForumReply from "./ForumReply";
import ForumEditComment from "./ForumMisc/ForumEditComment";
import ForumCommentControls from "./ForumMisc/ForumCommentControls";
import { LanguageContext } from "../../contexts/LanguageContext";

function ForumComment({
  comment,
  auth,
  forumPostDeleteComment,
  postid,
  forumPostEditComment,
  forumPostReplyToComment,
  forumPostDeleteReplyToComment,
  sendNotif,
}) {
  const [reply, setReply] = useState(false);
  const [edit, setEdit] = useState(false);
  // eslint-disable-next-line
  const [replyText, setReplyText] = useState("");
  const [commentBody, setCommentBody] = useState(comment);
  const onSaveReply = (value) => setReplyText(value);
  const onEdit = (value) => setCommentBody({ ...comment, content: value });
  const { language } = useContext(LanguageContext);

  const getName = async (uname) => {
    const { firstName, lastName } = await getUserByUsername(uname);
    return { firstName, lastName };
  };

  return (
    <div className="container border border-primary rounded my-3 p-3">
      <ForumEditComment
        edit={edit}
        setEdit={setEdit}
        onEdit={onEdit}
        postid={postid}
        commentid={comment._id}
        commentBody={commentBody}
      />
      <div className="d-flex justify-content-between">
        {reply && (
          <form
            className="container"
            onSubmit={async (e) => {
              e.preventDefault();
              await forumPostReplyToComment(postid, comment._id, replyText);
              await setEdit(false);
              const { firstName, lastName } = await getName(comment.by);
              if (auth.user._id !== comment.user) {
                await sendNotif({
                  userId: comment.user,
                  type: "forumpostreply",
                  language,
                  username: comment.by,
                  name: `${firstName} ${lastName}`,
                  url: `/forum/forum-post/${postid}`,
                });
              }
            }}
          >
            <Autosaving onChange={onSaveReply} />
            <button className="btn btn-secondary" type="submit">
              Done
            </button>
          </form>
        )}
        <ForumCommentControls
          reply={reply}
          edit={edit}
          setReply={setReply}
          setEdit={setEdit}
          commentuser={comment.user}
          postid={postid}
          commentid={comment._id}
        />
        <p className="text-secondary mt-2 mb-0">- by {comment.by}</p>
      </div>
      {comment.replies.length > 0 &&
        comment.replies.map((rep) => (
          <ForumReply
            reply={rep}
            key={rep._id}
            postid={postid}
            commentid={comment._id}
          />
        ))}
    </div>
  );
}

ForumComment.propTypes = {
  auth: PropTypes.object.isRequired,
  forumPostEditComment: PropTypes.func.isRequired,
  forumPostDeleteComment: PropTypes.func.isRequired,
  forumPostReplyToComment: PropTypes.func.isRequired,
  forumPostDeleteReplyToComment: PropTypes.func.isRequired,
  sendNotif: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  forumPostDeleteComment,
  forumPostEditComment,
  forumPostReplyToComment,
  forumPostDeleteReplyToComment,
  sendNotif,
})(ForumComment);

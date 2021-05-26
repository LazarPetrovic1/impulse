import React, { useState, useEffect, useContext } from "react";
import { LanguageContext } from '../../contexts/LanguageContext';
import ShortLogo from '../../styled/Logo/ShortLogo';
import DashCenter from '../../styled/DashCenter';
import {
  forumPostDeleteComment,
  forumPostEditComment,
  forumPostReplyToComment,
  forumPostDeleteReplyToComment,
  impulsifyForumPostComment as impulsify,
  likeForumPostComment as like,
  dislikeForumPostComment as dislike
} from "../../actions/forum";
import { sendNotif } from "../../actions/notifs";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ForumReply from "./ForumReply";
import ForumEditComment from "./ForumMisc/ForumEditComment";
import ForumCommentControls from "./ForumMisc/ForumCommentControls";
import ForumReplyInput from './inputs/ForumReplyInput';

function ForumComment({
  comment,
  auth: { user },
  forumPostDeleteComment,
  postid,
  forumPostEditComment,
  forumPostReplyToComment,
  forumPostDeleteReplyToComment,
  sendNotif,
  forum: { post },
  impulsify,
  like,
  dislike
}) {
  const [reply, setReply] = useState(false);
  const [edit, setEdit] = useState(false);
  // eslint-disable-next-line
  const [replyText, setReplyText] = useState("");
  const [commentBody, setCommentBody] = useState(comment);
  const onEdit = (value) => setCommentBody({ ...comment, content: value });
  const [liked, setLiked] = useState(null);
  const { language } = useContext(LanguageContext);

  const setLikability = (val) => {
    const id = comment._id;
    const likerId = user._id;
    const ownedById = post.user;
    if (liked === val) setLiked(null);
    else setLiked(val);
    switch (val) {
      case "like":
        like(postid, id, likerId);
        if (ownedById !== likerId) {
          sendNotif({
            userId: post.user,
            type: "like",
            language,
            username: user.username,
            name: `${user.firstName} ${user.lastName}`,
            url: `/forum/forum-post/${post._id}`,
          });
        }
        break;
      case "dislike":
        dislike(postid, id, likerId);
        if (ownedById !== likerId) {
          sendNotif({
            userId: post.user,
            type: "dislike",
            language: localStorage.language,
            username: user.username,
            name: `${user.firstName} ${user.lastName}`,
            url: `/forum/forum-post/${post._id}`,
          });
        }
        break;
      case "impulse":
        impulsify(postid, id, likerId);
        if (ownedById !== likerId) {
          sendNotif({
            userId: post.user,
            type: "impulse",
            language: localStorage.language,
            username: user.username,
            name: `${user.firstName} ${user.lastName}`,
            url: `/forum/forum-post/${post._id}`,
          });
        }
        break;
      default:
        return;
    }
  };

  useEffect(() => {
    if (comment && user && user._id) {
      if (comment.judgements.filter((jud) => jud.user === user._id).length > 0) {
        setLiked("dislike");
      } else if (
        comment.endorsements.filter((end) => end.user === user._id).length > 0
      ) {
        setLiked("like");
      } else if (
        comment.impulsions.filter((imp) => imp.user === user._id).length > 0
      ) {
        setLiked("impulse");
      }
    }
    // eslint-disable-next-line
  }, [comment]);

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
          <ForumReplyInput
            comment={comment}
            postId={postid}
            commentId={comment._id}
            setReply={setReply}
          />
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
      <DashCenter
        display="block"
        maxw="1300px"
        style={{ pointerEvents: "all" }}
      >
        <div className="d-flex justify-content-between">
          <div className="d-flex">
            <div className="position-relative">
              <i
                onClick={() => setLikability("like")}
                className={`fas fa-plus fa-2x p-3 pointer ${
                  liked === "like" && "text-success"
                }`}
              />
              <span style={{ fontSize: "2.5rem" }} className="text-success">
                {comment.endorsements && comment.endorsements.length}
              </span>
            </div>
            <div className="position-relative">
              <i
                onClick={() => setLikability("dislike")}
                className={`fas fa-minus fa-2x p-3 pointer ${
                  liked === "dislike" && "text-danger"
                }`}
              />
              <span style={{ fontSize: "2.5rem" }} className="text-danger">
                {comment.judgements && comment.judgements.length}
              </span>
            </div>
          </div>
          <div className="position-relative">
            <ShortLogo
              className={`px-3 pb-3 pointer`}
              onClick={() => setLikability("impulse")}
              liked={liked}
            />
            <span style={{ fontSize: "2.5rem" }} className="text-primary">
              {comment.impulsions && comment.impulsions.length}
            </span>
          </div>
        </div>
      </DashCenter>
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
  sendNotif: PropTypes.func.isRequired,forum: PropTypes.object.isRequired,
  impulsify: PropTypes.func.isRequired,
  like: PropTypes.func.isRequired,
  dislike: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  forum: state.forum
});

export default connect(mapStateToProps, {
  forumPostDeleteComment,
  forumPostEditComment,
  forumPostReplyToComment,
  forumPostDeleteReplyToComment,
  sendNotif,
  impulsify,
  like,
  dislike
})(ForumComment);

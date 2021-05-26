import React, { useState, useEffect, useContext } from "react";
import { connect } from "react-redux";
import {
  forumPostDeleteReplyToComment,
  impulsifyReplyToForumPostComment as impulsify,
  likeReplyToForumPostComment as like,
  dislikeReplyToForumPostComment as dislike
} from "../../actions/forum";
import PropTypes from "prop-types";
import MarkdownRenderer from "react-markdown-renderer";
import DeleteIcon from "../utils/icons/DeleteIcon";
import EditIcon from "../utils/icons/EditIcon";
import ForumReplyEditInput from './inputs/ForumReplyEditInput';
import { LanguageContext } from '../../contexts/LanguageContext';
import ShortLogo from '../../styled/Logo/ShortLogo';
import DashCenter from '../../styled/DashCenter';
import { sendNotif } from "../../actions/notifs";

function ForumReply({
  postid,
  commentid,
  reply,
  auth: { user },
  forumPostDeleteReplyToComment,
  impulsify,
  like,
  dislike,
  sendNotif
}) {
  const [replyText, setReplyText] = useState(reply.content);
  const [isReply, setIsReply] = useState(false);
  const [liked, setLiked] = useState(null);
  const { language } = useContext(LanguageContext);

  const setLikability = (val) => {
    const id = reply._id;
    const likerId = user._id;
    const ownedById = reply.user;
    if (liked === val) setLiked(null);
    else setLiked(val);
    switch (val) {
      case "like":
        like(postid, commentid, id, likerId);
        if (ownedById !== likerId) {
          sendNotif({
            userId: reply.user,
            type: "like",
            language,
            username: user.username,
            name: `${user.firstName} ${user.lastName}`,
            url: `/forum/forum-post/${reply._id}`,
          });
        }
        break;
      case "dislike":
        dislike(postid, commentid, id, likerId);
        if (ownedById !== likerId) {
          sendNotif({
            userId: reply.user,
            type: "dislike",
            language: localStorage.language,
            username: user.username,
            name: `${user.firstName} ${user.lastName}`,
            url: `/forum/forum-post/${reply._id}`,
          });
        }
        break;
      case "impulse":
        impulsify(postid, commentid, id, likerId);
        if (ownedById !== likerId) {
          sendNotif({
            userId: reply.user,
            type: "impulse",
            language: localStorage.language,
            username: user.username,
            name: `${user.firstName} ${user.lastName}`,
            url: `/forum/forum-post/${reply._id}`,
          });
        }
        break;
      default:
        return;
    }
  };

  useEffect(() => {
    if (reply && user && user._id) {
      (async function() {
        try {
          if (reply.judgements.filter((jud) => jud.user === user._id).length > 0) setLiked("dislike");
          else if (
            reply.endorsements.filter((end) => end.user === user._id).length > 0
          ) setLiked("like");
          else if (
            reply.impulsions.filter((imp) => imp.user === user._id).length > 0
          ) setLiked("impulse");
        } catch (e) {
          console.warn(e.message);
        }
      }())
    }
    // eslint-disable-next-line
  }, [reply]);

  return (
    <div className="car card-body ml-5 border border-secondary rounded">
      <MarkdownRenderer markdown={replyText} />
      <p className="text-muted text-right">-by {reply.by}</p>
      {reply.user === user._id && (
        <button
          className="btn btn-danger mx-2 p-0"
          title="Delete reply to post"
          onClick={() =>
            forumPostDeleteReplyToComment(postid, commentid, reply._id)
          }
        >
          <DeleteIcon width={38} height={36} />
        </button>
      )}
      {reply.user === user._id && (
        <button
          className="btn btn-secondary mx-2 p-0"
          onClick={() => setIsReply(true)}
        >
          <EditIcon width={38} height={36} />
        </button>
      )}
      {isReply && (
        <ForumReplyEditInput
          postId={postid}
          commentId={commentid}
          replyId={reply._id}
          setIsReply={setIsReply}
          replyText={replyText}
          setReplyText={setReplyText}
          replyTextMain={reply.content}
        />
      )}
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
                {reply.endorsements && reply.endorsements.length}
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
                {reply.judgements && reply.judgements.length}
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
              {reply.impulsions && reply.impulsions.length}
            </span>
          </div>
        </div>
      </DashCenter>
    </div>
  );
}

ForumReply.propTypes = {
  auth: PropTypes.object.isRequired,
  forumPostDeleteReplyToComment: PropTypes.func.isRequired,
  impulsify: PropTypes.func.isRequired,
  like: PropTypes.func.isRequired,
  dislike: PropTypes.func.isRequired,
  sendNotif: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  forumPostDeleteReplyToComment,
  impulsify,
  like,
  dislike,
  sendNotif
})(ForumReply);

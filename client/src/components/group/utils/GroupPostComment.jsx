import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { getUserByUsername } from "../../../utils/users";
import {
  updateComment,
  deleteComment,
  replyToComment,
  impulsifyComment,
  likeComment,
  dislikeComment,
} from "../../../actions/group";
import { sendNotif } from "../../../actions/notifs";
import Moment from "react-moment";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import GroupPostCommentReply from "./GroupPostCommentReply";
import DeleteIcon from "../../utils/icons/DeleteIcon";
import EditIcon from "../../utils/icons/EditIcon";
import { LanguageContext } from "../../../contexts/LanguageContext";
import ShortLogo from "../../../styled/Logo/ShortLogo";
import GroupEditCommentInput from '../inputs/GroupEditCommentInput';
import GroupPostCommentInput from '../inputs/GroupPostCommentInput';

function GroupPostComment({
  comment,
  postId,
  deleteComment,
  replyToComment,
  auth: { user },
  group: { group },
  updateComment,
  sendNotif,
  impulsifyComment,
  likeComment,
  dislikeComment
}) {
  const { language } = useContext(LanguageContext);
  const [liked, setLiked] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [byUser, setByUser] = useState(null);
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
  useEffect(() => {
    (async function () {
      try {
        const res = await getUserByUsername(comment.name);
        await setByUser(res);
      } catch (e) {
        console.warn("Error, dude");
      }
    })();
    // eslint-disable-next-line
  }, []);

  const setLikability = (val) => {
    const id = comment._id;
    const likerId = user._id;
    const ownedById = comment.user;

    if (liked === val) setLiked(null);
    else setLiked(val);
    switch (val) {
      case "like":
        likeComment(group._id, postId, id, likerId);
        if (ownedById !== likerId) {
          sendNotif({
            userId: ownedById,
            type: "like",
            language,
            username: user.username,
            name: `${user.firstName} ${user.lastName}`,
            url: `/groups/${group._id}/${postId}`,
          });
        }
        break;
      case "dislike":
        dislikeComment(group._id, postId, id, likerId);
        if (ownedById !== likerId) {
          sendNotif({
            userId: ownedById,
            type: "dislike",
            language: localStorage.language,
            username: user.username,
            name: `${user.firstName} ${user.lastName}`,
            url: `/groups/${group._id}/${postId}`,
          });
        }
        break;
      case "impulse":
        impulsifyComment(group._id, postId, id, likerId);
        if (ownedById !== likerId) {
          sendNotif({
            userId: ownedById,
            type: "impulse",
            language: localStorage.language,
            username: user.username,
            name: `${user.firstName} ${user.lastName}`,
            url: `/groups/${group._id}/${postId}`,
          });
        }
        break;
      default:
        return;
    }
  };

  return comment && (
    <section
      className="ml-auto my-5 position-relative"
      style={{ pointerEvents: "all" }}
    >
      <div>
        <div className="d-flex align-items-center">
          {byUser && (
            <img
              src={
                byUser.profileImages.length > 0
                  ? byUser.profileImages[byUser.profileImages.length - 1].url
                  : `https://robohash.org/${byUser._id}?set=set4&size=50x50`
              }
              alt={
                byUser
                  ? `${byUser.firstName} ${byUser.lastName}`
                  : "Waiting for data to load"
              }
              className="rounded-circle mr-4"
              style={{ width: "50px", height: "50px" }}
            />
          )}
          <h3 className="m-0">
            <Link
              style={{ textDecoration: "none", color: "#eee" }}
              to={`/social/profile/${comment.user}`}
            >
              @{comment.name}
            </Link>
          </h3>
        </div>
      </div>
      <div className="mt-3 border-bottom">
        {isEditing ? (
          <GroupEditCommentInput setIsEditing={setIsEditing} combod={comment.text} groupId={group._id} postId={postId} commentId={comment._id} />
        ) : (
          <p>{comment.text}</p>
        )}
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
        <p className="m-0 text-right font-weight-bold">
          <span className="badge badge-secondary">
            <Moment format="DD. MMM YYYY">{comment.date}</Moment>
          </span>
        </p>
      </div>
      {comment.user === user._id && (
        <div
          style={{ top: "1rem", right: "1rem" }}
          className="position-absolute"
        >
          {isReplying ? (
            <button
              onClick={() => setIsReplying(false)}
              className="btn btn-dark btn-lg mx-2"
            >
              <i className="fas fa-times" />
            </button>
          ) : (
            <button
              onClick={() => setIsReplying(true)}
              className="btn btn-primary btn-lg mx-2"
            >
              <i className="fas fa-plus" />
            </button>
          )}
          {isEditing ? (
            <button
              onClick={() => setIsEditing(false)}
              className="btn btn-dark btn-lg mx-2"
            >
              <i className="fas fa-times" />
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="btn btn-secondary btn-lg mx-2 p-0"
              style={{ paddingRight: "12px" }}
            >
              <EditIcon width={49} height={46} />
            </button>
          )}
          <button
            className="btn btn-danger btn-lg mx-2 p-0"
            onClick={() => deleteComment(group._id, postId, comment._id)}
          >
            <DeleteIcon width={49} height={46} />
          </button>
        </div>
      )}
      {isReplying && (
        <GroupPostCommentInput setIsReplying={setIsReplying} groupId={group._id} postId={postId} commentId={comment._id} />
      )}
      {comment.replies.map((reply) => (
        <GroupPostCommentReply
          key={reply._id}
          postId={postId}
          commentId={comment._id}
          reply={reply}
        />
      ))}
    </section>
  );
}

GroupPostComment.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  replyToComment: PropTypes.func.isRequired,
  updateComment: PropTypes.func.isRequired,
  group: PropTypes.object.isRequired,
  sendNotif: PropTypes.func.isRequired,
  impulsifyComment: PropTypes.func.isRequired,
  likeComment: PropTypes.func.isRequired,
  dislikeComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  group: state.group,
});

export default connect(mapStateToProps, {
  deleteComment,
  replyToComment,
  updateComment,
  sendNotif,
  impulsifyComment,
  likeComment,
  dislikeComment
})(GroupPostComment);

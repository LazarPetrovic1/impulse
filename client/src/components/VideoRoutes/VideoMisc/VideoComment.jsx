import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { getUserByUsername } from "../../../utils/users";
import {
  videoDeleteComment,
  videoReplyToComment,
  videoEditComment,
  likeComment as like,
  dislikeComment as dislike,
  impulsifyComment as impulsify,
} from "../../../actions/video";
import Moment from "react-moment";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import VideoCommentReply from "./VideoCommentReply";
import DeleteIcon from "../../utils/icons/DeleteIcon";
import EditIcon from "../../utils/icons/EditIcon";
import { LanguageContext } from "../../../contexts/LanguageContext";
import { sendNotif } from "../../../actions/notifs";
import ShortLogo from "../../../styled/Logo/ShortLogo";

function VideoComment({
  comment,
  videoId,
  videoDeleteComment,
  videoReplyToComment,
  auth: { user },
  match,
  videoEditComment,
  like,
  dislike,
  impulsify,
  sendNotif
}) {
  const [liked, setLiked] = useState(null);
  const { language } = useContext(LanguageContext);
  const [reply, setReply] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [commentBody, setCommentBody] = useState(comment.text);
  const [isReplying, setIsReplying] = useState(false);
  const [byUser, setByUser] = useState(null);
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

  const onSubmit = async (e) => {
    e.preventDefault();
    await videoReplyToComment(videoId, comment._id, reply);
    await setReply("");
  };

  const updateComment = async (e) => {
    e.preventDefault();
    await videoEditComment(videoId, comment._id, commentBody);
    await setIsEditing(false);
  };

  const setLikability = (val) => {
    const id = comment._id;
    const likerId = user._id;
    const ownedById = comment.user;

    if (liked === val) setLiked(null);
    else setLiked(val);
    switch (val) {
      case "like":
        like(videoId, id, likerId);
        if (ownedById !== likerId) {
          sendNotif({
            userId: comment.user,
            type: "like",
            language,
            username: user.username,
            name: `${user.firstName} ${user.lastName}`,
            url: `/videos/${videoId}`,
          });
        }
        break;
      case "dislike":
        dislike(videoId, id, likerId);
        if (ownedById !== likerId) {
          sendNotif({
            userId: comment.user,
            type: "dislike",
            language: localStorage.language,
            username: user.username,
            name: `${user.firstName} ${user.lastName}`,
            url: `/videos/${videoId}`,
          });
        }
        break;
      case "impulse":
        impulsify(videoId, id, likerId);
        if (ownedById !== likerId) {
          sendNotif({
            userId: comment.user,
            type: "impulse",
            language: localStorage.language,
            username: user.username,
            name: `${user.firstName} ${user.lastName}`,
            url: `/videos/${videoId}`,
          });
        }
        break;
      default:
        return;
    }
  };

  return (
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
          <form onSubmit={updateComment} className="d-flex mt-4">
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
        ) : (
          <p>{comment.text}</p>
        )}
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
            onClick={() => videoDeleteComment(videoId, comment._id)}
          >
            <DeleteIcon width={49} height={46} />
          </button>
        </div>
      )}
      {isReplying && (
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
      )}
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
      {comment.replies.map((reply) => (
        <VideoCommentReply
          key={reply._id}
          videoId={videoId}
          commentId={comment._id}
          reply={reply}
        />
      ))}
    </section>
  );
}

VideoComment.propTypes = {
  videoDeleteComment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  videoReplyToComment: PropTypes.func.isRequired,
  videoEditComment: PropTypes.func.isRequired,
  like: PropTypes.func.isRequired,
  dislike: PropTypes.func.isRequired,
  impulsify: PropTypes.func.isRequired,
  sendNotif: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  videoDeleteComment,
  videoReplyToComment,
  videoEditComment,
  like,
  dislike,
  impulsify,
  sendNotif
})(VideoComment);

import React, { useState, useEffect, useContext, Fragment } from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";
import { getUserByUsername } from "../../utils/users";
import ShortLogo from "../../styled/Logo/ShortLogo";
import { connect } from "react-redux";
import {
  impulsifyImageComment as impulsify,
  likeImageComment as like,
  dislikeImageComment as dislike,
  imagePostReplyToComment as addReply,
  editImageComment as editComment,
  deleteComment,
  getRepliesToComment,
} from "../../actions/image";
import { sendNotif } from "../../actions/notifs";
import { LanguageContext } from "../../contexts/LanguageContext";
import PropTypes from "prop-types";
import DeleteIcon from "../utils/icons/DeleteIcon";
import EditIcon from "../utils/icons/EditIcon";
import Reply from "./Reply";
import { REPLY_DELIMITER } from "../../utils/nonReduxConstants";

function Comment({
  auth,
  comm,
  imgId,
  impulsify,
  like,
  dislike,
  addReply,
  editComment,
  deleteComment,
  getRepliesToComment,
}) {
  const [user, setUser] = useState({});
  const [liked, setLiked] = useState(null);
  const [reply, setReply] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [commentBody, setCommentBody] = useState(comm.text);
  const [isReplying, setIsReplying] = useState(false);
  const { language } = useContext(LanguageContext);
  const [page, setPage] = useState(1);
  const [hasMoreReplies, setHasMoreReplies] = useState(true);
  const [repliesLength, setRepliesLength] = useState(0);
  const [areRepliesHidden, setAreRepliesHidden] = useState(false);
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      (async function () {
        try {
          const res = await getUserByUsername(comm.name);
          await setUser(res);
        } catch (e) {
          console.warn("Error, dude");
        }
      })();
    }
    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (comm) {
      (async function () {
        try {
          if (comm.judgements.filter((jud) => jud.user === user._id).length > 0)
            setLiked("dislike");
          else if (
            comm.endorsements.filter((end) => end.user === user._id).length > 0
          )
            setLiked("like");
          else if (
            comm.impulsions.filter((imp) => imp.user === user._id).length > 0
          )
            setLiked("impulse");
        } catch (e) {
          console.warn(e.message);
        }
      })();
    }
    // eslint-disable-next-line
  }, [comm]);

  const onSubmit = async (e) => {
    e.preventDefault();
    await addReply(imgId, comm._id, reply);
    await setReply("");
  };

  const updateComment = async (e) => {
    e.preventDefault();
    await editComment(imgId, comm._id, commentBody);
    await setIsEditing(false);
  };

  const setLikability = (val) => {
    const id = comm._id;
    const likerId = user._id;
    const ownedById = comm.user;

    if (liked === val) setLiked(null);
    else setLiked(val);
    switch (val) {
      case "like":
        like(imgId, id, likerId);
        if (ownedById !== likerId) {
          sendNotif({
            userId: comm.user,
            type: "like",
            language,
            username: user.username,
            name: `${user.firstName} ${user.lastName}`,
            url: `/videos/${imgId}`,
          });
        }
        break;
      case "dislike":
        dislike(imgId, id, likerId);
        if (ownedById !== likerId) {
          sendNotif({
            userId: comm.user,
            type: "dislike",
            language: localStorage.language,
            username: user.username,
            name: `${user.firstName} ${user.lastName}`,
            url: `/videos/${imgId}`,
          });
        }
        break;
      case "impulse":
        impulsify(imgId, id, likerId);
        if (ownedById !== likerId) {
          sendNotif({
            userId: comm.user,
            type: "impulse",
            language: localStorage.language,
            username: user.username,
            name: `${user.firstName} ${user.lastName}`,
            url: `/videos/${imgId}`,
          });
        }
        break;
      default:
        return;
    }
  };

  useEffect(() => {
    (async function () {
      try {
        if (!hasMoreReplies) {
          return;
        }
        if (page === 1 && comm.replies.length > 0) {
          return;
        }
        const res = await getRepliesToComment(
          imgId,
          comm._id,
          page,
          REPLY_DELIMITER
        );
        await setHasMoreReplies(res.hasMore);
        await setRepliesLength(res.repliesLength);
      } catch (e) {
        console.warn(e.message);
      }
    })();
    // eslint-disable-next-line
  }, [page]);

  return user && comm && Object.keys(comm).length > 0 ? (
    <section
      className="my-5 position-relative"
      style={{ pointerEvents: "all" }}
    >
      <div>
        <div className="d-flex align-items-center">
          {user && (
            <img
              src={
                Array.isArray(user.profileImages) &&
                user.profileImages.length > 0
                  ? user.profileImages[user.profileImages.length - 1].url
                  : `https://robohash.org/${user._id}?set=set4&size=50x50`
              }
              alt={
                user
                  ? `${user.firstName} ${user.lastName}`
                  : "Waiting for data to load"
              }
              className="rounded-circle mr-4"
              style={{ width: "50px", height: "50px" }}
            />
          )}
          <h3 className="m-0">
            <Link
              style={{ textDecoration: "none", color: "#eee" }}
              to={`/social/profile/${comm.user}`}
            >
              @{comm.name}
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
          <p>{comm.text}</p>
        )}
        <p className="m-0 text-right font-weight-bold">
          <span className="badge badge-secondary">
            <Moment format="DD. MMM YYYY">{comm.date}</Moment>
          </span>
        </p>
      </div>
      <div style={{ top: "1rem", right: "1rem" }} className="position-absolute">
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
        {comm.user === auth.user._id && (
          <Fragment>
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
              onClick={() => deleteComment(imgId, comm._id)}
            >
              <DeleteIcon width={49} height={46} />
            </button>
          </Fragment>
        )}
      </div>
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
      <button
        className="btn btn-block pt-2"
        style={{ background: "transparent", color: "white" }}
        onClick={() => setPage(page + 1)}
      >
        Load more replies{" "}
        {page > 1 &&
          repliesLength > 0 &&
          `${comm.replies.length}/${repliesLength}`}
      </button>
      <button
        className="btn btn-block pt-2"
        style={{ background: "transparent", color: "white" }}
        onClick={() => setAreRepliesHidden(!areRepliesHidden)}
      >
        {areRepliesHidden ? "Expand" : "Hide"} replies
      </button>
      <div className="d-flex">
        <div className="position-relative">
          <i
            onClick={() => setLikability("like")}
            className={`fas fa-plus fa-2x p-3 pointer ${
              liked === "like" && "text-success"
            }`}
          />
          <span style={{ fontSize: "2.5rem" }} className="text-success">
            {comm.endorsements && comm.endorsements.length}
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
            {comm.judgements && comm.judgements.length}
          </span>
        </div>
        <div className="position-relative">
          <ShortLogo
            className={`px-3 pb-3 pointer`}
            onClick={() => setLikability("impulse")}
            liked={liked}
          />
          <span style={{ fontSize: "2.5rem" }} className="text-primary">
            {comm.impulsions && comm.impulsions.length}
          </span>
        </div>
      </div>
      {comm.replies.map((reply) => (
        <Reply
          key={reply._id}
          imgId={imgId}
          commentId={comm._id}
          reply={reply}
        />
      ))}
    </section>
  ) : (
    <Spinner />
  );
}

Comment.propTypes = {
  auth: PropTypes.object.isRequired,
  comm: PropTypes.object.isRequired,
  imgId: PropTypes.string.isRequired,
  impulsify: PropTypes.func.isRequired,
  like: PropTypes.func.isRequired,
  dislike: PropTypes.func.isRequired,
  addReply: PropTypes.func.isRequired,
  editComment: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
  getRepliesToComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  impulsify,
  like,
  dislike,
  addReply,
  editComment,
  deleteComment,
  getRepliesToComment,
})(Comment);

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getUserByUsername } from "../../../utils/users";
import {
  updateComment,
  deleteComment,
  replyToComment,
} from "../../../actions/group";
import Moment from "react-moment";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import GroupPostCommentReply from "./GroupPostCommentReply";
import DeleteIcon from "../../utils/icons/DeleteIcon";
import EditIcon from "../../utils/icons/EditIcon";

// _id(pin):"60785df557141923c4c5a682"
// text(pin):"Hello"
// name(pin):"blabla"
// user(pin):"60118e7bc52e5c0399baec97"
// date(pin):"2021-04-15T15:38:29.760Z"
// replies(pin):

function GroupPostComment({
  comment,
  postId,
  deleteComment,
  replyToComment,
  auth: { user },
  group: { group },
  updateComment,
}) {
  const [reply, setReply] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [commentBody, setCommentBody] = useState(comment.text);
  const [isReplying, setIsReplying] = useState(false);
  const [byUser, setByUser] = useState(null);
  useEffect(() => {
    (async function () {
      await console.log("KAMENT", comment);
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
    await replyToComment(group._id, postId, comment._id, reply);
    await setReply("");
  };

  const update = async (e) => {
    e.preventDefault();
    await updateComment(group._id, postId, comment._id, commentBody);
    await setIsEditing(false);
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
          <form onSubmit={update} className="d-flex mt-4">
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
            onClick={() => deleteComment(group._id, postId, comment._id)}
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
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  group: state.group,
});

export default connect(mapStateToProps, {
  deleteComment,
  replyToComment,
  updateComment,
})(GroupPostComment);

import React, { useState, useEffect } from "react";
import { getUserByUsername } from "../../../utils/users";
import Moment from "react-moment";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateReply, deleteReply } from "../../../actions/group";
import { Link } from "react-router-dom";
import DeleteIcon from "../../utils/icons/DeleteIcon";
import EditIcon from "../../utils/icons/EditIcon";

function GroupPostCommentReply({
  postId,
  commentId,
  reply,
  auth: { user },
  group: { group },
  deleteReply,
  updateReply,
}) {
  const [byUser, setByUser] = useState(null);
  const [replyBody, setReplyBody] = useState(reply.content);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    (async function () {
      try {
        const res = await getUserByUsername(reply.by);
        await setByUser(res);
      } catch (e) {
        console.warn("Error, dude");
      }
    })();
    // eslint-disable-next-line
  }, []);

  const update = async (e) => {
    e.preventDefault();
    await console.log("SVEEEE", {
      groupId: group._id,
      postId,
      commentId,
      replyId: reply._id,
    });
    await updateReply(group._id, postId, commentId, reply._id, replyBody);
    await setIsEditing(false);
  };

  return (
    <section
      className="ml-auto my-3 position-relative"
      style={{ width: "85%", pointerEvents: "all" }}
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
              to={`/social/profile/${reply.user}`}
            >
              @{reply.by}
            </Link>
          </h3>
        </div>
      </div>
      <div className="mt-3 border-bottom">
        {isEditing ? (
          <form onSubmit={update} className="d-flex mt-4">
            <input
              type="text"
              value={replyBody}
              onChange={(e) => setReplyBody(e.target.value)}
              className="form-control"
              placeholder="Type a message"
            />
            <button className="btn btn-secondary" type="submit">
              <i className="fas fa-paper-plane" />
            </button>
          </form>
        ) : (
          <p>{reply.content}</p>
        )}
        <p className="m-0 text-right font-weight-bold">
          <span className="badge badge-secondary">
            <Moment format="DD. MMM YYYY">{reply.date}</Moment>
          </span>
        </p>
      </div>
      <div style={{ top: "1rem", right: "1rem" }} className="position-absolute">
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
          onClick={() => deleteReply(group._id, postId, commentId, reply._id)}
        >
          <DeleteIcon width={49} height={46} />
        </button>
      </div>
    </section>
  );
}

GroupPostCommentReply.propTypes = {
  auth: PropTypes.object.isRequired,
  deleteReply: PropTypes.func.isRequired,
  updateReply: PropTypes.func.isRequired,
  group: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  group: state.group,
});

export default connect(mapStateToProps, {
  deleteReply,
  updateReply,
})(GroupPostCommentReply);

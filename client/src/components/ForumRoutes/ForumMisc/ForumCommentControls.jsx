import React from "react";
import { forumPostDeleteComment } from "../../../actions/forum";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import DeleteIcon from "../../utils/icons/DeleteIcon";
import EditIcon from "../../utils/icons/EditIcon";

function ForumCommentControls({
  reply,
  edit,
  setReply,
  setEdit,
  commentuser,
  postid,
  commentid,
  forumPostDeleteComment,
  auth,
}) {
  return (
    !reply &&
    !edit && (
      <div className="text-right mb-4">
        <button
          title="Reply"
          onClick={() => setReply(true)}
          className="btn btn-primary mx-2"
        >
          <i className="fas fa-plus" />
        </button>
        <button
          title="Edit"
          className="btn btn-secondary mx-2 p-0"
          onClick={() => setEdit(true)}
        >
          <EditIcon width={42} height={36} />
        </button>
        {auth.user._id === commentuser && (
          <button
            title="Delete"
            className="btn btn-danger mx-2 p-0"
            onClick={() => forumPostDeleteComment(postid, commentid)}
          >
            <DeleteIcon width={42} height={36} />
          </button>
        )}
      </div>
    )
  );
}

ForumCommentControls.propTypes = {
  auth: PropTypes.object.isRequired,
  forumPostDeleteComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { forumPostDeleteComment })(
  ForumCommentControls
);

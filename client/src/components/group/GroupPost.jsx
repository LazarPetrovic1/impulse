import React, { useEffect, useState } from "react";
import { getUserById } from "../../utils/users";
import { Link } from "react-router-dom";
import MarkdownRenderer from "react-markdown-renderer";
import GroupMediaItem from "./GroupMediaItem";
import Spinner from "../layout/Spinner";
import Modal from "../utils/Modal";
import { deletePostInGroup } from "../../actions/group";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import DeleteIcon from "../utils/icons/DeleteIcon";
// date(pin):"2021-03-22T11:50:10.649Z"
// comments(pin):
// endorsements(pin):
// judgements(pin):
// impulsions

function GroupPost({ post, deletePostInGroup, groupid, group: { group } }) {
  const [user, setUser] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  useEffect(() => {
    (async function () {
      try {
        const gotPerson = await getUserById(post.user);
        await setUser(gotPerson);
      } catch (e) {
        console.warn(e.message);
      }
    })();
    // eslint-disable-next-line
  }, []);
  const onClose = () => setShowDialog(false);
  const removePost = async (e) => {
    await deletePostInGroup(groupid, post._id);
    await onClose();
  };
  return user && group ? (
    <section
      className="w-100 position-relative"
      onMouseEnter={() => setShowDelete(true)}
      onMouseLeave={() => setShowDelete(false)}
    >
      <div className="d-flex">
        <img
          src={`https://robohash.org/${user._id}?set=set4&size=40x40`}
          alt={`${user.firstName} ${user.lastName}`}
        />
        <h2 className="ml-3">
          <Link to={`/social/profile/${user._id}`}>
            {user.firstName} {user.lastName}
          </Link>
          &nbsp;
          <i
            className="fas fa-caret-right"
            style={{ color: "rgb(0, 123, 255)", fontSize: "30px" }}
          />
          &nbsp;
          <Link to={`/groups/${group._id}`}>{group.name}</Link>
        </h2>
      </div>
      <article className="mt-4 mb-2">
        {post.body && <MarkdownRenderer markdown={post.body} />}
        {post.isMedia &&
          post.media.map((med) => <GroupMediaItem key={med._id} media={med} />)}
      </article>
      {showDelete && (
        <button
          onClick={() => setShowDialog(true)}
          className="btn btn-danger position-absolute p-0"
          style={{ top: 0, right: 0 }}
        >
          <DeleteIcon width={38} height={36} />
        </button>
      )}
      <Modal
        title="Delete post"
        show={showDialog}
        onClose={onClose}
        provideOwnClosure
      >
        <article>
          <h3>Are you sure?</h3>
          <div className="d-flex justify-content-between mx-5 my-3">
            <button className="btn btn-success btn-lg" onClick={removePost}>
              Yes
            </button>
            <button className="btn btn-danger btn-lg" onClick={onClose}>
              No
            </button>
          </div>
        </article>
      </Modal>
    </section>
  ) : (
    <Spinner />
  );
}

const mapStateToProps = (state) => ({
  group: state.group,
});

GroupPost.propTypes = {
  post: PropTypes.object.isRequired,
  deletePostInGroup: PropTypes.func.isRequired,
  group: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { deletePostInGroup })(GroupPost);

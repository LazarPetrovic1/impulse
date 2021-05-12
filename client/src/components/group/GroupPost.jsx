import React, { useEffect, useState, useContext } from "react";
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
import DashCenter from "../../styled/DashCenter";
import {
  impulsePostInGroup as impulsify,
  likePostInGroup as like,
  dislikePostInGroup as dislike,
  commentGroupPost,
} from "../../actions/group";
import { sendNotif } from "../../actions/notifs";
import { LanguageContext } from "../../contexts/LanguageContext";
import ShortLogo from "../../styled/Logo/ShortLogo";
import GroupPostComment from "./utils/GroupPostComment";

// date(pin):"2021-03-22T11:50:10.649Z"
// comments(pin):
// endorsements(pin):
// judgements(pin):
// impulsions

function GroupPost({
  post,
  deletePostInGroup,
  groupid,
  group: { group },
  impulsify,
  like,
  dislike,
  sendNotif,
  commentGroupPost,
}) {
  const [user, setUser] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [liked, setLiked] = useState(null);
  const [comment, setComment] = useState("");
  const { language } = useContext(LanguageContext);
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
  useEffect(() => {
    if (post && user && user._id) {
      if (post.judgements.filter((jud) => jud.user === user._id).length > 0) {
        setLiked("dislike");
      } else if (
        post.endorsements.filter((end) => end.user === user._id).length > 0
      ) {
        setLiked("like");
      } else if (
        post.impulsions.filter((imp) => imp.user === user._id).length > 0
      ) {
        setLiked("impulse");
      }
    }
    // eslint-disable-next-line
  }, [post]);
  const onClose = () => setShowDialog(false);
  const removePost = async (e) => {
    await deletePostInGroup(groupid, post._id);
    await onClose();
  };
  const setLikability = (val) => {
    const id = post._id;
    const likerId = user._id;
    const ownedById = post.user;

    if (liked === val) setLiked(null);
    else setLiked(val);
    switch (val) {
      case "like":
        like(group._id, id, likerId);
        if (ownedById !== likerId) {
          sendNotif({
            userId: post.user,
            type: "like",
            language,
            username: user.username,
            name: `${user.firstName} ${user.lastName}`,
            url: `/groups/${groupid}/${post._id}`,
          });
        }
        break;
      case "dislike":
        dislike(group._id, id, likerId);
        if (ownedById !== likerId) {
          sendNotif({
            userId: post.user,
            type: "dislike",
            language: localStorage.language,
            username: user.username,
            name: `${user.firstName} ${user.lastName}`,
            url: `/groups/${groupid}/${post._id}`,
          });
        }
        break;
      case "impulse":
        impulsify(group._id, id, likerId);
        if (ownedById !== likerId) {
          sendNotif({
            userId: post.user,
            type: "impulse",
            language: localStorage.language,
            username: user.username,
            name: `${user.firstName} ${user.lastName}`,
            url: `/groups/${groupid}/${post._id}`,
          });
        }
        break;
      default:
        return;
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    // await addCommentTopost(comment, post._id);
    await commentGroupPost(group._id, post._id, comment);
    await setComment("");
  };
  return user && group ? (
    <section className="mb-5">
      <DashCenter
        display="block"
        maxw="1300px"
        style={{ pointerEvents: "all" }}
        className="mt-3 position-relative"
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
        <article className="mt-3 mb-2">
          {post.body && <MarkdownRenderer markdown={post.body} />}
          {post.isMedia &&
            post.media.map((med) => (
              <GroupMediaItem key={med._id} media={med} />
            ))}
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
      </DashCenter>
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
                {post.endorsements && post.endorsements.length}
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
                {post.judgements && post.judgements.length}
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
              {post.impulsions && post.impulsions.length}
            </span>
          </div>
        </div>
      </DashCenter>
      <DashCenter
        display="block"
        maxw="1300px"
        className="m-auto"
        style={{ pointerEvents: "all" }}
      >
        <form onSubmit={onSubmit} className="d-flex mt-4">
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="form-control"
            placeholder="Type a message"
          />
          <button className="btn btn-secondary" type="submit">
            <i className="fas fa-paper-plane" />
          </button>
        </form>
      </DashCenter>
      <DashCenter
        display="block"
        maxw="1300px"
        className="m-auto"
        style={{ pointerEvents: "all" }}
      >
        {post &&
          post.comments &&
          post.comments.length > 0 &&
          post.comments.map((comm) => (
            <GroupPostComment key={comm._id} comment={comm} postId={post._id} />
          ))}
      </DashCenter>
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
  impulsify: PropTypes.func.isRequired,
  like: PropTypes.func.isRequired,
  dislike: PropTypes.func.isRequired,
  sendNotif: PropTypes.func.isRequired,
  commentGroupPost: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
  deletePostInGroup,
  like,
  impulsify,
  dislike,
  sendNotif,
  commentGroupPost,
})(GroupPost);

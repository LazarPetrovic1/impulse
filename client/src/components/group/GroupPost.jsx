import React, { useEffect, useState, useContext } from "react";
import { getUserById } from "../../utils/users";
import { Link } from "react-router-dom";
import MarkdownRenderer from "react-markdown-renderer";
import GroupMediaItem from "./GroupMediaItem";
import Spinner from "../layout/Spinner";
import Modal from "../utils/Modal";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import DeleteIcon from "../utils/icons/DeleteIcon";
import DashCenter from "../../styled/DashCenter";
import {
  impulsePostInGroup as impulsify,
  likePostInGroup as like,
  dislikePostInGroup as dislike,
  commentGroupPost,
  deletePostInGroup,
  getPostComments,
} from "../../actions/group";
import { sendNotif } from "../../actions/notifs";
import { LanguageContext } from "../../contexts/LanguageContext";
import ShortLogo from "../../styled/Logo/ShortLogo";
import GroupPostComment from "./utils/GroupPostComment";
import GroupPostInput from "./inputs/GroupPostInput";
import { ColourContext } from "../../contexts/ColourContext";
import { COMMENT_DELIMITER } from "../../utils/nonReduxConstants";

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
  getPostComments,
}) {
  const [user, setUser] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [liked, setLiked] = useState(null);
  const { language } = useContext(LanguageContext);
  const { background } = useContext(ColourContext);
  const [page, setPage] = useState(1);
  const [hasMoreComments, setHasMoreComments] = useState(true);
  const [commentsLength, setCommentsLength] = useState(0);
  const [areCommentsHidden, setAreCommentsHidden] = useState(false);
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
    (async function () {
      try {
        if (!hasMoreComments) {
          return;
        }
        if (page === 1 && post.comments.length > 0) {
          return;
        }
        const res = await getPostComments(
          groupid,
          post._id,
          page,
          COMMENT_DELIMITER
        );
        await setHasMoreComments(res.hasMore);
        await setCommentsLength(res.commentsLength);
      } catch (e) {
        console.warn(e.message);
      }
    })();
    // eslint-disable-next-line
  }, [page]);
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
  return user && group && post ? (
    <section className="mb-5">
      <DashCenter
        background={background}
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
        background={background}
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
        background={background}
        display="block"
        maxw="1300px"
        className="m-auto"
        style={{ pointerEvents: "all" }}
      >
        <GroupPostInput groupId={group._id} postId={post._id} />
        <button
          className="btn btn-block pt-2"
          style={{ background: "transparent", color: "white" }}
          onClick={() => setPage(page + 1)}
        >
          Load more comments{" "}
          {page > 1 &&
            commentsLength > 0 &&
            `${post.comments.length}/${commentsLength}`}
        </button>
        <button
          className="btn btn-block pt-2"
          style={{ background: "transparent", color: "white" }}
          onClick={() => setAreCommentsHidden(!areCommentsHidden)}
        >
          {areCommentsHidden ? "Expand" : "Hide"} comments
        </button>
      </DashCenter>
      {!areCommentsHidden && (
        <DashCenter
          display="block"
          background={background}
          maxw="1300px"
          className="m-auto"
          style={{ pointerEvents: "all" }}
        >
          {post &&
            post.comments &&
            post.comments.length > 0 &&
            post.comments.map((comm) => (
              <GroupPostComment
                key={comm._id}
                comment={comm}
                postId={post._id}
              />
            ))}
        </DashCenter>
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
  impulsify: PropTypes.func.isRequired,
  like: PropTypes.func.isRequired,
  dislike: PropTypes.func.isRequired,
  sendNotif: PropTypes.func.isRequired,
  commentGroupPost: PropTypes.func.isRequired,
  getPostComments: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
  deletePostInGroup,
  like,
  impulsify,
  dislike,
  sendNotif,
  commentGroupPost,
  getPostComments,
})(GroupPost);

import React, { useState, useEffect, Fragment, useContext } from "react";
import { LanguageContext } from '../../contexts/LanguageContext';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import ForumComment from "./ForumComment";
import PropTypes from "prop-types";
import { getForumPostById, deleteForumPost } from "../../actions/forum";
import MarkdownRenderer from "react-markdown-renderer";
import Spinner from "../layout/Spinner";
import ForumDiscussion from "./ForumDiscussion";
import DeleteIcon from "../utils/icons/DeleteIcon";
import EditIcon from "../utils/icons/EditIcon";
import ChatIcon from "../utils/icons/ChatIcon";
import GoBackIcon from "../utils/icons/GoBackIcon";
import {
  impulsify,
  like,
  dislike
} from '../../actions/forum';
import { sendNotif } from '../../actions/notifs';
import ShortLogo from '../../styled/Logo/ShortLogo';
import DashCenter from '../../styled/DashCenter';

function ForumPost({
  match: { params },
  auth: { user },
  getForumPostById,
  deleteForumPost,
  forum,
  impulsify,
  like,
  dislike,
  sendNotif
}) {
  const { post, loading } = forum;
  const [isCommenting, setIsCommenting] = useState(false);
  const [liked, setLiked] = useState(null);
  const { language } = useContext(LanguageContext);

  const setLikability = (val) => {
    const id = params.id;
    const likerId = user._id;
    const ownedById = post.user;

    if (liked === val) setLiked(null);
    else setLiked(val);
    switch (val) {
      case "like":
        like(id, likerId);
        if (ownedById !== likerId) {
          sendNotif({
            userId: post.user,
            type: "like",
            language,
            username: user.username,
            name: `${user.firstName} ${user.lastName}`,
            url: `/forum/forum-post/${post._id}`,
          });
        }
        break;
      case "dislike":
        dislike(id, likerId);
        if (ownedById !== likerId) {
          sendNotif({
            userId: post.user,
            type: "dislike",
            language: localStorage.language,
            username: user.username,
            name: `${user.firstName} ${user.lastName}`,
            url: `/forum/forum-post/${post._id}`,
          });
        }
        break;
      case "impulse":
        impulsify(id, likerId);
        if (ownedById !== likerId) {
          sendNotif({
            userId: post.user,
            type: "impulse",
            language: localStorage.language,
            username: user.username,
            name: `${user.firstName} ${user.lastName}`,
            url: `/forum/forum-post/${post._id}`,
          });
        }
        break;
      default:
        return;
    }
  };

  useEffect(() => {
    getForumPostById(params.id);
    // eslint-disable-next-line
  }, [getForumPostById]);

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

  return post && !loading ? (
    <div className="container" style={{ pointerEvents: "all" }}>
      <h1 className="text-primary text-center display-3">{post.title}</h1>
      <p className="lead text-right display-4">- by {post.author}</p>
      <MarkdownRenderer markdown={post.body} />
      <div className="text-right mb-4">
        {user.username.toString() === post.author.toString() && (
          <Fragment>
            <Link
              className="btn btn-lg btn-primary mx-2 py-0"
              to={`/forum/forum-post/${post._id}/edit`}
            >
              <EditIcon width={40} height={46} text />
            </Link>
            <button
              className="btn btn-lg btn-danger mx-2 py-0"
              onClick={() => deleteForumPost(post._id)}
            >
              <DeleteIcon width={40} height={46} text />
            </button>
          </Fragment>
        )}
        <button
          className="btn btn-lg btn-info mx-2 py-0"
          onClick={() => setIsCommenting(!isCommenting)}
        >
          <ChatIcon
            width={40}
            height={46}
            text={isCommenting ? "cancel" : "discussion"}
          />
        </button>
        <Link className="btn btn-lg btn-secondary mx-2 py-0" to="/forum">
          <GoBackIcon width={40} height={46} text />
        </Link>
      </div>
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
      {isCommenting && (
        <ForumDiscussion params={params} setIsCommenting={setIsCommenting} />
      )}
      {post.comments &&
        post.comments.map((comment) => (
          <ForumComment comment={comment} postid={post._id} key={comment._id} />
        ))}
    </div>
  ) : (
    <Spinner />
  );
}

ForumPost.propTypes = {
  auth: PropTypes.object.isRequired,
  forum: PropTypes.object.isRequired,
  getForumPostById: PropTypes.func.isRequired,
  deleteForumPost: PropTypes.func.isRequired,
  impulsify: PropTypes.func.isRequired,
  like: PropTypes.func.isRequired,
  dislike: PropTypes.func.isRequired,
  sendNotif: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  forum: state.forum,
});

export default connect(mapStateToProps, {
  getForumPostById,
  deleteForumPost,
  impulsify,
  like,
  dislike,
  sendNotif
})(ForumPost);

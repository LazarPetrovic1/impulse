import React, { useEffect, useContext } from "react";
import ForumMenu from "./ForumMisc/ForumMenu";
import { Link } from "react-router-dom";
import ForumSearchBar from "./ForumMisc/ForumSearchBar";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { setAlert } from "../../actions/alert";
import {
  getAllForumPosts,
  forumPostDismiss,
  deleteForumPost,
  saveForumPost,
} from "../../actions/forum";
import MarkdownRenderer from "react-markdown-renderer";
import Spinner from "../layout/Spinner";
import { ThemeContext } from "../../contexts/ThemeContext";
import ForumGrid from "../../styled/Forum/ForumGrid";
import DeleteIcon from "../utils/icons/DeleteIcon";

function Forum({
  auth: { user },
  setAlert,
  getAllForumPosts,
  forum,
  forumPostDismiss,
  deleteForumPost,
  saveForumPost,
}) {
  const { posts, loading } = forum;
  const { isDarkTheme } = useContext(ThemeContext);

  useEffect(() => {
    getAllForumPosts();
  }, [getAllForumPosts]);

  const search = (text) => {
    // REWORK FUNCTION
    if (text === "") getAllForumPosts();
    else
      posts.filter((post) =>
        post.body.toLowerCase().includes(text.toLowerCase())
      );
  };

  const dismissForumPost = (id) => {
    forumPostDismiss(id, user.dismissedPosts);
    setAlert("Post dismissed! We will not show it to you again.", "success");
    window.location.reload();
  };

  const reset = (setter) => {
    setter("");
  };

  const nonDismissedPosts = posts.filter(
    (post) => !user.dismissedPosts.includes(post._id)
  );

  return loading ? (
    <Spinner />
  ) : (
    <div style={{ pointerEvents: "all" }}>
      <h1 className="text-center text-primary">
        Hey, {user.firstName}!
        <br />
        Here's something you might be interested in
      </h1>
      <div className="m-auto">
        <ForumSearchBar search={search} reset={reset} />
      </div>
      <ForumGrid>
        <ForumMenu />
        <div name="divider" />
        <div className="span-col-8 my-5">
          {nonDismissedPosts.map((post) => (
            <div key={post._id} className={isDarkTheme && "bg-overlay"}>
              <h1 className="text-primary p-3">
                <Link to={`/forum/forum-post/${post._id}`}>{post.title}</Link>
              </h1>
              <div className="p-3">
                <MarkdownRenderer markdown={post.body} />
              </div>
              <p className="text-right text-secondary lead mr-2">
                - by {post.author}
              </p>
              <div className="text-right my-3">
                <Link
                  to={`/forum/forum-post/${post._id}`}
                  title="Go to post"
                  className="btn btn-primary btn-lg mx-2"
                >
                  <i className="fas fa-arrow-right" />
                </Link>
                {user._id !== post.user ? (
                  <button
                    className="btn btn-danger btn-lg mx-2"
                    onClick={() => dismissForumPost(post._id)}
                    aria-label="Dismiss post"
                    title="Dismiss post"
                  >
                    <i className="fas fa-ban" />
                  </button>
                ) : (
                  <button
                    onClick={() => deleteForumPost(post._id)}
                    className="btn btn-danger btn-lg mx-2 p-0"
                    aria-label="Remove post"
                    title="Remove post"
                  >
                    <DeleteIcon width={54} height={46} />
                  </button>
                )}
                {post.savedBy.filter((sb) => sb.user === user._id).length >
                0 ? (
                  <button
                    onClick={() => saveForumPost(post._id)}
                    className="btn btn-light btn-lg mx-2"
                    aria-label="Unsave post"
                    title="Unsave post"
                  >
                    <i className="fas fa-star" />
                  </button>
                ) : (
                  <button
                    onClick={() => saveForumPost(post._id)}
                    className="btn btn-light btn-lg mx-2"
                    aria-label="Save post"
                    title="Save post"
                  >
                    <i className="far fa-star" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </ForumGrid>
    </div>
  );
}

Forum.propTypes = {
  auth: PropTypes.object.isRequired,
  setAlert: PropTypes.func.isRequired,
  forum: PropTypes.object.isRequired,
  forumPostDismiss: PropTypes.func.isRequired,
  deleteForumPost: PropTypes.func.isRequired,
  saveForumPost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  forum: state.forum,
});

export default connect(mapStateToProps, {
  setAlert,
  getAllForumPosts,
  forumPostDismiss,
  deleteForumPost,
  saveForumPost,
})(Forum);

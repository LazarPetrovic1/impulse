import React, { useEffect, useState, useContext, Fragment } from "react";
import { connect } from "react-redux";
import {
  getVideo,
  likeVideo as like,
  dislikeVideo as dislike,
  impulsifyVideo as impulsify,
  commentVideo,
  addView,
  videoGetComments,
} from "../../actions/video.js";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Moment from "react-moment";
import ShortLogo from "../../styled/Logo/ShortLogo";
import { getUserByUsername } from "../../utils/users";
import VideoComment from "./VideoMisc/VideoComment";
import { LanguageContext } from "../../contexts/LanguageContext";
import { sendNotif } from "../../actions/notifs";
import truncate from "truncate";
import ResponsiveVideo from "../../styled/Video/ResponsiveVideo";
import useTimeout from "../../hooks/useTimeout";
import ViewCounter from "../../styled/Video/ViewCounter";
import { COMMENT_DELIMITER } from "../../utils/nonReduxConstants";
import { genericposts } from "../../utils/langObject";

const { _loadmorecomments, _hidecomments, _expandcomments } = genericposts;
const maxw = { maxWidth: "1280px" };

function Video({
  match,
  video,
  like,
  dislike,
  impulsify,
  getVideo,
  auth: { user },
  sendNotif,
  commentVideo,
  history,
  addView,
  stopViews,
  videoGetComments,
}) {
  const [liked, setLiked] = useState(null);
  const [byUser, setByUser] = useState(null);
  const [comment, setComment] = useState("");
  const { language } = useContext(LanguageContext);
  const [seeMore, setSeeMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMoreComments, setHasMoreComments] = useState(true);
  const [commentsLength, setCommentsLength] = useState(0);
  const [areCommentsHidden, setAreCommentsHidden] = useState(false);

  useTimeout(() => {
    if (stopViews) {
      return;
    }
    addView(video && video.video && video.video._id);
  }, parseInt(video && video.video && video.video.meta && video.video.meta.duration) / 2);

  useEffect(() => {
    (async function () {
      try {
        await getVideo(match.params.id);
      } catch (e) {
        console.warn("Error, dude");
      }
    })();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    (async function () {
      try {
        if (video && video.video && video.video.by) {
          const res = await getUserByUsername(video.video.by);
          await setByUser(res);
        }
      } catch (e) {
        console.warn("Error, dude");
      }
    })();
    // eslint-disable-next-line
  }, [video && video.video && video.video.by, video]);

  useEffect(() => {
    if (video.video) {
      if (
        video.video.judgements.filter((jud) => jud.user === user._id).length > 0
      ) {
        setLiked("dislike");
      } else if (
        video.video.endorsements.filter((end) => end.user === user._id).length >
        0
      ) {
        setLiked("like");
      } else if (
        video.video.impulsions.filter((imp) => imp.user === user._id).length > 0
      ) {
        setLiked("impulse");
      }
    }
    // eslint-disable-next-line
  }, [video && video.video && video.video]);

  useEffect(() => {
    (async function () {
      try {
        if (video && video.video && Object.keys(video.video).length > 0) {
          if (!hasMoreComments) {
            return;
          }
          if (
            page === 1 &&
            video.video.comments.length &&
            video.video.comments.length > 0
          ) {
            return;
          }
          const res = await videoGetComments(
            video.video._id,
            page,
            COMMENT_DELIMITER
          );
          await console.log("REZ", res);
          await setHasMoreComments(res.hasMore);
          await setCommentsLength(res.commentsLength);
        }
      } catch (e) {
        console.warn(e.message);
      }
    })();
    // eslint-disable-next-line
  }, [page]);

  const setLikability = (val) => {
    const id = match.params.id;
    const likerId = user._id;
    const ownedById = video.video.user;

    if (liked === val) setLiked(null);
    else setLiked(val);
    switch (val) {
      case "like":
        like(id, likerId);
        if (ownedById !== likerId) {
          sendNotif({
            userId: video.video.user,
            type: "like",
            language,
            username: user.username,
            name: `${user.firstName} ${user.lastName}`,
            url: `/videos/${video.video._id}`,
          });
        }
        break;
      case "dislike":
        dislike(id, likerId);
        if (ownedById !== likerId) {
          sendNotif({
            userId: video.video.user,
            type: "dislike",
            language: localStorage.language,
            username: user.username,
            name: `${user.firstName} ${user.lastName}`,
            url: `/videos/${video.video._id}`,
          });
        }
        break;
      case "impulse":
        impulsify(id, likerId);
        if (ownedById !== likerId) {
          sendNotif({
            userId: video.video.user,
            type: "impulse",
            language: localStorage.language,
            username: user.username,
            name: `${user.firstName} ${user.lastName}`,
            url: `/videos/${video.video._id}`,
          });
        }
        break;
      default:
        return;
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await commentVideo(match.params.id, comment);
    await setComment("");
  };

  return (
    <div style={{ pointerEvents: "all" }} className="mb-5">
      {video.video && (
        <div style={maxw} className="m-auto">
          <div className="d-flex justify-content-center">
            <ResponsiveVideo src={video.video.url} type="video/*" />
          </div>
          <div className="d-flex">
            <div className="d-flex flex-column" style={{ flex: 1 }}>
              <h1 className="my-3">{video.video.name}</h1>
              <p className="font-weight-bold">
                <span className="badge badge-secondary">
                  <Moment format="DD. MMM YYYY">{video.video.date}</Moment>
                </span>
              </p>
              <hr />
            </div>
            <div className="d-flex flex-column">
              <section className="d-flex">
                <div className="position-relative">
                  <i
                    onClick={() => setLikability("like")}
                    className={`fas fa-plus fa-2x p-3 pointer ${
                      liked === "like" && "text-success"
                    }`}
                  />
                  <span style={{ fontSize: "2.5rem" }} className="text-success">
                    {video.video.endorsements &&
                      video.video.endorsements.length}
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
                    {video.video.judgements && video.video.judgements.length}
                  </span>
                </div>
                <div className="position-relative">
                  <ShortLogo
                    className={`px-3 pb-3 pointer`}
                    onClick={() => setLikability("impulse")}
                    liked={liked}
                  />
                  <span style={{ fontSize: "2.5rem" }} className="text-primary">
                    {video.video.impulsions && video.video.impulsions.length}
                  </span>
                </div>
              </section>
              <section>
                <ViewCounter className="text-right mb-0">
                  <span>
                    {parseInt(video.video.views) < 1 ? (
                      <Fragment>No views</Fragment>
                    ) : parseInt(video.video.views) === 1 ? (
                      <Fragment>1 view</Fragment>
                    ) : (
                      <Fragment>{parseInt(video.video.views)} views</Fragment>
                    )}
                  </span>
                </ViewCounter>
              </section>
            </div>
          </div>
          <div className="d-flex flex-column">
            {video.video.description && (
              <article>
                <div className="my-3 lead">
                  {seeMore
                    ? video.video.description
                    : truncate(video.video.description, 130)}
                </div>
                {video.video.description.length >= 130 && (
                  <button
                    className="btn btn-block btn-outline-secondary my-3 font-weight-bold"
                    onClick={() => setSeeMore(!seeMore)}
                    style={{ letterSpacing: "1.5px" }}
                  >
                    {seeMore ? "See less" : "See more"}
                  </button>
                )}
                {video.video.category && (
                  <h4 className="text-secondary my-3">
                    Category: {video.video.category}
                  </h4>
                )}
              </article>
            )}
          </div>
          <div className="shadow border border-secondary p-3 rounded">
            <Link
              style={{ textDecoration: "none", color: "#eee" }}
              to={`/social/profile/${video.video.user}`}
              className="d-flex align-items-center"
            >
              {byUser && (
                <img
                  src={
                    byUser.profileImages.length > 0
                      ? byUser.profileImages[byUser.profileImages.length - 1]
                          .url
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
              <h3 className="m-0">@{video.video.by}</h3>
            </Link>
          </div>
        </div>
      )}
      <div style={maxw} className="m-auto">
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
      </div>
      <div style={maxw} className="m-auto">
        <button
          className="btn btn-block pt-2"
          style={{ background: "transparent", color: "white" }}
          onClick={() => setPage(page + 1)}
        >
          {_loadmorecomments[language]}{" "}
          {page > 1 &&
            commentsLength > 0 &&
            `${video.video.comments.length}/${commentsLength}`}
        </button>
        <button
          className="btn btn-block pt-2"
          style={{ background: "transparent", color: "white" }}
          onClick={() => setAreCommentsHidden(!areCommentsHidden)}
        >
          {areCommentsHidden
            ? _expandcomments[language]
            : _hidecomments[language]}{" "}
          comments
        </button>
      </div>
      <div style={maxw} className="m-auto">
        {!areCommentsHidden &&
          video &&
          video.video &&
          video.video.comments &&
          video.video.comments.length > 0 &&
          video.video.comments.map((comm) => (
            <VideoComment
              key={comm._id}
              comment={comm}
              videoId={video.video._id}
            />
          ))}
      </div>
    </div>
  );
}

Video.propTypes = {
  auth: PropTypes.object.isRequired,
  getVideo: PropTypes.func.isRequired,
  video: PropTypes.object.isRequired,
  like: PropTypes.func.isRequired,
  dislike: PropTypes.func.isRequired,
  impulsify: PropTypes.func.isRequired,
  sendNotif: PropTypes.func.isRequired,
  commentVideo: PropTypes.func.isRequired,
  addView: PropTypes.func.isRequired,
  videoGetComments: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  video: state.video,
});

export default connect(mapStateToProps, {
  getVideo,
  like,
  dislike,
  impulsify,
  sendNotif,
  commentVideo,
  addView,
  videoGetComments,
})(Video);

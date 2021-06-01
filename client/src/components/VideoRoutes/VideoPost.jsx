import React, { useEffect, useState, useContext, Fragment } from "react";
import { connect } from "react-redux";
import {
  getVideo,
  likeVideo as like,
  dislikeVideo as dislike,
  impulsifyVideo as impulsify,
  commentVideo,
  addView,
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

const maxw = { maxWidth: "1280px" };

function Video({
  match,
  video,
  like,
  dislike,
  impulsify,
  auth: { user },
  sendNotif,
  commentVideo,
  history,
  addView,
  stopViews,
}) {
  const [liked, setLiked] = useState(null);
  const [byUser, setByUser] = useState(null);
  const [comment, setComment] = useState("");
  const { language } = useContext(LanguageContext);
  const [seeMore, setSeeMore] = useState(false);
  const {
    by,
    category,
    comments,
    date,
    description,
    endorsements,
    impulsions,
    // isVideo,
    judgements,
    meta,
    name,
    // savedBy,
    url,
    views,
    _id,
  } = video;

  useTimeout(() => {
    if (stopViews) {
      return;
    }
    addView(_id);
  }, parseInt(meta.duration) / 2);

  useEffect(() => {
    (async function () {
      try {
        if (by) {
          const res = await getUserByUsername(by);
          await setByUser(res);
        }
      } catch (e) {
        console.warn("Error, dude");
      }
    })();
    // eslint-disable-next-line
  }, [by, video]);

  useEffect(() => {
    if (judgements.filter((jud) => jud.user === user._id).length > 0) {
      setLiked("dislike");
    } else if (endorsements.filter((end) => end.user === user._id).length > 0) {
      setLiked("like");
    } else if (impulsions.filter((imp) => imp.user === user._id).length > 0) {
      setLiked("impulse");
    }
    // eslint-disable-next-line
  }, [video]);

  const setLikability = (val) => {
    const id = _id;
    const likerId = user._id;
    const ownedById = video.user;

    if (liked === val) setLiked(null);
    else setLiked(val);
    switch (val) {
      case "like":
        like(id, likerId);
        if (ownedById !== likerId) {
          sendNotif({
            userId: ownedById,
            type: "like",
            language,
            username: user.username,
            name: `${user.firstName} ${user.lastName}`,
            url: `/videos/${_id}`,
          });
        }
        break;
      case "dislike":
        dislike(id, likerId);
        if (ownedById !== likerId) {
          sendNotif({
            userId: ownedById,
            type: "dislike",
            language: localStorage.language,
            username: user.username,
            name: `${user.firstName} ${user.lastName}`,
            url: `/videos/${_id}`,
          });
        }
        break;
      case "impulse":
        impulsify(id, likerId);
        if (ownedById !== likerId) {
          sendNotif({
            userId: ownedById,
            type: "impulse",
            language: localStorage.language,
            username: user.username,
            name: `${user.firstName} ${user.lastName}`,
            url: `/videos/${_id}`,
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
      {video && (
        <div style={maxw} className="m-auto">
          <div className="d-flex justify-content-center">
            <ResponsiveVideo src={url} type="video/*" />
          </div>
          <div className="d-flex">
            <div className="d-flex flex-column" style={{ flex: 1 }}>
              <h1 className="my-3">{name}</h1>
              <p className="font-weight-bold">
                <span className="badge badge-secondary">
                  <Moment format="DD. MMM YYYY">{date}</Moment>
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
                    {endorsements && endorsements.length}
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
                    {judgements && judgements.length}
                  </span>
                </div>
                <div className="position-relative">
                  <ShortLogo
                    className={`px-3 pb-3 pointer`}
                    onClick={() => setLikability("impulse")}
                    liked={liked}
                  />
                  <span style={{ fontSize: "2.5rem" }} className="text-primary">
                    {impulsions && impulsions.length}
                  </span>
                </div>
              </section>
              <section>
                <ViewCounter className="text-right mb-0">
                  <span>
                    {parseInt(views) < 1 ? (
                      <Fragment>No views</Fragment>
                    ) : parseInt(views) === 1 ? (
                      <Fragment>1 view</Fragment>
                    ) : (
                      <Fragment>{parseInt(views)} views</Fragment>
                    )}
                  </span>
                </ViewCounter>
              </section>
            </div>
          </div>
          <div className="d-flex flex-column">
            {description && (
              <article>
                <div className="my-3 lead">
                  {seeMore ? description : truncate(description, 130)}
                </div>
                {description.length >= 130 && (
                  <button
                    className="btn btn-block btn-outline-secondary my-3 font-weight-bold"
                    onClick={() => setSeeMore(!seeMore)}
                    style={{ letterSpacing: "1.5px" }}
                  >
                    {seeMore ? "See less" : "See more"}
                  </button>
                )}
                {category && (
                  <h4 className="text-secondary my-3">Category: {category}</h4>
                )}
              </article>
            )}
          </div>
          <div className="shadow border border-secondary p-3 rounded">
            <Link
              style={{ textDecoration: "none", color: "#eee" }}
              to={`/social/profile/${video.user}`}
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
              <h3 className="m-0">@{by}</h3>
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
        {video &&
          comments &&
          comments.length > 0 &&
          comments.map((comm) => (
            <VideoComment key={comm._id} comment={comm} videoId={_id} />
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
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getVideo,
  like,
  dislike,
  impulsify,
  sendNotif,
  commentVideo,
  addView,
})(Video);

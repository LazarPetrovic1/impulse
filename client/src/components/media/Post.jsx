import React, { useState, useEffect, useContext } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import ImagePostContainer from "../../styled/ImagePost/ImagePostContainer";
import Comment from "../layout/Comment";
import { COMMENT_DELIMITER } from "../../utils/nonReduxConstants";
import StatsFormContainer from "../../styled/ImagePost/StatsFormContainer";
import { LanguageContext } from "../../contexts/LanguageContext";
import { ThemeContext } from "../../contexts/ThemeContext";
import {
  like,
  dislike,
  impulsify,
  addComment,
  getComments,
} from "../../actions/image";
import ShortLogo from "../../styled/Logo/ShortLogo";
import StatsNames from "../../styled/Stats/StatsNames";
import { sendNotif } from "../../actions/notifs";
import axios from "axios";
import { genericposts } from "../../utils/langObject";

const { _loadmorecomments, _hidecomments, _expandcomments } = genericposts;

function Post({
  image,
  setIsSlider,
  auth,
  i,
  match,
  addComment,
  like,
  dislike,
  impulsify,
  sendNotif,
  getComments,
}) {
  const { user } = auth;
  const [commentsPage, setCommentsPage] = useState(1);
  const [commentsLength, setCommentsLength] = useState(0);
  const [areCommentsHidden, setAreCommentsHidden] = useState(false);
  const [hasMoreComments, setHasMoreComments] = useState(true);
  const [owner, setOwner] = useState(null);
  const [imgState, setImgState] = useState(image);
  const [comment, setComment] = useState("");
  const [liked, setLiked] = useState(null);
  const [allWhoLiked, setAllWhoLiked] = useState([]);
  const [allWhoDisliked, setAllWhoDisliked] = useState([]);
  const [allWhoImpulsed, setAllWhoImpulsed] = useState([]);
  const { language } = useContext(LanguageContext);
  const { isDarkTheme } = useContext(ThemeContext);
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      (async function () {
        try {
          const res = await axios.get(`/api/users/${image.user}`);
          await setOwner(res.data);
        } catch (e) {
          console.warn("Error, dude");
        }
      })();
    }
    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    (async function () {
      try {
        if (!hasMoreComments) return;
        if (commentsPage === 1 && image.comments.length > 0) return;
        const res = await getComments(
          image._id,
          commentsPage,
          COMMENT_DELIMITER
        );
        await setHasMoreComments(res.hasMore);
        await setCommentsLength(res.commentsLength);
      } catch (e) {
        console.warn(e.message);
      }
    })();
    // eslint-disable-next-line
  }, [commentsPage]);

  useEffect(() => {
    if (JSON.stringify(imgState) !== JSON.stringify(image)) {
      setImgState(image);
    }
    // eslint-disable-next-line
  }, [image]);
  const getStatOnHover = async (id, type) => {
    try {
      const res = await axios.get(`/api/imageposts/${id}/${type}`);
      switch (type) {
        case "impulse":
          await setAllWhoImpulsed(res.data);
          break;
        case "like":
          await setAllWhoLiked(res.data);
          break;
        case "dislike":
          await setAllWhoDisliked(res.data);
          break;
        default:
      }
    } catch (e) {
      console.warn(e.message);
    }
  };

  const setLikability = (val) => {
    const id = image._id;
    const ownedById = image.user;
    const likerId = user._id;
    if (liked === val) setLiked(null);
    else setLiked(val);
    switch (val) {
      case "like":
        like(id, ownedById, likerId);
        if (ownedById !== likerId) {
          sendNotif({
            userId: image.user,
            type: "like",
            language,
            username: user.username,
            name: `${user.firstName} ${user.lastName}`,
            url: `/images/${image._id}`,
          });
        }
        break;
      case "dislike":
        dislike(id, ownedById, likerId);
        if (ownedById !== likerId) {
          sendNotif({
            userId: image.user,
            type: "dislike",
            language,
            username: user.username,
            name: `${user.firstName} ${user.lastName}`,
            url: `/images/${image._id}`,
          });
        }
        break;
      case "impulse":
        impulsify(id, ownedById, likerId);
        if (ownedById !== likerId) {
          sendNotif({
            userId: image.user,
            type: "impulse",
            language,
            username: user.username,
            name: `${user.firstName} ${user.lastName}`,
            url: `/images/${image._id}`,
          });
        }
        break;
      default:
        return;
    }
  };

  useEffect(() => {
    if (image.judgements.filter((jud) => jud.user === user._id).length > 0) {
      setLiked("dislike");
    } else if (
      image.endorsements.filter((end) => end.user === user._id).length > 0
    ) {
      setLiked("like");
    } else if (
      image.impulsions.filter((imp) => imp.user === user._id).length > 0
    ) {
      setLiked("impulse");
    }
    // eslint-disable-next-line
  }, [image]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const id = image._id;
    const ownedById = "mine";
    await addComment({ id, text: comment, ownedById });
    await setComment("");
  };

  return (
    imgState &&
    owner && (
      <article style={{ width: "100%" }}>
        <div className="my-3 d-flex">
          <div>
            <img
              src={
                owner && owner.profileImages && owner.profileImages.length > 0
                  ? owner.profileImages[owner.profileImages.length - 1].url
                  : `https://robohash.org/${owner._id}?set=set4&size=22x22`
              }
              width={32}
              height={32}
              alt={`${owner.username}'s avatar`}
              className="rounded-circle"
            />
          </div>
          <h2 className="ml-4">
            <Link className="text-primary" to={`/social/profile/${owner._id}`}>
              {owner.firstName} {owner.lastName}
            </Link>
          </h2>
        </div>
        <div>
          <ImagePostContainer className="p-2 my-2 d-flex flex-column">
            <img
              src={imgState.url}
              style={{ cursor: "pointer" }}
              height="auto"
              width="100%"
              alt={`Media uploaded by user ${user.firstName}`}
              onClick={() => setIsSlider([true, i])}
            />
          </ImagePostContainer>
          <StatsFormContainer width="100%">
            <div className="d-flex justify-content-between">
              <div className="d-flex">
                <div
                  className="position-relative"
                  onMouseEnter={() => getStatOnHover(image._id, "like")}
                  onMouseLeave={() => setAllWhoLiked([])}
                >
                  <i
                    onClick={() => setLikability("like")}
                    className={`fas fa-plus fa-2x p-3 pointer ${
                      liked === "like" && "text-success"
                    }`}
                  />
                  <span style={{ fontSize: "2.5rem" }} className="text-success">
                    {image.endorsements && image.endorsements.length}
                  </span>
                  {allWhoLiked.length > 0 && (
                    <StatsNames isDarkTheme={isDarkTheme}>
                      {allWhoLiked.map((awl) => (
                        <p key={awl}>{awl}</p>
                      ))}
                    </StatsNames>
                  )}
                </div>
                <div
                  className="position-relative"
                  onMouseEnter={() => getStatOnHover(image._id, "dislike")}
                  onMouseLeave={() => setAllWhoDisliked([])}
                >
                  <i
                    onClick={() => setLikability("dislike")}
                    className={`fas fa-minus fa-2x p-3 pointer ${
                      liked === "dislike" && "text-danger"
                    }`}
                  />
                  <span style={{ fontSize: "2.5rem" }} className="text-danger">
                    {image.judgements && image.judgements.length}
                  </span>
                  {allWhoDisliked.length > 0 && (
                    <StatsNames isDarkTheme={isDarkTheme}>
                      {allWhoDisliked.map((awd) => (
                        <p key={awd}>{awd}</p>
                      ))}
                    </StatsNames>
                  )}
                </div>
              </div>
              <div
                className="d-flex position-relative"
                onMouseEnter={() => getStatOnHover(image._id, "impulse")}
                onMouseLeave={() => setAllWhoImpulsed([])}
              >
                <ShortLogo
                  onClick={() => setLikability("impulse")}
                  liked={liked}
                  className={`p-3 pointer`}
                />
                <span style={{ fontSize: "2.5rem" }} className="text-primary">
                  {image.impulsions && image.impulsions.length}
                </span>
                {allWhoImpulsed.length > 0 && (
                  <StatsNames isDarkTheme={isDarkTheme}>
                    {allWhoImpulsed.map((awi) => (
                      <p key={awi}>{awi}</p>
                    ))}
                  </StatsNames>
                )}
              </div>
            </div>
            <form className="input-group px-2" onSubmit={onSubmit}>
              {/*placeholder {_addcomment[language]}*/}
              <input
                type="text"
                name="comment"
                placeholder="Add a comment"
                className="form-control"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <button className="input-group-append btn btn-secondary d-flex align-items-center">
                <i className="fas fa-comments" />
              </button>
            </form>
            <button
              className="btn btn-block pt-2"
              style={{ background: "transparent", color: "white" }}
              onClick={() => setCommentsPage(commentsPage + 1)}
            >
              {_loadmorecomments[language]}{" "}
              {commentsPage > 1 &&
                commentsLength > 0 &&
                `${image.comments.length}/${commentsLength}`}
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
          </StatsFormContainer>
        </div>
        <div className="p-2 d-flex flex-column" style={{ margin: "auto" }}>
          {!areCommentsHidden &&
            imgState.comments.map((comm) => (
              <Comment comm={comm} key={comm._id} imgId={image._id} />
            ))}
        </div>
      </article>
    )
  );
}

Post.propTypes = {
  auth: PropTypes.object.isRequired,
  addComment: PropTypes.func.isRequired,
  like: PropTypes.func.isRequired,
  dislike: PropTypes.func.isRequired,
  impulsify: PropTypes.func.isRequired,
  sendNotif: PropTypes.func.isRequired,
  getComments: PropTypes.func.isRequired,
  image: PropTypes.object.isRequired,
  setIsSlider: PropTypes.func.isRequired,
  i: PropTypes.number.isRequired,
  match: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  addComment,
  like,
  dislike,
  impulsify,
  sendNotif,
  getComments,
})(Post);

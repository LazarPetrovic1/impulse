import React, { useState, useEffect, useContext } from "react";
import StatsFormContainer from "../../styled/ImagePost/StatsFormContainer";
import { LanguageContext } from "../../contexts/LanguageContext";
import { ThemeContext } from "../../contexts/ThemeContext";
import { connect } from "react-redux";
import { addComment } from "../../actions/image";
import { like, dislike, impulsify } from "../../actions/image";
import PropTypes from "prop-types";
import ShortLogo from "../../styled/Logo/ShortLogo";
import StatsNames from "../../styled/Stats/StatsNames";
import { sendNotif } from "../../actions/notifs";
import axios from "axios";
// import { likesandcommentscomponent } from '../../utils/langObject';

// const { _addcomment } = likesandcommentscomponent

function NewLikesAndComments(props) {
  const [comment, setComment] = useState("");
  const [liked, setLiked] = useState(null);
  const [allWhoLiked, setAllWhoLiked] = useState([]);
  const [allWhoDisliked, setAllWhoDisliked] = useState([]);
  const [allWhoImpulsed, setAllWhoImpulsed] = useState([]);
  const { language } = useContext(LanguageContext);
  const { isDarkTheme } = useContext(ThemeContext);
  const {
    auth: { user },
    addComment,
    image,
    like,
    dislike,
    impulsify,
    sendNotif,
  } = props;

  const getStatOnHover = async (id, type) => {
    try {
      const res = await axios.get(`/api/imageposts/${id}/${type}`);
      await console.log("RES.DATA", res.data);
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
          console.log("Hello");
      }
    } catch (e) {
      console.warn(e.message);
    }
  };

  const setLikability = (val) => {
    const id = image._id;
    const ownedById =
      props && props.match && props.match.params && props.match.params.id
        ? props.match.params.id
        : image.user;
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
    const ownedById =
      props && props.match && props.match.params && props.match.params.id
        ? props.match.params.id
        : "mine";
    await addComment({ id, text: comment, ownedById });
    await setComment("");
  };

  return (
    <StatsFormContainer
      margin={props && props.margin && props.margin}
      width={props && props.width && props.width}
    >
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
    </StatsFormContainer>
  );
}

NewLikesAndComments.propTypes = {
  auth: PropTypes.object.isRequired,
  addComment: PropTypes.func.isRequired,
  like: PropTypes.func.isRequired,
  dislike: PropTypes.func.isRequired,
  impulsify: PropTypes.func.isRequired,
  sendNotif: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  addComment,
  like,
  dislike,
  sendNotif,
  impulsify,
})(NewLikesAndComments);

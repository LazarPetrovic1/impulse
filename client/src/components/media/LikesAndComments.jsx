import React, { useState, useEffect, useContext } from "react";
import StatsFormContainer from "../../styled/ImagePost/StatsFormContainer";
import { LanguageContext } from "../../contexts/LanguageContext";
import { connect } from "react-redux";
import {
  like as likeImage,
  dislike as dislikeImage,
  impulsify as impulsifyImage,
  addComment as commentImage,
} from "../../actions/image";
import {
  likeVideo,
  dislikeVideo,
  impulsifyVideo,
  commentVideo,
} from "../../actions/video";
import PropTypes from "prop-types";
import ShortLogo from "../../styled/Logo/ShortLogo";
import { sendNotif } from "../../actions/notifs";
// import { likesandcommentscomponent } from '../../utils/langObject';

// const { _addcomment } = likesandcommentscomponent

function LikesAndComments(props) {
  const [comment, setComment] = useState("");
  const [liked, setLiked] = useState(null);
  const { language } = useContext(LanguageContext);
  const {
    auth: { user },
    allmedia: { media },
    likeImage,
    dislikeImage,
    impulsifyImage,
    likeVideo,
    dislikeVideo,
    impulsifyVideo,
    commentVideo,
    commentImage,
    sendNotif,
  } = props;

  // const getStatOnHover = async (id, type) => {
  //   try {
  //     const res = await axios.get(`/api/imageposts/${id}/${type}`)
  //     await console.log("RES.DATA", res.data);
  //     switch (type) {
  //       case "impulse":
  //         await setAllWhoImpulsed(res.data)
  //         break;
  //       case "like":
  //         await setAllWhoLiked(res.data)
  //         break;
  //       case "dislike":
  //         await setAllWhoDisliked(res.data)
  //         break;
  //       default:
  //         console.log("Hello");
  //     }
  //   } catch (e) {
  //     console.warn(e.message);
  //   }
  // }

  const setLikability = (val) => {
    const id = media[props.i]._id;
    const ownedById =
      props && props.match && props.match.params && props.match.params.id
        ? props.match.params.id
        : media[props.i].user;
    const likerId = user._id;
    if (liked === val) setLiked(null);
    else setLiked(val);
    switch (val) {
      case "like":
        if (media[props.i].isVideo) {
          likeVideo(id, likerId);
        } else if (!media[props.i].isVideo && media[props.i].url) {
          likeImage(id, ownedById, likerId);
        } else {
          console.log("Boo +");
        }
        if (ownedById !== likerId) {
          sendNotif({
            userId: media[props.i].user,
            type: "like",
            language,
            username: user.username,
            name: `${user.firstName} ${user.lastName}`,
          });
        }
        break;
      case "dislike":
        if (media[props.i].isVideo) {
          dislikeVideo(id, likerId);
        } else if (!media[props.i].isVideo && media[props.i].url) {
          dislikeImage(id, ownedById, likerId);
        } else {
          console.log("Boo -");
        }
        if (ownedById !== likerId) {
          sendNotif({
            userId: media[props.i].user,
            type: "dislike",
            language: localStorage.language,
            username: user.username,
            name: `${user.firstName} ${user.lastName}`,
          });
        }
        break;
      case "impulse":
        if (media[props.i].isVideo) {
          impulsifyVideo(id, likerId);
        } else if (!media[props.i].isVideo && media[props.i].url) {
          impulsifyImage(id, ownedById, likerId);
        } else {
          console.log("Boo Impulse");
        }
        if (ownedById !== likerId) {
          sendNotif({
            userId: media[props.i].user,
            type: "impulse",
            language: localStorage.language,
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
    if (
      media[props.i].judgements.filter((jud) => jud.user === user._id).length >
      0
    ) {
      setLiked("dislike");
    } else if (
      media[props.i].endorsements.filter((end) => end.user === user._id)
        .length > 0
    ) {
      setLiked("like");
    } else if (
      media[props.i].impulsions.filter((imp) => imp.user === user._id).length >
      0
    ) {
      setLiked("impulse");
    }
    // eslint-disable-next-line
  }, [props.i]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const id = media[props.i]._id;
    const ownedById =
      props && props.match && props.match.params && props.match.params.id
        ? props.match.params.id
        : "mine";
    if (media[props.i].isVideo) {
      await commentVideo(id, comment);
    } else if (!media[props.i].isVideo && media[props.i].url) {
      await commentImage({ id, text: comment, ownedById });
    } else {
      console.log("Commenting");
    }
    await setComment("");
  };

  return (
    <StatsFormContainer
      margin={props && props.margin && props.margin}
      width={props && props.width && props.width}
    >
      <div className="d-flex justify-content-between">
        <div className="d-flex">
          <div className="position-relative">
            <i
              className={`fas fa-plus fa-2x p-3 pointer ${
                liked === "like" && "text-success"
              }`}
              onClick={() => setLikability("like")}
            />
            <span style={{ fontSize: "2.5rem" }} className="text-success">
              {media[props.i].endorsements &&
                media[props.i].endorsements.length}
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
              {media[props.i].judgements && media[props.i].judgements.length}
            </span>
          </div>
        </div>
        <div className="d-flex position-relative">
          <ShortLogo
            onClick={() => setLikability("impulse")}
            liked={liked}
            className={`p-3 pointer`}
          />
          <span style={{ fontSize: "2.5rem" }} className="text-primary">
            {media[props.i].impulsions && media[props.i].impulsions.length}
          </span>
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

LikesAndComments.propTypes = {
  auth: PropTypes.object.isRequired,
  allmedia: PropTypes.object.isRequired,
  sendNotif: PropTypes.func.isRequired,
  likeImage: PropTypes.func.isRequired,
  dislikeImage: PropTypes.func.isRequired,
  impulsifyImage: PropTypes.func.isRequired,
  likeVideo: PropTypes.func.isRequired,
  dislikeVideo: PropTypes.func.isRequired,
  impulsifyVideo: PropTypes.func.isRequired,
  commentVideo: PropTypes.func.isRequired,
  commentImage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  allmedia: state.allmedia,
});

export default connect(mapStateToProps, {
  likeImage,
  dislikeImage,
  impulsifyImage,
  likeVideo,
  dislikeVideo,
  impulsifyVideo,
  commentVideo,
  commentImage,
  sendNotif,
})(LikesAndComments);

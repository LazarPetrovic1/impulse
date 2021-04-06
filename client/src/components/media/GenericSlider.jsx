import React, { useState, useContext, useEffect } from "react";
import ImageSliderContainer from "../../styled/ImageSlider/ImageSliderContainer";
import CloseImageSlider from "../../styled/ImageSlider/CloseImageSlider";
import { ThemeContext } from "../../contexts/ThemeContext";
import Moment from "react-moment";
import LikesAndComments from "./LikesAndComments";
import Comment from "../layout/Comment";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import axios from "axios";
// import useAsync from '../../hooks/useAsync';

function GenericSlider({ media, i, setIsGenericSlider, auth }) {
  const [index, setIndex] = useState(i);
  const [postedByName, setPostedByName] = useState("");
  const { isDarkTheme } = useContext(ThemeContext);

  const slideRight = () => {
    setIndex((index + 1) % media.length);
  };

  // CHAT-REPEAT
  const getUserById = async (id) => {
    try {
      const res = await axios.get(`/api/users/postedby/${id}`);
      return `${res.data.firstName} ${res.data.lastName}`;
    } catch (e) {
      console.warn("Error, buddy", e.message);
    }
  };

  useEffect(() => {
    (async function () {
      try {
        const name = await getUserById(media[index].user);
        await setPostedByName(name);
      } catch (e) {
        console.warn("Error, man", e.message);
      }
    })();
    // eslint-disable-next-line
  }, [index]);

  const slideLeft = () => {
    const nextIndex = index - 1;
    if (nextIndex < 0) {
      setIndex(media.length - 1);
    } else {
      setIndex(nextIndex);
    }
  };

  return (
    media.length > 0 && (
      <ImageSliderContainer
        isDarkTheme={isDarkTheme}
        style={{ pointerEvents: "all" }}
      >
        <CloseImageSlider
          onClick={() => setIsGenericSlider([false, 0])}
          isDarkTheme={isDarkTheme}
        >
          <i className="fas fa-times"></i>
        </CloseImageSlider>
        <button onClick={slideLeft} name="slider">
          <i className="fas fa-chevron-left"></i>
        </button>
        <article className="d-flex flex-column" style={{ flex: 4 }}>
          <div className="d-flex">
            {media[index].isVideo ? (
              <video
                style={{
                  maxHeight: `calc(${window.innerHeight}px - 10rem)`,
                  width: "50%",
                }}
                src={media[index].url}
                controls
                autoPlay
              />
            ) : (
              <img
                style={{
                  maxHeight: `calc(${window.innerHeight}px - 10rem)`,
                  flex: 1,
                }}
                src={media[index].url}
                alt={index}
              />
            )}
            <div className="p-2" style={{ flex: 1 }}>
              <h3>{postedByName && postedByName}</h3>
              <p>{media[index].content}</p>
              <Moment format="DD.MM.YYYY">{media[index].date}</Moment>
              {media[index].comments &&
                media[index].comments.length > 0 &&
                media[index].comments.map((comm) => (
                  <Comment key={comm.user} comm={comm} />
                ))}
            </div>
          </div>
          <LikesAndComments i={index} margin="0" width="100%" />
        </article>
        <button onClick={slideRight} name="slider">
          <i className="fas fa-chevron-right"></i>
        </button>
      </ImageSliderContainer>
    )
  );
}

GenericSlider.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(GenericSlider);

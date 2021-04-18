import React, { useState, useContext, useEffect } from "react";
import ImageSliderContainer from "../../styled/ImageSlider/ImageSliderContainer";
import CloseImageSlider from "../../styled/ImageSlider/CloseImageSlider";
import { ThemeContext } from "../../contexts/ThemeContext";
import Moment from "react-moment";
import NewLikesAndComments from "./NewLikesAndCommentsImage";
import Comment from "../layout/Comment";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import axios from "axios";
// import useAsync from '../../hooks/useAsync';

function ImageSlider({ images, i, setIsSlider, auth }) {
  const [index, setIndex] = useState(i);
  const [postedByName, setPostedByName] = useState("");
  const { isDarkTheme } = useContext(ThemeContext);

  const slideRight = () => {
    setIndex((index + 1) % images.length);
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
        const name = await getUserById(images[index].user);
        await setPostedByName(name);
      } catch (e) {
        console.warn("Error, man", e.message);
      }
    })();
  });

  const slideLeft = () => {
    const nextIndex = index - 1;
    if (nextIndex < 0) {
      setIndex(images.length - 1);
    } else {
      setIndex(nextIndex);
    }
  };

  return (
    images.length > 0 && (
      <ImageSliderContainer
        isDarkTheme={isDarkTheme}
        style={{ pointerEvents: "all" }}
      >
        <CloseImageSlider
          onClick={() => setIsSlider([false, 0])}
          isDarkTheme={isDarkTheme}
        >
          <i className="fas fa-times"></i>
        </CloseImageSlider>
        <button onClick={slideLeft} name="slider">
          <i className="fas fa-chevron-left"></i>
        </button>
        <article className="d-flex flex-column" style={{ flex: 4 }}>
          <div className="d-flex">
            <img
              style={{
                maxHeight: `calc(${window.innerHeight}px - 10rem)`,
                flex: 1,
              }}
              src={images[index].url}
              alt={index}
            />
            <div className="p-2" style={{ flex: 1 }}>
              <h3>{postedByName && postedByName}</h3>
              <p>{images[index].content}</p>
              <Moment format="DD.MM.YYYY">{images[index].date}</Moment>
              {images[index].comments &&
                images[index].comments.length > 0 &&
                images[index].comments.map((comm) => (
                  <Comment key={comm.user} comm={comm} />
                ))}
            </div>
          </div>
          {images[index].endorsements &&
            images[index].judgements &&
            images[index].impulsions &&
            images[index].comments && (
              <NewLikesAndComments
                image={images[index]}
                margin="0"
                width="100%"
              />
            )}
        </article>
        <button onClick={slideRight} name="slider">
          <i className="fas fa-chevron-right"></i>
        </button>
      </ImageSliderContainer>
    )
  );
}

ImageSlider.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(ImageSlider);

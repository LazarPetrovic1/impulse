import React, { useState, useContext, useEffect } from 'react'
import ImageSliderContainer from '../../styled/ImageSlider/ImageSliderContainer'
import CloseImageSlider from '../../styled/ImageSlider/CloseImageSlider'
import { ThemeContext } from '../../contexts/ThemeContext';
import Moment from 'react-moment';
import LikesAndComments from './LikesAndComments';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios'

function ImageSlider({ images, i, setIsSlider, auth }) {
  const [index, setIndex] = useState(i)
  const [postedByName, setPostedByName] = useState("")
  const { isDarkTheme } = useContext(ThemeContext)

  const slideRight = () => {
    setIndex((index + 1) % images.length)
  }

  // CHAT-REPEAT
  const getUserById = async (id) => {
    try {
      const res = await axios.get(`/api/users/postedby/${id}`)
      return `${res.data.firstName} ${res.data.lastName}`
    } catch (e) {
      console.warn("Error, buddy", e.message);
    }
  }

  useEffect(() => {
    (async function() {
      try {
        const name = await getUserById(images[index].user)
        await setPostedByName(name)
      } catch(e) {
        console.warn("Error, man", e.message);
      }
    }());
    // eslint-disable-next-line
  }, [index])

  const slideLeft = () => {
    const nextIndex = index - 1
    if (nextIndex < 0) {
      setIndex(images.length - 1)
    } else {
      setIndex(nextIndex)
    }
  }

  return (
    images.length > 0 && (
      <ImageSliderContainer isDarkTheme={isDarkTheme} style={{ pointerEvents: 'all' }}>
        <CloseImageSlider onClick={() => setIsSlider([false, 0])} isDarkTheme={isDarkTheme}>
          <i className="fas fa-times"></i>
        </CloseImageSlider>
        <button onClick={slideLeft} name="slider">
          <i className="fas fa-chevron-left"></i>
        </button>
        <article className="d-flex flex-column">
          <div className="d-flex">
            <img
              style={{ maxHeight: window.innerHeight }}
              src={images[index].url}
              alt={index}
            />
            <div className="p-2">
              <h3>{postedByName && postedByName}</h3>
              <p>{images[index].content}</p>
              <Moment format="DD.MM.YYYY">{images[index].date}</Moment>
              {
                images[index].comments &&
                images[index].comments.length > 0 &&
                images[index].comments.map(comm => (
                  <div key={comm.user}>
                    <p>@{comm.name}</p>
                    <img
                      src={comm.avatar}
                      height={50}
                      width={50}
                      alt={`${comm.name}'s avatar`}
                    />
                    <p>{comm.text}</p>
                    <p>
                      On <Moment format="DD.MM.YYYY">{comm.date}</Moment>
                    </p>
                  </div>
                ))
              }
            </div>
          </div>
          <LikesAndComments i={index} margin="0" width="100%" />
        </article>
        <button onClick={slideRight} name="slider">
          <i className="fas fa-chevron-right"></i>
        </button>
      </ImageSliderContainer>
    )
  )
}

ImageSlider.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, null)(ImageSlider)

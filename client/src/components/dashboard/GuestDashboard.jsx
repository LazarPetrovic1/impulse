import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Spinner from '../layout/Spinner';
import Moment from 'react-moment';
import ImageSlider from '../layout/ImageSlider'
import DashCenter from '../../styled/DashCenter';
import Post from '../layout/Post';
import { connect } from 'react-redux';
import { getImages } from '../../actions/image';
import PropTypes from 'prop-types';

function GuestDashboard (props) {
  const {
    getImages,
    image: { images },
    match
  } = props
  const [isSlider, setIsSlider] = useState([false, 0])
  const [guest, setGuest] = useState({})
  const getGuest = async (id) => {
    try {
      const res = await axios.get(`/api/users/${id}`)
      await setGuest(res.data)
    } catch (e) {
      console.warn(e)
    }
  }

  useEffect(() => {
    getGuest(match.params.id)
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (guest) {
      getImages(match.params.id)
    }
    // eslint-disable-next-line
  }, [guest])

  return !guest ? <Spinner /> : (
    <div className="container pt-5" style={{ pointerEvents: "all" }}>
      <div className="text-center">
        <img
          className="rounded-circle"
          src="https://randomuser.me/api/portraits/men/7.jpg"
          alt={`${guest.firstName}'s avatar`}
        />
      </div>
      <div className="text-center mt-3">
        <h3>{guest.firstName} {guest.lastName}</h3>
        <h4 className="text-muted">(@{guest.username})</h4>
      </div>
      <div className="p-5">
        <h4 className="my-3">
          <i className="fas fa-map-marker pr-3"></i>From: {guest.zip}, {guest.city}, {guest.country}
        </h4>
        <h4 className="my-3">
          <i className="fas fa-envelope pr-3"></i>E-mail: {guest.email}
        </h4>
        <h4 className="my-3">
          <i className={`pr-3 fas fa-${guest.sex === 'm' ? "mars" : guest.sex === 'f' ? "venus" : "genderless"}`} />
          Sex: {guest.sex === 'm' ? "Male" : guest.sex === 'f' ? "Female" : '<Redacted>'}
        </h4>
        <h4 className="my-3">
          <i className="fas fa-birthday-cake pr-3"></i>
          Date of birth: <Moment format="DD.MM.YYYY">{guest.dob}</Moment>
        </h4>
        <h4 className="my-3">
          <i className="fas fa-info-circle pr-3"></i>
          Bio: {guest.bio}
        </h4>
      </div>
      <DashCenter justification="flex-start" maxw="1300px" style={{ pointerEvents: "all" }}>
        {
          images && images.length > 0 && images.map((image, i) => (
            <Post
              image={image}
              setIsSlider={setIsSlider}
              key={image._id}
              i={i}
            />
          ))
        }
      </DashCenter>
      {
        images &&
        images.length > 0 &&
        isSlider[0] && (
          <ImageSlider images={images} i={isSlider[1]} setIsSlider={setIsSlider} />
        )
      }
    </div>
  )
}

GuestDashboard.propTypes = {
  getImages: PropTypes.func.isRequired,
  image: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  image: state.image
})

export default connect(
  mapStateToProps,
  { getImages }
)(GuestDashboard)

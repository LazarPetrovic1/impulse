import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { setAlert } from '../../actions/alert'
import { getCurrentProfile } from '../../actions/profile'
import Spinner from '../layout/Spinner'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

/*
*
*  NAPRAVI GA KAO PROFILE-OVERVIEW
*
*/

function SocialProfile ({
  setAlert,
  getCurrentProfile,
  profile: { profile, loading },
  auth
}) {
  useEffect(() => {
    getCurrentProfile()
    // eslint-disable-next-line
  }, [getCurrentProfile])

  return profile && !loading ? (
    <div className='container' style={{ pointerEvents: "all" }}>
      <h1>Welcome, {auth.user.firstName}</h1>
      <ul className='list-group'>
        {
          profile.employment === 'None' ? null : (
            <li className='list-group-item'>
              <i className='fas fa-briefcase' />&nbsp;&nbsp;
              Works at {profile.employment}
            </li>
          )
        }
        {
          profile.website === 'None' ? null : (
            <li className='list-group-item'>
              <i className='fas fa-globe' />&nbsp;&nbsp;
              <a href={profile.website} target='_blank' rel="noopener noreferrer">Website</a>
            </li>
          )
        }
        {
          profile.status === 'Hide' ? null : (
            <li className='list-group-item'>
              <i className='fas fa-heart' />&nbsp;&nbsp;
              {profile.status}
            </li>
          )
        }
        {
          profile.social.youtube && (
            <li className='list-group-item'>
              <i className='fab fa-youtube' />&nbsp;&nbsp;
              <a href={profile.social.youtube} target='_blank' rel="noopener noreferrer">YouTube</a>
            </li>
          )
        }
        {
          profile.social.twitter && (
            <li className='list-group-item'>
              <i className='fab fa-twitter' />&nbsp;&nbsp;
              <a href={profile.social.twitter} target='_blank' rel="noopener noreferrer">Twitter</a>
            </li>
          )
        }
        {
          profile.social.facebook && (
            <li className='list-group-item'>
              <i className='fab fa-facebook' />&nbsp;&nbsp;
              <a href={profile.social.facebook} target='_blank' rel="noopener noreferrer">Facebook</a>
            </li>
          )
        }
        {
          profile.social.instagram && (
            <li className='list-group-item'>
              <i className='fab fa-instagram' />&nbsp;&nbsp;
              <a href={profile.social.instagram} target='_blank' rel="noopener noreferrer">Instagram</a>
            </li>
          )
        }
        {
          profile.social.linkedin && (
            <li className='list-group-item'>
              <i className='fab fa-linkedin' />&nbsp;&nbsp;
              <a href={profile.social.linkedin} target='_blank' rel="noopener noreferrer">LinkedIn</a>
            </li>
          )
        }
      </ul>
    </div>
  ) : !profile ? (
    <Fragment>
      <h1 className='text-primary'>You don't seem to have a profile</h1>
      <Link to='/social/create-social-profile' className='btn btn-primary btn-lg'>
        Make one!
      </Link>
    </Fragment>
  ) : (
    <Spinner />
  )
}

SocialProfile.propTypes = {
  auth: PropTypes.object.isRequired,
  setAlert: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
})

export default connect(
  mapStateToProps, {
    setAlert,
    getCurrentProfile
  })(SocialProfile)

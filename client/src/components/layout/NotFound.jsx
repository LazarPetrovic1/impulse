import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import longLogo from '../../assets/IMPULSE_LOGOS/photoshop-logos/long.png'

function NotFound ({ auth: { isAuthenticated } }) {
  return (
    <>
      <div className='container pt-2'>
        <div className='not-found-border'>
          <div className='text-center'>
            <img
              src={longLogo}
              style={{ userSelect: 'none' }}
              alt='Impulse logo'
            />
          </div>
          <h1 className='display-4 text-primary text-center'>
            Oops! Your search came out empty-handed...
          </h1>
          <p className='display-4 text-secondary text-center'>
            Well, isn't this embarrassing...
          </p>
          <p className='display-4 text-info text-center'>
            What were you searching for again?
          </p>
          <Link
            to={isAuthenticated ? '/dashboard' : '/login'}
            className='btn btn-block btn-lg btn-outline-primary'
          >
            Go back
          </Link>
        </div>
      </div>
    </>
  )
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
})

export default connect(mapStateToProps, null)(NotFound)

import React, { useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom'
import Spinner from '../layout/Spinner'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import SideMenu from './SideMenu'
import PageContent from '../layout/PageContent'

function InitialDashboard (props) {
  const {
    auth: { user, loading }
  } = props

  const {
    firstName,
    lastName,
    email,
    sex,
    bio,
    dob,
    username,
    city,
    country,
    zip,
    phone,
    question,
    security,
    imageTaken
  } = user

  return loading ? (
    <Spinner />
  ) : (
    <PageContent>
      <div className='container'>
        <h1 className='text-primary text-center display-4'>
          Welcome, {firstName}
        </h1>
      </div>
      <div className='row'>
        <div className='col-md-3 col-sm-5 col-xs-7'>
          <SideMenu />
        </div>
      </div>
    </PageContent>
  )
}

InitialDashboard.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(
  mapStateToProps,
  null
)(InitialDashboard)

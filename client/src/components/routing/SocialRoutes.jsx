import React, { Fragment } from 'react'
import PrivateRoute from './PrivateRoute'
import SocialProfile from '../SocialRoutes/SocialProfile'

function ForumRoutes () {
  return (
    <Fragment>
      <PrivateRoute exact path='/social-profile' component={SocialProfile} />
      {/* <Route component={NotFound} /> */}
    </Fragment>
  )
}

export default ForumRoutes

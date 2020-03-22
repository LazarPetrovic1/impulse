import React, { Fragment } from 'react'
import { Route } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import Forum from '../ForumRoutes/Forum'
import AddPost from '../ForumRoutes/AddPost'
import ForumPost from '../ForumRoutes/ForumPost'
import ForumDiscussion from '../ForumRoutes/ForumDiscussion'
import ForumEdit from '../ForumRoutes/ForumEdit'
// import NotFound from '../layout/NotFound'

function ForumRoutes () {
  return (
    <Fragment>
      <PrivateRoute exact path='/forum' component={Forum} />
      <PrivateRoute exact path='/forum/forum-add-post' component={AddPost} />
      <PrivateRoute exact path='/forum/forum-post/:id' component={ForumPost} />
      <PrivateRoute exact path='/forum/forum-post/:id/discuss' component={ForumDiscussion} />
      <PrivateRoute exact path='/forum/forum-post/:id/edit' component={ForumEdit} />
      {/* <Route component={NotFound} /> */}
    </Fragment>
  )
}

export default ForumRoutes

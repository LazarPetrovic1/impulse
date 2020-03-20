import React, { Fragment } from 'react'
import PrivateRoute from './PrivateRoute'
import Forum from '../ForumRoutes/Forum'
import AddPost from '../ForumRoutes/AddPost'
import ForumPost from '../ForumRoutes/ForumPost'
import ForumDiscussion from '../ForumRoutes/ForumDiscussion'
import ForumEdit from '../ForumRoutes/ForumEdit'

function ForumRoutes () {
  return (
    <Fragment>
      <PrivateRoute exact path='/forum' component={Forum} />;
      <PrivateRoute exact path='/forum-add-post' component={AddPost} />
      <PrivateRoute exact path='/forum-post/:id' component={ForumPost} />
      <PrivateRoute exact path='/forum-post/:id/discuss' component={ForumDiscussion} />
      <PrivateRoute exact path='/forum-post/:id/edit' component={ForumEdit} />
    </Fragment>
  )
}

export default ForumRoutes

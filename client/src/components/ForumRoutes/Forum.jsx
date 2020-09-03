import React, { Fragment, useState, useEffect } from 'react'
import ForumMenu from './ForumMisc/ForumMenu'
import forumPosts from '../../utils/forumPosts'
import { Link, Redirect } from 'react-router-dom'
import ForumSearchBar from './ForumMisc/ForumSearchBar'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { setAlert } from '../../actions/alert'
import { getAllForumPosts, forumPostDismiss } from '../../actions/forum'
import MarkdownRenderer from 'react-markdown-renderer'
import Spinner from '../layout/Spinner'
import PageContent from '../layout/PageContent'

function Forum ({
  auth: { user },
  setAlert,
  getAllForumPosts,
  forum,
  forumPostDismiss
}) {
  const { posts, loading } = forum
  const [mainPosts, setMainPosts] = useState(forumPosts)

  useEffect(() => {
    getAllForumPosts()
  }, [getAllForumPosts])

  const search = text => {
    // REWORK FUNCTION
    if (text === '') {
      getAllForumPosts()
    } else {
      posts.filter(post => post.body.toLowerCase().includes(text.toLowerCase()))
    }
  }

  const dismissForumPost = id => {
    forumPostDismiss(id, user.dismissedPosts)
    setAlert('Post dismissed! We will not show it to you again.', 'success')
    window.location.reload()
  }

  const reset = setter => {
    setter('')
    setMainPosts(forumPosts)
  }

  const nonDismissedPosts = posts.filter(
    post => !user.dismissedPosts.includes(post._id)
  )

  return loading ? (
    <Spinner />
  ) : (
    <PageContent>
      <div className='pb-4'>
        <h1 className='text-center text-primary mt-0 pt-3'>
          Hey, {user.firstName}!<br />
          Here's something you might be interested in
        </h1>
        <div className='m-auto'>
          <ForumSearchBar search={search} reset={reset} />
        </div>
        <div className='grid'>
          <ForumMenu />
          <div style={{ gridColumn: 'span 1 / auto' }} />
          <div className='span-col-8'>
            {nonDismissedPosts.map(post => (
              <div
                key={post._id}
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                className='p-3'
              >
                <h1 className='text-primary'>
                  <Link to={`/forum/forum-post/${post._id}`}>{post.title}</Link>
                </h1>
                <MarkdownRenderer markdown={post.body} />
                <p className='text-right lead'>- by {post.author}</p>
                <div className='text-right'>
                  <Link
                    to={`/forum/forum-post/${post._id}`}
                    className='btn btn-primary btn-lg mx-2'
                  >
                    Go to post
                  </Link>
                  <button
                    className='btn btn-danger btn-lg mx-2'
                    onClick={() => dismissForumPost(post._id)}
                    aria-label='Dismiss post'
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageContent>
  )
}

Forum.propTypes = {
  auth: PropTypes.object.isRequired,
  setAlert: PropTypes.func.isRequired,
  forum: PropTypes.object.isRequired,
  forumPostDismiss: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  forum: state.forum
})

export default connect(mapStateToProps, {
  setAlert,
  getAllForumPosts,
  forumPostDismiss
})(Forum)

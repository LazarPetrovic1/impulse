import React, { Fragment, useState } from 'react'
import ForumMenu from './ForumMisc/ForumMenu'
import forumPosts from '../../utils/forumPosts'
import { Link } from 'react-router-dom'
import ForumSearchBar from './ForumMisc/ForumSearchBar'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { setAlert } from '../../actions/alert'

function Forum ({auth: { user }, setAlert}) {
  const [mainPosts, setMainPosts] = useState(forumPosts)
  const search = (text) => {
    if (text === '') {
      setMainPosts(forumPosts)
    } else {
      setMainPosts(
        forumPosts.filter(
          post => post.body.includes(text)
        )
      )
    }
  }

  const removePost = (id) => {
    const remainingPosts = forumPosts.filter(
      post => post.id !== id
    )

    setMainPosts(remainingPosts)

    console.log(forumPosts)
    setAlert('Post dismissed! We will not show it to you again.', 'success')
  }

  const reset = (setter) => {
    setter('')
    setMainPosts(forumPosts)
  }

  return (
    <Fragment>
      <h1 className='text-center text-primary'>
        Hey, {user.firstName}!<br />Here's something you might be interested in
      </h1>
      <div className='m-auto'>
        <ForumSearchBar
          search={search}
          reset={reset}
        />
      </div>
      <div className='grid'>
        <ForumMenu />
        <div style={{ gridColumn: 'span 1 / auto' }} />
        <div className='span-col-8'>
          {
            mainPosts.map((post) => (
              <div key={post.id}>
                <h1 className='text-primary'>
                  <Link to={`/forum-post/${post.id}`}>
                    {post.title}
                  </Link>
                </h1>
                <p>{post.body}</p>
                <p className='text-right text-secondary lead'>- by {post.author}</p>
                <div className='text-right'>
                  <Link to={`/forum-post/${post.id}`} className='btn btn-primary btn-lg mx-2'>
                    Go to post
                  </Link>
                  <button
                    className='btn btn-danger btn-lg mx-2'
                    onClick={() => removePost(post.id)}
                    aria-label='Dismiss post'
                  >Dismiss</button>
                </div>
              </div>)
            )
          }
        </div>
      </div>
    </Fragment>
  )
}

Forum.propTypes = {
  auth: PropTypes.object.isRequired,
  setAlert: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { setAlert })(Forum)

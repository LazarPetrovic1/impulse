import React, { Fragment, useState, useEffect } from 'react'
import ForumMenu from './ForumMisc/ForumMenu'
import forumPosts from '../../utils/forumPosts'
import { Link } from 'react-router-dom'
import ForumSearchBar from './ForumMisc/ForumSearchBar'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { setAlert } from '../../actions/alert'
import { getAllForumPosts } from '../../actions/forum'
import MarkdownRenderer from 'react-markdown-renderer'

function Forum ({auth: { user }, setAlert, getAllForumPosts, forum}) {
  const { posts } = forum
  const [mainPosts, setMainPosts] = useState(forumPosts)

  useEffect(() => {
    getAllForumPosts()
  }, [getAllForumPosts])

  const search = (text) => {
    // REWORK FUNCTION
    if (text === '') {
      getAllForumPosts()
    } else {
      posts.filter(
        post => post.body.toLowerCase().includes(text.toLowerCase())
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
            posts.map((post) => (
              <div key={post._id}>
                <h1 className='text-primary'>
                  <Link to={`/forum/forum-post/${post._id}`}>
                    {post.title}
                  </Link>
                </h1>
                <MarkdownRenderer markdown={post.body} />
                <p className='text-right text-secondary lead'>- by {post.author}</p>
                <div className='text-right'>
                  <Link to={`/forum/forum-post/${post._id}`} className='btn btn-primary btn-lg mx-2'>
                    Go to post
                  </Link>
                  <button
                    className='btn btn-danger btn-lg mx-2'
                    onClick={() => removePost(post.id)}
                    aria-label='Dismiss post'
                  >Dismiss</button>
                </div>
              </div>
              )
            )
          }
        </div>
      </div>
    </Fragment>
  )
}

Forum.propTypes = {
  auth: PropTypes.object.isRequired,
  setAlert: PropTypes.func.isRequired,
  forum: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  forum: state.forum
})

export default connect(mapStateToProps, { setAlert, getAllForumPosts })(Forum)

import React, { useState, useEffect } from 'react'
import Autosaving from '../Editor/Autosaving'
import { getForumPostById, editForumPost } from '../../actions/forum'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Spinner from '../layout/Spinner'

function ForumEdit ({ match, history, forum, getForumPostById, editForumPost }) {
  const [value, setValue] = useState('')
  const { post, loading } = forum

  useEffect(() => {
    getForumPostById(match.params.id)

    setValue(post.body)
    // eslint-disable-next-line
  }, [getForumPostById])

  const onChange = (value) => setValue(value)

  // const save = () => history.push(`/forum/forum-post/${post._id}`)

  const changePost = () => {
    editForumPost(value, post._id)
    history.push('/forum')
  }

  return loading ? (
    <Spinner />
  ) : (
    <div className='container' style={{ pointerEvents: "all" }}>
      <Autosaving value={post.body} onChange={onChange} />
      <button className='btn btn-primary btn-lg btn-block' onClick={changePost}>
        <i className='fas fa-save' />&nbsp; Save
      </button>
    </div>
  )
}

ForumEdit.propTypes = {
  forum: PropTypes.object.isRequired,
  getForumPostById: PropTypes.func.isRequired,
  editForumPost: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  forum: state.forum
})

export default connect(
  mapStateToProps,
  { getForumPostById, editForumPost }
)(ForumEdit)

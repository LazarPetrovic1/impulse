import React, { useState, useEffect } from 'react'
import Autosaving from '../Editor/Autosaving'
import { getForumPostById } from '../../actions/forum'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

function ForumEdit ({ match, history, forum, getForumPostById }) {
  const { post } = forum

  useEffect(() => {
    getForumPostById(match.params.id)
  }, [getForumPostById])

  const onChange = (value) => console.log('Setting posts')

  const save = () => history.push(`/forum/forum-post/${post._id}`)

  return (
    <div className='container'>
      <Autosaving value={post.body} onChange={onChange} />
      <button className='btn btn-primary btn-lg btn-block' onClick={save}>
        <i className='fas fa-save' />&nbsp; Save
      </button>
    </div>
  )
}

ForumEdit.propTypes = {
  forum: PropTypes.object.isRequired,
  getForumPostById: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  forum: state.forum
})

export default connect(
  mapStateToProps,
  { getForumPostById }
)(ForumEdit)

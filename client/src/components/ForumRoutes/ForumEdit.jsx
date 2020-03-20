import React, { useState } from 'react'
import forumPosts from '../../utils/forumPosts'
import Autosaving from '../Editor/Autosaving'

function ForumEdit ({ match, history }) {
  const [post, setPost] = useState(
    forumPosts.filter(
      post => post.id === parseInt(match.params.id)
    )[0]
  )

  const onChange = (value) => setPost({ ...post, body: value })

  const save = () => history.push(`/forum-post/${id}`)

  const {
    id,
    author,
    title,
    body
  } = post

  return (
    <div className='container'>
      <Autosaving value={body} onChange={onChange} />
      <button className='btn btn-primary btn-lg btn-block' onClick={save}>
        <i className='fas fa-save' />&nbsp;Save
      </button>
    </div>
  )
}

export default ForumEdit

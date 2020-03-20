import React, { useState, Fragment } from 'react'
import Editor from '../Editor/Editor'
import Autosaving from '../Editor/Autosaving'

function Reply ({ comment }) {
  const [reply, setReply] = useState(false)
  const [edit, setEdit] = useState(false)
  const [replyText, setReplyText] = useState('')
  const [commentBody, setCommentBody] = useState(comment)

  const onSaveReply = (value) => {
    setReplyText(value)
  }

  const onEdit = (value) => {
    setCommentBody({ ...comment, content: value })
  }

  return (
    <div className='container border border-primary rounded my-3 p-3'>
      {
        edit ? (
          <Fragment>
            <Autosaving value={commentBody.content} onChange={onEdit} />
            <button className='btn btn-secondary' onClick={() => setEdit(false)}>Done</button>
          </Fragment>
        ) : (
          <p className='mt-2'>
            {commentBody.content}
          </p>
        )
      }
      <div className='d-flex justify-content-between'>
        {
          reply && (
            <div className='container'>
              <Autosaving onChange={onSaveReply} />
              <button className='btn btn-secondary' onClick={() => setReply(false)}>Done</button>
            </div>
          )
        }
        {
          !reply && !edit && (
            <div className='text-right mb-4'>
              <button onClick={() => setReply(true)} className='btn btn-primary mx-2'>
                <i className='fas fa-plus' /> Reply
              </button>
              <button className='btn btn-secondary mx-2' onClick={() => setEdit(true)}>
                <i className='fas fa-edit' />Edit
              </button>
            </div>
          )
        }
        <p className='text-secondary mt-2 mb-0'>- by {comment.by}</p>
      </div>
    </div>
  )
}

export default Reply

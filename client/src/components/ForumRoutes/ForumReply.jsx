import React, { useState } from 'react';
import { connect } from 'react-redux';
import { forumPostDeleteReplyToComment, forumPostEditReplyToComment } from '../../actions/forum';
import PropTypes from 'prop-types';
import MarkdownRenderer from 'react-markdown-renderer';
import Autosaving from '../Editor/Autosaving';

function ForumReply({
  postid,
  commentid,
  reply,
  auth,
  forumPostDeleteReplyToComment,
  forumPostEditReplyToComment
}) {
  const [replyText, setReplyText] = useState(reply.content)
  const [isReply, setIsReply] = useState(false)
  return (
    <div className="car card-body ml-5 border border-secondary rounded">
      <MarkdownRenderer markdown={reply.content} />
      <p className="text-muted text-right">-by {reply.by}</p>
      {reply.user === auth.user._id && (
        <button
          className='btn btn-danger mx-2'
          title=""
          onClick={() => forumPostDeleteReplyToComment(postid, commentid, reply._id)}
        >
          <i className='fas fa-trash' />
        </button>
      )}
      {reply.user === auth.user._id && (
        <button
          className='btn btn-secondary mx-2'
          onClick={() => setIsReply(true)}
        >
        {/*  */}
          <i className='fas fa-edit' />
        </button>
      )}
      {isReply && (
        <form className="container" onSubmit={async (e) => {
          e.preventDefault()
          await forumPostEditReplyToComment(postid, commentid, reply._id, replyText)
          await setIsReply(false)
        }}>
          <Autosaving value={replyText} onChange={e => setReplyText(e)} />
          <button className="btn btn-lg btn-primary btn-block" type="submit">
            <i className="fas fa-save pr-2" /> Save
          </button>
        </form>
      )}
    </div>
  )
}

ForumReply.propTypes = {
  auth: PropTypes.object.isRequired,
  forumPostDeleteReplyToComment: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
})

export default connect(mapStateToProps, { forumPostDeleteReplyToComment, forumPostEditReplyToComment })(ForumReply);

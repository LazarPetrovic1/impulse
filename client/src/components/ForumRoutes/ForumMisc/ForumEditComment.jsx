import React from 'react';
import Autosaving from '../../Editor/Autosaving'
import { connect } from 'react-redux';
import { forumPostEditComment } from '../../../actions/forum';
import MarkdownRenderer from 'react-markdown-renderer';
import PropTypes from 'prop-types';

function ForumEditComment({
  edit,
  setEdit,
  forumPostEditComment,
  onEdit,
  postid,
  commentid,
  commentBody
}) {
  return edit ? (
    <form className='container' onSubmit={async (e) => {
      e.preventDefault();
      await forumPostEditComment(postid, commentid, commentBody.content);
      await setEdit(false)
    }}>
      <div className="position-relative">
        <Autosaving value={commentBody.content} onChange={onEdit} />
        <button className="btn btn-lg btn-primary position-absolute" style={{ top: 0, right: 0 }} type="submit"><i className="fas fa-save" /></button>
      </div>
    </form>
  ) : (
    <MarkdownRenderer className='mt-2' markdown={commentBody.content} />
  )
}

ForumEditComment.propTypes = { forumPostEditComment: PropTypes.func.isRequired }

export default connect(null, { forumPostEditComment })(ForumEditComment);

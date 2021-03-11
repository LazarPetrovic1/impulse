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
      <Autosaving value={commentBody.content} onChange={onEdit} />
      <button className='btn btn-secondary' type="submit">Done</button>
    </form>
  ) : (
    <MarkdownRenderer className='mt-2' markdown={commentBody.content} />
  )
}

ForumEditComment.propTypes = { forumPostEditComment: PropTypes.func.isRequired }

export default connect(null, { forumPostEditComment })(ForumEditComment);

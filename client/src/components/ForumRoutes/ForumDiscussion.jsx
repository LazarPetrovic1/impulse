import React, { useState } from 'react';
import forumPosts from '../../utils/forumPosts';
import { Link } from 'react-router-dom';

function ForumDiscussion({ match: {params} }) {
  const [post, setPost] = useState(
    forumPosts.filter(
      post => post.id === parseInt(params.id)
    )[0]
  )

  return post ? (
    <div className="container">
      {
        post.comments.map(
          comment => (
            <div className="container border border-primary rounded my-3 p-3" key={comment.id}>
              <p className="mt-2">{comment.content}</p>
              <div className="d-flex justify-content-between">
                <button className="btn btn-primary">
                  <i className="fas fa-plus" /> Reply
                </button>
                <p className="text-secondary mt-2 mb-0">- by {comment.by}</p>
              </div>
            </div>
          )
        )
      }
    </div>
  ) : (
    <h1>Please wait</h1>
  );
}

export default ForumDiscussion;

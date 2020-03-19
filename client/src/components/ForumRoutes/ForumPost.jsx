import React, { useState, useEffect } from 'react';
import forumPosts from '../../utils/forumPosts';
import { Link } from 'react-router-dom';

function ForumPost({match: {params}}) {
  const [post, setPost] = useState({})
  useEffect(() => {
    const thePost = forumPosts.filter(
      post => post.id === parseInt(params.id)
    )
    setPost(thePost[0])
  }, [])

  const {
    id,
    author,
    title,
    body
  } = post

  return post ? (
    <div className="container">
      <h1 className="text-primary text-center display-3">{title}</h1>
      <p className="lead text-right display-4">- by {author}</p>
      <div className="lead mb-4">{body}</div>
      <div className="text-right">
        <Link className="btn btn-lg btn-primary mx-2" to={`/forum-post/${id}/discuss`}>Discussion</Link>
        <Link className="btn btn-lg btn-secondary mx-2" to="/forum">Go back</Link>
      </div>
    </div>
  ) : (
    <h1>Please wait</h1>
  );
}

export default ForumPost;

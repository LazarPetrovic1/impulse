import React from 'react';
import Editor from '../Editor/Editor';

function AddPost() {
  return (
    <div className="container">
      <h1 className="text-center text-primary display-3 my-2">Add post</h1>
      <p className="lead text-center">
        <b>Remember: </b>you don't know who you're talking to, so keep it nice and civil!
      </p>
      <Editor />
    </div>
  );
}

export default AddPost;

import React, { useState } from "react";
import Autosaving from "../Editor/Autosaving";
import { createForumPost } from "../../actions/forum";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";

function AddPost({ forum, history, createForumPost }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const { loading } = forum;

  const onChange = (value) => setBody(value);

  const onSubmit = (e) => {
    e.preventDefault();

    createForumPost({ title, body });
    history.push("/forum");
  };

  return loading ? (
    <Spinner />
  ) : (
    <div className="container mb-4" style={{ pointerEvents: "all" }}>
      <h1 className="text-center text-primary display-3 my-2">File an issue</h1>
      <form onSubmit={onSubmit}>
        <div className="text-center">
          <label htmlFor="title" style={{ marginRight: "2rem" }}>
            Title:{" "}
          </label>
          <input
            name="title"
            id="title"
            type="text"
            className="form-control mt-1 ml-0 mb-3 d-inline"
            style={{ maxWidth: "1000px" }}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <p className="lead text-center">
          <label htmlFor="body">
            <b>Remember: </b>
            <br />
            <mark style={{ backgroundColor: "yellow" }}>
              Please be straight to the point and describe the issue in as much
              detail as possible.
            </mark>
          </label>
        </p>
        <Autosaving value={body} onChange={onChange} />
        <button className="btn btn-primary btn-lg btn-block" type="submit">
          <i className="fas fa-plus" />
          &nbsp; Submit
        </button>
      </form>
    </div>
  );
}

AddPost.propTypes = {
  forum: PropTypes.object.isRequired,
  createForumPost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  forum: state.forum,
});

export default connect(mapStateToProps, { createForumPost })(AddPost);

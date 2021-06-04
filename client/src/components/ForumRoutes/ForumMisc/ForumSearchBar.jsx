import React, { useState } from "react";
import ForumSearchBarCloseButton from "../../../styled/Forum/ForumSearchBarCloseButton";
import { searchForum } from "../../../actions/forum";
import { connect } from "react-redux";
import PropTypes from "prop-types";

function ForumSearchBar({ searchForum, forum: { posts } }) {
  const [val, setVal] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    searchForum(val);
  };

  const reset = () => {
    setVal("");
    searchForum("");
  };

  return (
    <form
      onSubmit={onSubmit}
      className="form-inline my-2 my-lg-0 justify-content-center"
    >
      <span className="position-relative">
        <input
          type="text"
          value={val}
          onChange={(e) => setVal(e.target.value)}
          placeholder="Search"
          className="form-control mr-sm-2"
          aria-label="Search"
        />
        {val && <ForumSearchBarCloseButton onClick={() => reset()} />}
      </span>
      <button className="btn btn-success my-2 my-sm-0" type="submit">
        <i className="fas fa-search" />
        &nbsp;&nbsp; Search
      </button>
    </form>
  );
}

ForumSearchBar.propTypes = {
  searchForum: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  forum: state.forum,
});

export default connect(mapStateToProps, { searchForum })(ForumSearchBar);

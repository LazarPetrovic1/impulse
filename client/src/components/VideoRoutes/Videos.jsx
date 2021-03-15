import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { searchVideos, getUsersVideo, getAllVideos } from '../../actions/video';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function Videos({ location, searchVideos, getUsersVideo, getAllVideos }) {
  const [search, setSearch] = useState("")
  const onSearch = (e) => {
    setSearch(e.target.value);
    searchVideos(e.target.value, location.pathname)
  }
  return (
    <div className="container">
      <nav>
        <ul
          className="d-flex"
          style={{
            pointerEvents: "all",
            listStyleType: "none"
          }}
        >
          <li style={{ flex: 1 }} className={`d-flex justify-content-center align-items-center border-bottom ${location.pathname === "/videos-all" ? "border-primary" : "border-secondary"}`}>
            <Link to="/videos-all">All</Link>
          </li>
          <li style={{ flex: 1 }} className={`d-flex justify-content-center align-items-center border-bottom ${location.pathname === "/videos-mine" ? "border-primary" : "border-secondary"}`}>
            <Link to="/videos-mine">My videos</Link>
          </li>
          <li style={{ flex: 1 }} className="d-flex justify-content-center align-items-center">
            <Link to="/video/upload" className="btn btn-secondary my-2 rounded-circle">
              <i className="fas fa-plus" />
            </Link>
          </li>
        </ul>
      </nav>
      <div className="d-flex mb-4 mt-2">
        <input
          type="search"
          value={search}
          onChange={onSearch}
          className="form-control"
          placeholder="Type a message"
        />
        {/* <button className="btn btn-secondary" type="submit">
          <i className="fas fa-search" />
        </button> */}
      </div>
    </div>
  )
}

Videos.propTypes = {
  // video: PropTypes.object.isRequired,
  searchVideos: PropTypes.func.isRequired,
  getUsersVideo: PropTypes.func.isRequired,
  getAllVideos: PropTypes.func.isRequired,
}

// const mapStateToProps = state => ({ video: state.video })
export default connect(null, { searchVideos, getUsersVideo, getAllVideos })(Videos);

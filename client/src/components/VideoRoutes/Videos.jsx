import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

function Videos({ location }) {
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
    </div>
  )
}

export default Videos;

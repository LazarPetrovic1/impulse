import React from 'react';
import { Link } from 'react-router-dom';

function VideoList({ video }) {
  return (
    <Link
      style={{ textDecoration: "none", color: "#eee" }}
      to={`/videos/${video._id}`}
      className="d-flex m-2 border-bottom"
    >
      <video src={video.url} style={{ maxWidth: "230px", maxHeight: "130px" }} />
      <div className="d-flex flex-column pl-5">
        <h3>{video.name}</h3>
        <h5>@{video.by}</h5>
      </div>
    </Link>
  )
}

export default VideoList;

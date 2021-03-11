import React from 'react';
import { Link } from 'react-router-dom';

function VideoGrid({ video }) {
  return (
    <Link
      style={{ textDecoration: "none", color: "#eee" }}
      to={`/videos/${video._id}`}
      className="d-block m-2"
    >
      <video src={video.url} style={{ maxWidth: "230px", maxHeight: "130px" }} />
      <h5 className="m-0">{video.name}</h5>
      <p className="m-0">@{video.by}</p>
    </Link>
  )
}

export default VideoGrid;

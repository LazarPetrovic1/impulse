import React from 'react';

function Selection({ selectedToShow, setSelectedToShow }) {
  return (
    <div>
      <button
        onClick={() => setSelectedToShow("images")}
        className={`mr-3 btn btn-${selectedToShow === "images" ? "primary" : "secondary"}`}
      >
        <i className="far fa-images" />
      </button>
      <button
        onClick={() => setSelectedToShow("textual")}
        className={`mr-3 btn btn-${selectedToShow === "textual" ? "primary" : "secondary"}`}
      >
        <i className="fas fa-signature" />
      </button>
      <button
        onClick={() => setSelectedToShow("videos")}
        className={`mr-3 btn btn-${selectedToShow === "videos" ? "primary" : "secondary"}`}
      >
        <i className="fas fa-video" />
      </button>
    </div>
  )
}

export default Selection;

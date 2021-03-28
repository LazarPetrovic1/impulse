import React from 'react';

function Selection({ selectedToShow, setSelectedToShow, setPage, setHasMore }) {
  const changeMode = (val) => {
    setSelectedToShow(val)
    setPage(1)
    setHasMore(true)
  }
  return (
    <div>
      <button
        onClick={() => changeMode("all")}
        className={`mr-3 btn btn-${selectedToShow === "all" ? "primary" : "secondary"}`}
      >
        <i className="fas fa-asterisk" />
      </button>
      <button
        onClick={() => changeMode("images")}
        className={`mr-3 btn btn-${selectedToShow === "images" ? "primary" : "secondary"}`}
      >
        <i className="far fa-images" />
      </button>
      <button
        onClick={() => changeMode("textual")}
        className={`mr-3 btn btn-${selectedToShow === "textual" ? "primary" : "secondary"}`}
      >
        <i className="fas fa-signature" />
      </button>
      <button
        onClick={() => changeMode("videos")}
        className={`mr-3 btn btn-${selectedToShow === "videos" ? "primary" : "secondary"}`}
      >
        <i className="fas fa-video" />
      </button>
    </div>
  )
}

export default Selection;

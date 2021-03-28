import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { getAllVideos } from '../../../actions/video.js';
import PropTypes from 'prop-types';
import VideoGrid from '../VideoMisc/VideoGrid';
import VideoList from '../VideoMisc/VideoList';
import Videos from '../Videos';

function VideoAll({ getAllVideos, video, auth, location }) {
  const [gotVids, setGotVids] = useState(false)
  const [isGrid, setIsGrid] = useState(true)
  useEffect(() => {
    (async function() {
      try {
        await getAllVideos(auth.user._id)
        await setGotVids(true)
      } catch(e) {
        console.warn("Error, dude");
      }
    }());
    // eslint-disable-next-line
  }, [])

  const videosByCategory = (cat) =>
    video.videos.filter(v => v.category.includes(cat)).length > 0 && (
      <Fragment>
        <article>
          <h2 className="text-primary">Category - {cat}</h2>
          <div className={isGrid ? "d-flex flex-wrap" : ""}>
            {gotVids && isGrid &&
              video.videos.filter(v => v.category.includes(cat)).length > 0 &&
              video.videos.filter(v => v.category.includes(cat)).map(vid => (
                <VideoGrid key={vid._id} video={{ ...vid }} />
            ))}
            {gotVids && !isGrid &&
              video.videos.filter(v => v.category.includes(cat)).length > 0 &&
              video.videos.filter(v => v.category.includes(cat)).map(vid => (
                <VideoList key={vid._id} video={{ ...vid }} />
            ))}
          </div>
        </article>
        <hr/>
      </Fragment>
    )

  return (
    <div className="container" style={{ pointerEvents: "all" }}>
      <Videos location={location} />
      <div className="text-right">
        <button
          title="Grid view"
          className={`mr-2 btn btn-${isGrid ? "primary" : "secondary"} btn-lg`}
          onClick={() => setIsGrid(true)}
        >
          <i className="fas fa-th" />
        </button>
        <button
          title="List view"
          className={`ml-2 btn btn-${isGrid ? "secondary" : "primary"} btn-lg`}
          onClick={() => setIsGrid(false)}
        >
          <i className="fas fa-list" />
        </button>
      </div>
      {videosByCategory("Film")}
      {videosByCategory("Animation")}
      {videosByCategory("Vehicles")}
      {videosByCategory("Music")}
      {videosByCategory("Sports")}
      {videosByCategory("E-Sports")}
      {videosByCategory("Vlog")}
      {videosByCategory("Comedy")}
      {videosByCategory("News")}
      {videosByCategory("Politics")}
      {videosByCategory("Education")}
      {videosByCategory("Science")}
      {videosByCategory("Technology")}
      {videosByCategory("DIY")}
      {videosByCategory("Activism")}
      {videosByCategory("Non-profits")}
      {videosByCategory("Other")}
    </div>
  )
}

VideoAll.propTypes = {
  auth: PropTypes.object.isRequired,
  getAllVideos: PropTypes.func.isRequired,
  video: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
  video: state.video
})

export default connect(mapStateToProps, { getAllVideos })(VideoAll);

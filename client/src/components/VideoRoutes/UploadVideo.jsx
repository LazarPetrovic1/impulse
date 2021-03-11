import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createVideo } from '../../actions/video.js';
import PropTypes from 'prop-types';

function UploadVideo({ createVideo, history }) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [selectedFile, setSelectedFile] = useState({})
  const [completion, setCompletion] = useState(0)
  const onVideoUpload = (e) => {
		setSelectedFile(e.target.files[0])
	}

  const onSubmit = (e) => {
    e.preventDefault()
    if (!selectedFile) return
    const reader = new FileReader()
    reader.readAsDataURL(selectedFile)
    reader.onprogress = (e) => {
      if (e.lengthComputable) {
        let progress = parseInt( ((e.loaded / e.total) * 100), 10 );
        setCompletion(progress)
      }
    }
    reader.onloadend = () => uploadVideo(reader.result)
    reader.onerror = () => console.error('AHHHHHHHH!!')
  }

  const uploadVideo = async (base64EncodedImage) => {
    try {
      await createVideo(base64EncodedImage, name, description)
      await setSelectedFile('')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="container" style={{ pointerEvents: "all" }}>
      <form onSubmit={onSubmit}>
        <div className="progress mb-3" style={{ height: "22px" }}>
          <div
            className="progress-bar progress-bar-striped progress-bar-animated"
            role="progressbar"
            aria-valuenow={completion}
            aria-valuemin={0}
            aria-valuemax={100}
            style={{ width: `${completion}%` }}
          />
        </div>
        <div className="form-group mb-4">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            placeholder="Video name"
          />
        </div>
        <div className="form-group mb-4">
          <label htmlFor="name">Description</label>
          <input
            type="text"
            className="form-control"
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
            placeholder="Video description"
          />
        </div>
        <div className="form-group d-flex">
          <label htmlFor="file" className="pointer" />
          <input
            required
            onChange={onVideoUpload}
            type="file"
            className="form-control-file pointer"
            id="file"
            name="file"
          />
        </div>
        <div className="text-right">
          {completion < 100 ? (
            <button className="btn btn-secondary px-2" type="submit">
              <i className="fas fa-paper-plane pr-2" /> Submit
            </button>
          ) : (
            <Link to="/videos" className="btn btn-success px-2" type="submit">
              <i className="fas fa-check-circle pr-2" /> Done
            </Link>
          )}
        </div>
      </form>
    </div>
  )
}

UploadVideo.propTypes = {
  createVideo: PropTypes.func.isRequired,
}

export default connect(null, { createVideo })(UploadVideo);

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createVideo } from '../../actions/video.js';
import SetVideoCategories from './VideoMisc/SetVideoCategories';
import PropTypes from 'prop-types';

function UploadVideo({ createVideo, history }) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [selectedFile, setSelectedFile] = useState({})
  const [category, setCategory] = useState("")
  const [completion, setCompletion] = useState(0)
  const [meta, setMeta] = useState({})

  const getVideoDuration = async (f) => {
    const fileCallbackToPromise = (fileObj) => {
      return Promise.race([
        new Promise((resolve) => {
          if (fileObj instanceof HTMLImageElement) fileObj.onload = resolve;
          else fileObj.onloadedmetadata = resolve;
        }),
        new Promise((_, reject) => {
          setTimeout(reject, 1000);
        }),
      ]);
    };

    const objectUrl = URL.createObjectURL(f);
    // const isVideo = type.startsWith('video/');
    const video = document.createElement("video");
    video.src = objectUrl;
    await fileCallbackToPromise(video);
    return {
      duration: video.duration,
      width: video.videoWidth,
      height: video.videoHeight,
    };
  }

  const onVideoUpload = async (e) => {
    e.persist()
		await setSelectedFile(e.target.files[0])
    const meta = await getVideoDuration(e.target.files[0])
    await setMeta(meta)
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
      await createVideo(base64EncodedImage, name, description, meta, category)
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
            accept="video/*"
            type="file"
            className="form-control-file pointer"
            id="file"
            name="file"
          />
        </div>
        {category && (
          <div className="d-flex justify-content-between">
            <h3>Category: {category}</h3>
            <button className="btn btn-danger" onClick={() => setCategory("")}>
              <i className="fas fa-times" />
            </button>
          </div>
        )}
        {category.length < 1 && <h5>Choose a category:</h5>}
        <SetVideoCategories category={category} setCategory={setCategory} />
        <div className="text-right">
          {completion < 100 ? (
            <button
              className="btn btn-secondary px-2"
              type="submit"
              disabled={
                !name ||
                !description ||
                !category ||
                !selectedFile
              }
            >
              <i className="fas fa-paper-plane pr-2" /> Submit
            </button>
          ) : (
            <Link to="/videos-all" className="btn btn-success px-2" type="submit">
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

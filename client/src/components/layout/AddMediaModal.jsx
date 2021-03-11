import React, { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createImage } from '../../actions/image';
import { uploadProfileImage } from '../../actions/auth';

const flex = {
  f1: { flex: 1 },
  f3: { flex: 3 }
}

function AddMediaModal({
  setAddFilesModal,
  previewSource,
  onImageUpload,
  onSubmit,
  previewFile,
  selectedFile,
  content,
  setContent,
  fn,
  createImage,
  uploadProfileImage
}) {
  const { isDarkTheme } = useContext(ThemeContext)

  return (
    <div
      className="modal d-flex justify-content-center align-items-center"
      style={{ backgroundColor: isDarkTheme ? 'rgba(170, 170, 170, 0.5)' : 'rgba(0, 0, 0, 0.75)' }}
      tabIndex="-1"
      role="dialog"
    >
      <div className="modal-dialog" style={{ minWidth: "50%" }} role="document">
        <div className="modal-content" style={{ backgroundColor: isDarkTheme ? '#111' : 'rgba(170, 170, 170, 0.5)' }}>
          <div className="modal-header" style={{ backgroundColor: isDarkTheme ? '#111' : '#fff' }}>
            <h5 className="modal-title">Add Files</h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={() => setAddFilesModal(false)}
            >
              <span aria-hidden="true">
                <i className="fas fa-times text-danger"></i>
              </span>
            </button>
          </div>
          <div className="modal-body" style={{ backgroundColor: isDarkTheme ? '#111' : '#fff' }}>
            <form onSubmit={(e) => onSubmit(e, fn === "post" ? createImage : uploadProfileImage)}>
              <div className="form-group mb-4">
                <label htmlFor="content">Post status</label>
                <input
                  type="text"
                  className="form-control"
                  value={content}
                  onChange={e => setContent(e.target.value)}
                />
              </div>
              <div className="form-group d-flex">
                <label htmlFor="file" />
                <input
                  required
                  style={flex.f3}
                  onChange={onImageUpload}
                  type="file"
                  className="form-control-file"
                  id="file"
                  name="file"
                />
                <button style={flex.f1} className="btn btn-secondary px-2" type="submit">
                  <i className="fas fa-paper-plane pr-2"></i> Submit
                </button>
              </div>
              {selectedFile && (
                <button type="button" className="btn btn-primary mb-3" onClick={() => previewFile(selectedFile)}>
                  <i className="fas fa-image pr-2"></i> Preview
                </button>
              )}
              {previewSource && (
                <img
                  src={previewSource}
                  alt="chosen"
                  style={{ height: '300px', display: 'block' }}
                />
              )}
            </form>
            <Link to="/video/upload">Add a video instead!</Link>
          </div>
          <div className="modal-footer" style={{ backgroundColor: isDarkTheme ? '#111' : '#fff' }}>
            <button
              type="button"
              className="btn btn-danger"
              data-dismiss="modal"
              onClick={() => setAddFilesModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

AddMediaModal.propTypes = {
  createImage: PropTypes.func.isRequired,
  uploadProfileImage: PropTypes.object.isRequired,
}

export default connect(
  null,
  { createImage, uploadProfileImage }
)(AddMediaModal);

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { LanguageContext } from "../../contexts/LanguageContext";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createImage } from "../../actions/image";
import { uploadProfileImage } from "../../actions/auth";
import Modal from "../utils/Modal";
import { addmediamodalcomponent } from "../../utils/langObject";

const {
  _postdescription,
  _submit,
  _preview,
  _addvideo,
  _chosen,
  _addfiles,
  _addprofile,
} = addmediamodalcomponent;

const flex = {
  f1: { flex: 1 },
  f3: { flex: 3 },
};

function AddMediaModal({
  previewSource,
  onImageUpload,
  onSubmit,
  previewFile,
  selectedFile,
  content,
  setContent,
  fn,
  createImage,
  uploadProfileImage,
  show,
  onClose,
}) {
  const { language } = useContext(LanguageContext);
  const submitForm = (e) => {
    e.preventDefault();
    onSubmit(e, fn === "post" ? createImage : uploadProfileImage);
    onClose();
  };

  return (
    <Modal
      show={show}
      onClose={onClose}
      title={fn === "post" ? _addfiles[language] : _addprofile[language]}
      provideOwnClosure
    >
      <form onSubmit={submitForm}>
        <div className="form-group mb-4">
          <label htmlFor="content">{_postdescription[language]}</label>
          <input
            type="text"
            className="form-control"
            value={content}
            onChange={(e) => setContent(e.target.value)}
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
          <button
            style={flex.f1}
            className="btn btn-secondary px-2"
            type="submit"
          >
            <i className="fas fa-paper-plane pr-2" /> {_submit[language]}
          </button>
        </div>
        {selectedFile && (
          <button
            type="button"
            className="btn btn-primary mb-3"
            onClick={() => previewFile(selectedFile)}
          >
            <i className="fas fa-image pr-2" /> {_preview[language]} Preview
          </button>
        )}
        {previewSource && (
          <img
            src={previewSource}
            alt={_chosen[language]}
            style={{ height: "300px", display: "block" }}
          />
        )}
      </form>
      <Link to="/video/upload">{_addvideo[language]}</Link>
    </Modal>
  );
}

AddMediaModal.propTypes = {
  createImage: PropTypes.func.isRequired,
  uploadProfileImage: PropTypes.func.isRequired,
};

export default connect(null, { createImage, uploadProfileImage })(
  AddMediaModal
);

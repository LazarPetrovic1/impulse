import React, { useState } from "react";
import Modal from "../utils/Modal";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { postInGroup } from "../../actions/group";

function GroupPost({
  showPostItems,
  setShowPostItems,
  group: { group },
  postInGroup,
  id,
}) {
  const [body, setBody] = useState("");
  const [selectedFile, setSelectedFile] = useState([]); // eslint-disable-line
  const [isSelectedFile, setIsSelectedFile] = useState(false); // eslint-disable-line
  const [previewSource, setPreviewSource] = useState([]);

  const clearFiles = async () => {
    await setSelectedFile([]);
    await setIsSelectedFile(false);
    await setPreviewSource([]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const post = {
        body,
        isMedia: isSelectedFile,
        media: previewSource,
      };
      await postInGroup(id, post);
      await setShowPostItems(false);
      await clearFiles();
      await setBody("");
    } catch (e) {
      console.warn(e.message);
    }
  };

  const onImageUpload = async (e) => {
    e.persist();
    let results = [];
    await setSelectedFile([...e.target.files]);
    await setIsSelectedFile(true);
    await Array.from(e.target.files).forEach(async (item) => {
      const reader = new FileReader();
      await reader.readAsDataURL(item);
      reader.onload = () =>
        results.push({
          res: reader.result,
          type: item.type.split("/")[0],
          name: item.name,
        });
    });
    await setPreviewSource(results);
  };

  return (
    <Modal
      title={`Post in ${group.name}`}
      onClose={() => setShowPostItems(false)}
      show={showPostItems}
      provideOwnClosure
    >
      <form onSubmit={onSubmit}>
        <div className="form-group text-light">
          <label htmlFor="body">Post</label>
          <input
            type="text"
            className="form-control"
            id="body"
            name="body"
            onChange={(e) => setBody(e.target.value)}
            value={body}
            placeholder="Write something"
          />
        </div>
        <div className="form-group">
          <div className="custom-file">
            <input
              type="file"
              className="custom-file-input"
              id="files"
              name="files"
              onChange={onImageUpload}
              aria-describedby="files"
              multiple
            />
            <label htmlFor="files" className="custom-file-label">
              Add files
            </label>
          </div>
        </div>
        {previewSource.length > 0 && (
          <div>
            {previewSource.map((file) => (
              <div className="form-group" key={file.name}>
                {file.type === "image" && (
                  <img
                    style={{
                      maxHeight: "80px",
                      width: "auto",
                    }}
                    src={file.res}
                    alt={file.type}
                  />
                )}
                <br />
                <span>{file.name}</span>
              </div>
            ))}
            <button className="btn btn-danger" onClick={clearFiles}>
              <i className="fas fa-times" />
            </button>
          </div>
        )}
        <div className="d-flex justify-content-end">
          <button className="btn btn-primary" type="submit">
            <i className="fas fa-paper-plane" />
          </button>
        </div>
      </form>
    </Modal>
  );
}

const mapStateToProps = (state) => ({
  group: state.group,
});

GroupPost.propTypes = {
  group: PropTypes.object.isRequired,
  showPostItems: PropTypes.bool.isRequired,
  setShowPostItems: PropTypes.func.isRequired,
  postInGroup: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { postInGroup })(GroupPost);

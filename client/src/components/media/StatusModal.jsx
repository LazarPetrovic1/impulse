import React, { useState, Fragment } from "react";
import Modal from "../utils/Modal";
import EditIcon from "../utils/icons/EditIcon";
import DeleteIcon from "../utils/icons/DeleteIcon";
import { deleteStatus, editStatus } from "../../actions/status";
import { connect } from "react-redux";
import PropTypes from "prop-types";

function StatusModal({ show, onClose, statusitem, deleteStatus, editStatus }) {
  const [edit, setEdit] = useState(false);
  const [status, setStatus] = useState(statusitem.body);
  const removePost = async () => {
    try {
      await deleteStatus(statusitem._id);
      await onClose();
    } catch (e) {
      console.warn(e.message);
    }
  };
  const editPost = async () => {
    try {
      const newStatus = {
        ...statusitem,
        body: status,
      };
      await editStatus(newStatus, statusitem._id);
      await onClose();
    } catch (e) {
      console.warn(e.message);
    }
  };
  return (
    <Modal
      title="Additional options"
      show={show}
      onClose={onClose}
      provideOwnClosure
    >
      {edit ? (
        <Fragment>
          <div className="form-group">
            <label htmlFor="status">Post text</label>
            <input
              type="text"
              className="form-control"
              id="status"
              name="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            />
          </div>
          <div
            className="form-group d-flex justify-content-between"
            disabled={status.length <= 0}
          >
            <button
              className="btn btn-danger btn-lg"
              onClick={() => setEdit(false)}
            >
              <i className="fas fa-ban pr-2" /> Cancel
            </button>
            <button className="btn btn-primary btn-lg" onClick={editPost}>
              <i className="fas fa-paper-plane pr-2" /> Submit
            </button>
          </div>
        </Fragment>
      ) : (
        <div className="form-group d-flex justify-content-between">
          <button
            className="btn btn-secondary btn-lg"
            onClick={() => setEdit(true)}
          >
            <EditIcon width={50} height={40} text="Edit post" />
          </button>
          <button className="btn btn-danger btn-lg" onClick={removePost}>
            <DeleteIcon width={50} height={40} text="Delete post" />
          </button>
        </div>
      )}
    </Modal>
  );
}

StatusModal.propTypes = {
  deleteStatus: PropTypes.func.isRequired,
  editStatus: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  statusitem: PropTypes.object.isRequired,
};

export default connect(null, { deleteStatus, editStatus })(StatusModal);

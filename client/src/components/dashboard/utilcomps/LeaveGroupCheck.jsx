import React from "react";
import Modal from "../../utils/Modal";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

function LeaveGroupCheck({
  show,
  onClose,
  groupId,
  groupname,
  history,
  ingroup,
}) {
  const onSubmit = async (e) => {
    e.preventDefault();
    await onClose();
    if (ingroup) {
      await history.push("/");
    }
  };
  return (
    <Modal
      title={`Leave ${groupname}?`}
      show={show}
      onClose={onClose}
      provideOwnClosure
    >
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <h3>Are you sure you want to leave {groupname}?</h3>
        </div>
        <div className="d-flex justify-content-end">
          <div className="d-flex justify-content-between mx-5 my-3">
            <button className="btn btn-success btn-lg" type="submit">
              Yes
            </button>
            <button
              className="btn btn-danger btn-lg"
              onClick={onClose}
              type="button"
            >
              No
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
}

LeaveGroupCheck.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  groupId: PropTypes.string.isRequired,
  groupname: PropTypes.string.isRequired,
};

export default withRouter(LeaveGroupCheck);

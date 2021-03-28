import React, { useState } from 'react';
import Modal from '../../utils/Modal';
import { deleteGroup } from '../../../actions/group';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

function DeleteGroupCheck({ show, onClose, deleteGroup, groupId, groupname, history, ingroup }) {
  const [groupName, setGroupName] = useState("")
  const onSubmit = async (e) => {
    e.preventDefault()
    await deleteGroup(groupId)
    await onClose()
    if (ingroup) {
      await history.push("/")
    }
  }
  return (
    <Modal title={`Delete ${groupname}?`} show={show} onClose={onClose} provideOwnClosure>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="groupName">Enter group name</label>
          <input
            type="text"
            name="groupName"
            className="form-control"
            value={groupName}
            placeholder="Enter group name"
            onChange={e => setGroupName(e.target.value)}
          />
        </div>
        <div className="d-flex justify-content-end">
          <button className="btn btn-primary" disabled={groupName !== groupname}>
            <i className="fas fa-paper-plane" /> Submit
          </button>
        </div>
      </form>
    </Modal>
  )
}

DeleteGroupCheck.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  deleteGroup: PropTypes.func.isRequired,
  groupId: PropTypes.string.isRequired,
  groupname: PropTypes.string.isRequired,
}

export default connect(null, { deleteGroup })(withRouter(DeleteGroupCheck));

import React, { useState } from 'react';
import Modal from '../../utils/Modal';
import { connect } from 'react-redux';
import Friend from './Friend';
import Spinner from '../../layout/Spinner';
import { createGroup } from '../../../actions/group';
import PropTypes from 'prop-types';

function AddGroup({ title, show, setShow, onClose, auth: { user, loading }, createGroup }) {
  const [imgb64, setImgb64] = useState("")
  const [groupInfo, setGroupInfo] = useState({
    name: "",
    about: "",
    people: [user._id],
    admin: user._id,
    requiresAdmin: false,
    isSeen: true,
  })
  const onImageUpload = (e) => {
    e.persist();
    console.log(e);
    const reader = new FileReader()
    reader.readAsDataURL(e.target.files[0])
    reader.onloadend = () => setImgb64(reader.result)
  }
  const {
    name,
    about,
    people, /* eslint-disable-line */
    admin, /* eslint-disable-line */
    requiresAdmin,
    isSeen,
  } = groupInfo
  const onChange = e => setGroupInfo({ ...groupInfo, [e.target.name]: e.target.value })
  const onSubmit = async e => {
    e.preventDefault()
    if (!imgb64) return
    await createGroup({
      people,
      admin,
      about,
      requiresAdmin,
      isSeen,
      name,
      data: imgb64
    })
    await setShow(false)
    await setGroupInfo({
      name: "",
      about: "",
      people: [user._id],
      admin: user._id,
      requiresAdmin: false,
      isSeen: true,
    })
  }
  return user && user.friends && !loading ? (
    <Modal title={title} show={show} onClose={onClose} provideOwnClosure>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Group name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter group name"
            id="name"
            name="name"
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="about">About the group</label>
          <textarea
            className="form-control"
            placeholder="About the group"
            id="about"
            name="about"
            value={about}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          {user.friends && user.friends.length > 0 ? user.friends.map(fr => (
            <Friend
              key={fr.user}
              id={fr.user}
              groupInfo={groupInfo}
              setGroupInfo={setGroupInfo}
            />
          )) : (
            <h2 className="text-center text-warning">You don't have any friends... Loser</h2>
          )}
        </div>
        <div className="form-group">
          <h2 className="text-primary">{user.firstName} {user.lastName} will be the admin.</h2>
          <p>This can be changed later.</p>
        </div>
        <div className="form-group">
          <div className="input-group mb-3">
            <div className="custom-file">
              <input
                type="file"
                className="custom-file-input"
                id="image"
                name="image"
                onChange={onImageUpload}
                accept="image/*"
              />
              <label className="custom-file-label" htmlFor="image">Choose file</label>
            </div>
          </div>
          {imgb64 && (
            <div className="form-group p-2">
              <img
                src={imgb64}
                alt=""
                className="m-auto"
                width={100}
                height={100}
              />
            </div>
          )}
        </div>
        <div className="form-group">
          <div className="d-flex align-items-center">
            <input
              className="mr-2"
              type="checkbox"
              name="requiresAdmin"
              id="requiresAdmin"
              value={requiresAdmin}
              onChange={() => setGroupInfo({ ...groupInfo, requiresAdmin: !requiresAdmin })}
            />
            <label className="mb-0" htmlFor="requiresAdmin">
              The admin will have to approve every action that requires autonomy.
            </label>
          </div>
          <div className="d-flex align-items-center">
            <input
              className="mr-2"
              type="checkbox"
              name="isSeen"
              id="isSeen"
              value={isSeen}
              onChange={() => setGroupInfo({ ...groupInfo, isSeen: !isSeen })}
            />
            <label htmlFor="isSeen" className="mb-0">
              The group will be seen by everyone or just by (friends of group members).
            </label>
          </div>
        </div>
        <div className="d-flex justify-content-end">
          <button type="submit" className="btn btn-primary">
            <i className="fas fa-paper-plane pr-2" />
            Submit
          </button>
        </div>
      </form>
    </Modal>
  ) : <Spinner />
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

AddGroup.propTypes = {
  auth: PropTypes.object.isRequired,
  createGroup: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, { createGroup })(AddGroup);

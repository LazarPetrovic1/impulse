import React from "react";
import Modal from "../../utils/Modal";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { unfriendPerson, blockPerson } from "../../../actions/auth";

// DODAJ NEPOSTOJECE FUNKCIJE

function GuestMoreOptions({
  title,
  show,
  onClose,
  auth: { user, loading },
  addFriend,
  isFriends,
  unfriendPerson,
  blockPerson,
  blockedId,
}) {
  const removeFriend = () => {
    unfriendPerson({ senderId: user._id, blockedId });
    window.location.reload();
  };
  const blockThisPerson = () => {
    blockPerson({ senderId: user._id, blockedId });
    window.location.reload();
  };
  return (
    <Modal title={title} show={show} onClose={onClose} provideOwnClosure>
      <section>
        <div className="form-group">
          {isFriends === "friends" ? (
            <button
              className="btn btn-block btn-warning"
              onClick={removeFriend}
            >
              Remove friend
            </button>
          ) : isFriends === "pending" ? (
            <button className="btn btn-block btn-secondary">
              Cancel friend request
            </button>
          ) : (
            <button className="btn btn-block btn-primary" onClick={addFriend}>
              Add friend
            </button>
          )}
        </div>
        <div className="form-group" onClick={blockThisPerson}>
          <button className="btn btn-block btn-danger">Block person</button>
        </div>
      </section>
    </Modal>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

GuestMoreOptions.propTypes = {
  auth: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  addFriend: PropTypes.func.isRequired,
  unfriendPerson: PropTypes.func.isRequired,
  blockPerson: PropTypes.func.isRequired,
  blockedId: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, {
  unfriendPerson,
  blockPerson,
})(GuestMoreOptions);

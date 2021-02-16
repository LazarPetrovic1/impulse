import React, { useContext } from 'react';
import Moment from 'react-moment';
import { SocketContext } from '../../contexts/SocketContext';
import { connect } from 'react-redux';
import { getUserByUsername } from '../../utils/users';
import PropTypes from 'prop-types';

// ACCEPT FRIEND REQUEST?!?

function Notification({ not, auth }) {
  const { socket } = useContext(SocketContext)

  const addFriend = async () => {
    if (not.type === 'friendrequest') {
      const senderUser = await getUserByUsername(not.text.split("@")[1].split(")")[0])
      await console.log(senderUser);
      await socket.emit('acceptFriend', { senderId: senderUser._id, accepterId: auth.user._id })
      await socket.emit("rejectFriend", { notifId: not._id }) // deletes notif
      await socket.on('friendAccepted', (accepterUser) => window.location.reload())
    }
  }

  const rejectFriend = () => {
    socket.emit('rejectFriend', ({ notifId: not._id }))
    socket.on('friendRejected', (accepterUser) => window.location.reload())
  }

  return (
    <div className={`m-0 p-2 d-flex justify-content-center align-items-center ${!not.read && "bg-info text-light"}`}>
      <i className="fas fa-envelope-open px-3" />
      <p className="m-0">
        <span className="pr-2">{not.text}</span>
        (<Moment format="DD.MM.YYYY">{not.date}</Moment>)
      </p>
      {not.type === 'friendrequest' && (
        <div>
          <button className="btn btn-success" onClick={addFriend}>
            <i className="fas fa-check" />
          </button>
          <button className="btn btn-danger">
            <i className="fas fa-times" />
          </button>
        </div>
      )}
    </div>
  )
}

Notification.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
})

export default connect(
  mapStateToProps
)(Notification)

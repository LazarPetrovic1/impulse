import React, { useContext } from "react";
import Moment from "react-moment";
import { SocketContext } from "../../contexts/SocketContext";
import { connect } from "react-redux";
import { getUserByUsername } from "../../utils/users";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function Notification({ not, auth }) {
  const { socket } = useContext(SocketContext);

  const addFriend = async () => {
    if (not.type === "friendrequest") {
      const senderUser = await getUserByUsername(
        not.text.split("@")[1].split(")")[0]
      );
      await socket.emit("acceptFriend", {
        senderId: senderUser._id,
        accepterId: auth.user._id,
      });
      await socket.emit("rejectFriend", { notifId: not._id }); // deletes notif
      await socket.on("friendAccepted", (accepterUser) =>
        window.location.reload()
      );
    }
  };

  const rejectFriend = () => {
    socket.emit("rejectFriend", { notifId: not._id });
    socket.on("friendRejected", (accepterUser) => window.location.reload());
  };

  return (
    <div
      className={`m-0 p-2 d-flex justify-content-center align-items-center border-bottom ${
        not.read ? "bg-dark text-light" : "bg-info text-light"
      }`}
    >
      <i className="fas fa-envelope-open px-3" />
      <div className="d-flex flex-column">
        <p className="m-0">
          <Link
            to={not.url ? not.url : "/"}
            className="text-decoration-none text-light"
          >
            <span className="pr-2">{not.text}</span>(
            <Moment format="DD.MM.YYYY">{not.date}</Moment>)
          </Link>
        </p>
        {not.type === "friendrequest" && (
          <div className="pt-2 d-flex justify-content-around">
            <button className="btn btn-success" onClick={addFriend}>
              <i className="fas fa-check" />
            </button>
            <button className="btn btn-danger" onClick={rejectFriend}>
              <i className="fas fa-times" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

Notification.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Notification);

import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Notification from "./Notif";
import { Link } from "react-router-dom";

function Notifs({ auth: { user }, notifs: { notifs }, setDropdown }) {
  return (
    <div
      className="position-absolute m-0 p-0"
      style={{ minWidth: "300px", zIndex: 10 }}
    >
      {notifs && notifs.map((not) => <Notification not={not} key={not._id} />)}
      <Link
        to="/notifs"
        className="btn btn-secondary text-light btn-block"
        onClick={() => setDropdown(false)}
      >
        See all
      </Link>
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  notifs: state.notifs,
});

Notifs.propTypes = {
  auth: PropTypes.object.isRequired,
  notifs: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, null)(Notifs);

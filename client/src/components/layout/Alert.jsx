import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { removeAlert } from '../../actions/alert';

const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map(alert => (
    <div
      className={`alert alert-${alert.alertType} alert-dismissible fade show`}
      role="alert"
      key={alert.id}
      style={{ pointerEvents: "all" }}
    >
      {alert.msg}
      <button
        type="button"
        onChange={() => removeAlert(alert.id)}
        className="close"
        data-dismiss="alert"
        aria-label="Close"
      >
      <span aria-hidden="true">
        <i className="fas fa-times" />
      </span>
    </button>
  </div>
));

Alert.propTypes = {
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  alerts: state.alert
});

export default connect(mapStateToProps)(Alert);

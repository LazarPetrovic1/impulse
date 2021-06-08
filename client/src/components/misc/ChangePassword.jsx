import React, { useState, useEffect } from "react";
import DashCenter from "../../styled/DashCenter";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { mailToChangePassword, changePassword } from "../../actions/auth";

function ChangePassword({
  auth: { user },
  mailToChangePassword,
  changePassword,
  location,
  history,
}) {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (user && user.email) {
      setEmail(user.email);
    }
  }, [user]);

  const onSubmit = async (e) => {
    e.preventDefault();
    await mailToChangePassword(email);
  };

  const onPasswordChange = async (e) => {
    e.preventDefault();
    await changePassword(newPassword);
    await history.push("/");
  };

  return location.search ? (
    <DashCenter
      display="block"
      maxw="1300px"
      className="mt-5"
      style={{ pointerEvents: "all" }}
    >
      <form
        style={{ maxWidth: "500px" }}
        onSubmit={onPasswordChange}
        className="m-auto border p-5"
      >
        <h2 className="text-primary text-center mb-5">Change your password</h2>
        <div className="form-group">
          <label htmlFor="password">New password</label>
          <input
            type="password"
            className="form-control mt-3"
            placeholder="Enter password"
            id="password"
            name="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password2">Confirm password</label>
          <input
            type="password"
            className="form-control mt-3"
            placeholder="Enter password2"
            id="password2"
            name="password2"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className="form-group d-flex justify-content-end mt-5">
          <button
            className="btn btn-secondary"
            disabled={newPassword !== confirmPassword}
          >
            <i className="fas fa-paper-plane pr-2" /> Submit
          </button>
        </div>
      </form>
    </DashCenter>
  ) : (
    <DashCenter
      display="block"
      maxw="1300px"
      className="mt-5"
      style={{ pointerEvents: "all" }}
    >
      <form
        style={{ maxWidth: "500px" }}
        onSubmit={onSubmit}
        className="m-auto border p-5"
      >
        <h2 className="text-primary text-center mb-5">Reset/Change Password</h2>
        <div className="form-group">
          <label htmlFor="email">Confirm email</label>
          <br />
          <small>
            This is the email you use to log in to Impulse, but you can have the
            reset sent to any other email you have, if you wish so.
          </small>
          <br />
          <input
            type="email"
            className="form-control mt-3"
            placeholder="Enter email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group d-flex justify-content-end mt-5">
          <button className="btn btn-secondary">
            <i className="fas fa-paper-plane pr-2" /> Submit
          </button>
        </div>
      </form>
    </DashCenter>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

ChangePassword.propTypes = {
  auth: PropTypes.object.isRequired,
  mailToChangePassword: PropTypes.func.isRequired,
  changePassword: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
  mailToChangePassword,
  changePassword,
})(ChangePassword);

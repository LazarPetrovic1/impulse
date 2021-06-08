import React, { useState, useEffect, useContext } from "react";
import DashCenter from "../../styled/DashCenter";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { mailToChangePassword, changePassword } from "../../actions/auth";
import { changepasswordcomponent } from "../../utils/langObject";
import { LanguageContext } from "../../contexts/LanguageContext";

const {
  _resetpass,
  _confirmemail,
  _small,
  _changepass,
  _newpassword,
  _confirmpass,
  _submit,
} = changepasswordcomponent;

function ChangePassword({
  auth: { user },
  mailToChangePassword,
  changePassword,
  location,
  history,
}) {
  const { language } = useContext(LanguageContext);
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
        <h2 className="text-primary text-center mb-5">
          {_changepass[language]}
        </h2>
        <div className="form-group">
          <label htmlFor="password">{_newpassword[language]}</label>
          <input
            type="password"
            className="form-control mt-3"
            placeholder={_newpassword[language]}
            id="password"
            name="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password2">{_confirmpass[language]}</label>
          <input
            type="password"
            className="form-control mt-3"
            placeholder={_confirmpass[language]}
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
            <i className="fas fa-paper-plane pr-2" /> {_submit[language]}
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
        <h2 className="text-primary text-center mb-5">
          {_resetpass[language]}
        </h2>
        <div className="form-group">
          <label htmlFor="email">{_confirmemail[language]}</label>
          <br />
          <small>{_small[language]}</small>
          <br />
          <input
            type="email"
            className="form-control mt-3"
            placeholder={_confirmemail[language]}
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group d-flex justify-content-end mt-5">
          <button className="btn btn-secondary">
            <i className="fas fa-paper-plane pr-2" /> {_submit[language]}
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

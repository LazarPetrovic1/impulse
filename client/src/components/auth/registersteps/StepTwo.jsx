import React, { Fragment, useContext } from "react";
import { registercomponent } from "../../../utils/langObject";
import { LanguageContext } from "../../../contexts/LanguageContext";
import AuthPassword from "../../../styled/AuthPassword";
import { setAlert } from "../../../actions/alert";
import { connect } from "react-redux";
import { checksecondstep } from "../../../utils/register";

const {
  basicprofileinfo,
  _username,
  looksgood,
  pleaseenter,
  _password,
  confirmpass,
  passwordnotconfirmed,
} = registercomponent;

function StepTwo({
  username,
  password,
  password2,
  onChange,
  viewPass,
  setViewPass,
  viewPass2,
  setViewPass2,
  onProgressChange,
  setAlert,
}) {
  const { language } = useContext(LanguageContext);
  const proceedToStepThree = async () => {
    try {
      const { errors, isGood } = await checksecondstep(username, password);
      if (isGood) {
        onProgressChange([username, password, password2]);
      } else {
        errors.forEach((error) => setAlert(error, "warning"));
      }
    } catch (e) {
      console.warn(e.message);
    }
  };
  return (
    <Fragment>
      <h2 className="mb-2 ">{basicprofileinfo[language]}</h2>
      <label htmlFor="username">{_username[language]}</label>
      <div className="input-group">
        <div className="input-group-prepend">
          <span className="input-group-text" id="inputGroupPrepend3">
            @
          </span>
        </div>
        <input
          type="text"
          className={
            username.length > 2
              ? `form-control is-valid`
              : "form-control is-invalid"
          }
          name="username"
          onChange={onChange}
          value={username}
          placeholder={_username[language]}
          required
        />
        {username.length > 2 ? (
          <div className="valid-feedback">{looksgood[language]}</div>
        ) : (
          <div className="invalid-feedback">
            {pleaseenter[language]} {_username[language]}
          </div>
        )}
      </div>
      <div className="form-group position-relative">
        <label htmlFor="password">{_password[language]}</label>
        <input
          type={viewPass ? "text" : "password"}
          minLength={6}
          name="password"
          className={
            password.length >= 6
              ? `form-control is-valid`
              : "form-control is-invalid"
          }
          value={password}
          onChange={onChange}
          placeholder={_password[language]}
        />
        {viewPass ? (
          <AuthPassword
            className="fas fa-eye-slash"
            onClick={() => setViewPass(false)}
          />
        ) : (
          <AuthPassword
            className="fas fa-eye"
            onClick={() => setViewPass(true)}
          />
        )}
        {password.length >= 6 ? (
          <div className="valid-feedback">{looksgood[language]}</div>
        ) : (
          <div className="invalid-feedback">
            {pleaseenter[language]} {_password[language]}
          </div>
        )}
      </div>
      <div className="form-group position-relative">
        <label htmlFor="password2">{confirmpass[language]}</label>
        <input
          type={viewPass2 ? "text" : "password"}
          name="password2"
          minLength={6}
          className={
            password2.length >= 6 &&
            password2.toString() === password.toString()
              ? `form-control is-valid`
              : "form-control is-invalid"
          }
          value={password2}
          onChange={onChange}
          placeholder="Please enter your password."
        />
        {viewPass2 ? (
          <AuthPassword
            className="fas fa-eye-slash"
            onClick={() => setViewPass2(false)}
          />
        ) : (
          <AuthPassword
            className="fas fa-eye"
            onClick={() => setViewPass2(true)}
          />
        )}
        {password2.length >= 6 && password2 === password ? (
          <div className="valid-feedback">{looksgood[language]}</div>
        ) : (
          <div className="invalid-feedback">
            {passwordnotconfirmed[language]}
          </div>
        )}
      </div>
      <div className="d-flex justify-content-end">
        <button
          className="btn btn-secondary"
          onClick={proceedToStepThree}
          type="button"
        >
          Proceed <i className="pl-2 fas fa-arrow-right" />
        </button>
      </div>
    </Fragment>
  );
}

export default connect(null, { setAlert })(StepTwo);

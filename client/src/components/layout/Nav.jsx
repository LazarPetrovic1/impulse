import React, { Fragment, useContext, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import { ThemeContext } from "../../contexts/ThemeContext";
import { LanguageContext } from "../../contexts/LanguageContext";
import SelectContainer from "../../styled/SelectContainer";
import CenterListItem from "./CenterListItem";
import MediumLogo from "../../styled/Logo/MediumLogo";
import { navcomponent } from "../../utils/langObject";
import Notifications from "../notifs/Notifs";
import NotifCounter from "../notifs/NotifCounter";
import GenericIcon from "../utils/icons/GenericIcon";
import ImpulseIcon from "../utils/icons/ImpulseIcon";
import bell from "../../animations/bell.json";
import settings from "../../animations/settings.json";
import logoutData from "../../animations/logout.json";
import loginData from "../../animations/login.json";
import user from "../../animations/user-backup.json";
import register from "../../animations/register.json";
import { readNotifs } from "../../actions/notifs";

const { _settings, _logout, _register, _login, _notifs } = navcomponent;

function Nav(props) {
  const { logout, auth, notifs: notifications, readNotifs } = props;
  const { isAuthenticated } = auth;
  const [dropdown, setDropdown] = useState(false);
  const { notifs } = notifications;
  const { toggleTheme, isDarkTheme } = useContext(ThemeContext);
  const { changeLanguage, language } = useContext(LanguageContext);
  const { pathname } = props.location;

  const authLinks = (
    <ul className="navbar-nav ml-auto">
      <CenterListItem>
        <Link className="nav-link" to="/dashboard">
          <GenericIcon
            text={auth && auth.user && auth.user.firstName}
            width={30}
            height={30}
            data={user}
          />
        </Link>
      </CenterListItem>
      <CenterListItem>
        <Link className="nav-link" to="/asdasdasd">
          404
        </Link>
      </CenterListItem>
      <CenterListItem>
        <Link className="nav-link" to="/impulse/change-password">
          Change pass
        </Link>
      </CenterListItem>
      <CenterListItem>
        <div className="nav-link pointer position-relative">
          <div
            onClick={() => {
              setDropdown(!dropdown);
              readNotifs(auth.user._id);
            }}
          >
            {notifs && <NotifCounter notifs={notifs} />}
            <div>
              <GenericIcon
                text={_notifs[language]}
                width={30}
                height={30}
                data={bell}
              />
              <i className="fas fa-caret-down pl-2" />
            </div>
          </div>
          {dropdown && <Notifications setDropdown={setDropdown} />}
        </div>
      </CenterListItem>
      <CenterListItem>
        <Link className="nav-link" to="/settings">
          <GenericIcon
            text={_settings[language]}
            width={30}
            height={30}
            data={settings}
          />
        </Link>
      </CenterListItem>
      <CenterListItem>
        {/* eslint-disable-next-line */}
        <a className="nav-link" href="#!" onClick={logout}>
          <GenericIcon
            text={_logout[language]}
            width={30}
            height={30}
            data={logoutData}
          />
        </a>
      </CenterListItem>
    </ul>
  );

  const guestLinks = (
    <ul className="navbar-nav ml-auto">
      <CenterListItem>
        <SelectContainer
          className="d-flex justify-content-center align-items-center"
          mrafter="1rem"
          isDarkTheme={isDarkTheme}
          padding="0"
        >
          <label className="d-flex justify-content-center align-items-center">
            <select
              onChange={changeLanguage}
              className="d-flex justify-content-center align-items-center"
              style={{ border: "none", outline: "none" }}
              value={localStorage.getItem("language")}
            >
              <option value="en">English</option>
              <option value="sr">Srpski</option>
              <option value="de">Deutsch</option>
            </select>
          </label>
        </SelectContainer>
      </CenterListItem>
      <CenterListItem>
        <Link
          className={pathname === "register" ? `nav-link active` : `nav-link`}
          to="/register"
        >
          <GenericIcon
            text={_register[language]}
            width={30}
            height={30}
            data={register}
          />
        </Link>
      </CenterListItem>
      <CenterListItem>
        <Link
          className={pathname === "login" ? "nav-link active" : "nav-link"}
          to="/login"
        >
          <GenericIcon
            text={_login[language]}
            width={30}
            height={30}
            data={loginData}
          />
        </Link>
      </CenterListItem>
      <CenterListItem>
        <div className="custom-control custom-switch alignment ">
          <input
            onChange={() => toggleTheme(!isDarkTheme)}
            type="checkbox"
            className="custom-control-input"
            id="theme"
            checked={JSON.parse(localStorage.getItem("isDarkTheme"))}
          />
          <label className="custom-control-label" htmlFor="theme" />
        </div>
      </CenterListItem>
    </ul>
  );

  return (
    <nav
      style={{ pointerEvents: "all" }}
      className={`navbar navbar-expand-lg navbar-${
        isDarkTheme ? "dark" : "light"
      }`}
    >
      <Link className="navbar-brand" to="/">
        {auth.user && auth.user.trial && auth.user.trial.isUsingTrial ? (
          <ImpulseIcon height={60} width={60} />
        ) : auth.user && auth.user.isPremium ? (
          <ImpulseIcon height={60} width={60} />
        ) : (
          <MediumLogo />
        )}
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      </div>
    </nav>
  );
}

Nav.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  notifs: PropTypes.object.isRequired,
  readNotifs: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  notifs: state.notifs,
});

export default connect(mapStateToProps, { logout, readNotifs })(
  withRouter(Nav)
);

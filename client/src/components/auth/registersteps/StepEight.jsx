import React, { Fragment, useContext } from "react";
import { registercomponent } from "../../../utils/langObject";
import { LanguageContext } from "../../../contexts/LanguageContext";
import Moment from "react-moment";

const {
  overview,
  fullname,
  notgiven,
  yoursex,
  _email,
  _username,
  dateofbirth,
  _from,
  location,
  securityquestion,
  securityanswer,
  imagetaken,
  yes,
  no,
  yourphonenumber,
  signmeup,
  male,
  female,
  nospecify,
} = registercomponent;

function StepEight({
  firstName,
  lastName,
  username,
  bio,
  sex,
  city,
  country,
  zip,
  email,
  security,
  password,
  password2,
  phone,
  dob,
  image,
  callcode,
}) {
  const { language } = useContext(LanguageContext);
  return (
    <Fragment>
      <h2>{overview[language]}:</h2>
      <ul className="list-group mt-3">
        <li className="overview-items list-group-item list-group-item-action">
          {fullname[language]}:{" "}
          {firstName && lastName ? (
            <span className="text-success">
              {firstName} {lastName}
            </span>
          ) : (
            <span className="text-danger">
              {notgiven[language]} {fullname[language]}
            </span>
          )}
        </li>
        <li className="overview-items list-group-item list-group-item-action">
          {yoursex[language]}:{" "}
          {sex === "m" ? (
            <span className="text-success">{male[language]}</span>
          ) : sex === "f" ? (
            <span className="text-success">{female[language]}</span>
          ) : sex === "n/a" ? (
            <span className="text-success">{nospecify[language]}</span>
          ) : (
            <span className="text-danger">
              {notgiven[language]} {yoursex[language]}
            </span>
          )}
        </li>
        <li className="overview-items list-group-item list-group-item-action">
          {_email[language]}:{" "}
          {email ? (
            <span className="text-success">{email}</span>
          ) : (
            <span className="text-danger">
              {notgiven[language]} {_email[language]}
            </span>
          )}
        </li>
        <li className="overview-items list-group-item list-group-item-action">
          {_username[language]}:{" "}
          {username ? (
            <span className="text-success">@{username}</span>
          ) : (
            <span className="text-danger">
              {notgiven[language]} {_username[language]}
            </span>
          )}
        </li>
        <li className="overview-items list-group-item list-group-item-action">
          {dateofbirth[language]}:{" "}
          {dob ? (
            <span className="text-success">
              <Moment format="DD.MM.YYYY.">{dob}</Moment>
            </span>
          ) : (
            <span className="text-danger">
              {notgiven[language]} {dateofbirth[language]}
            </span>
          )}
        </li>
        <li className="overview-items list-group-item list-group-item-action">
          {_from[language]}:{" "}
          {zip && city && country ? (
            <span className="text-success">
              {zip} - {city}, {country}
            </span>
          ) : (
            <span className="text-danger">
              {notgiven[language]} {location[language]}
            </span>
          )}
        </li>
        <li className="overview-items list-group-item list-group-item-action">
          {securityquestion[language]}:{" "}
          {security ? (
            <span className="text-success">{security}</span>
          ) : (
            <span className="text-danger">
              {notgiven[language]} {securityanswer[language]}
            </span>
          )}
        </li>
        <li className="overview-items list-group-item list-group-item-action">
          {imagetaken[language]}&nbsp;&nbsp;
          {image ? (
            <span className="text-success">{yes[language]}</span>
          ) : (
            <span className="text-danger">{no[language]}</span>
          )}
        </li>
        <li className="overview-items list-group-item list-group-item-action">
          {yourphonenumber[language]}:{" "}
          {phone ? (
            <span className="text-success">
              {callcode}
              {phone}
            </span>
          ) : (
            <span className="text-danger">
              {notgiven[language]} {yourphonenumber[language]}
            </span>
          )}
        </li>
      </ul>
      <button
        type="submit"
        disabled={
          !firstName ||
          !lastName ||
          !username ||
          !email ||
          !security ||
          !password ||
          !password2
        }
        className="mt-2 btn btn-lg btn-primary btn-block"
      >
        <i className="fas fa-paper-plane pr-2" />
        {signmeup[language]}
      </button>
    </Fragment>
  );
}

export default StepEight;

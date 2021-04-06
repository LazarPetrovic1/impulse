import React, { useState, useContext, useEffect } from "react";
import { LanguageContext } from "../../contexts/LanguageContext";
import Moment from "react-moment";
import { registercomponent } from "../../utils/langObject";
import axios from "axios";
import EditField from "../misc/EditField";
import EditArea from "../misc/EditArea";
import EditButtons from "../misc/EditButtons";
import EditDatePicker from "../misc/EditDatePicker";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { hideSelected } from "../../actions/auth";
import { arrayEquals, handleProfileOverview } from "../../utils/arr";

const {
  _firstname,
  _lastname,
  _email,
  goback,
  yoursex,
  male,
  female,
  nospecify,
  _username,
  yourbio,
  dateofbirth,
  yourphonenumber,
  overview,
  securityquestion,
  _city,
  _country,
  zipcode,
} = registercomponent;

function ProfileOverview({ auth: { user }, hideSelected }) {
  // Disassembled state pieces
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [sex, setSex] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [dob, setDob] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [zip, setZip] = useState("");
  const [phone, setPhone] = useState("");
  const [question, setQuestion] = useState("");
  const [bio, setBio] = useState("");
  const [hidden, setHidden] = useState(
    user && user.hidden ? user.hidden.split(" ") : []
  );

  // Checkbox pieces
  const [checkFirstName, setCheckFirstName] = useState(true);
  const [checkLastName, setCheckLastName] = useState(true);
  const [checkDob, setCheckDob] = useState(true);
  const [checkUsername, setCheckUsername] = useState(true);
  const [checkCity, setCheckCity] = useState(true);
  const [checkCountry, setCheckCountry] = useState(true);
  const [checkZip, setCheckZip] = useState(true);
  const [checkEmail, setCheckEmail] = useState(true);
  const [checkPhone, setCheckPhone] = useState(true);
  // const [checkQuestion, setCheckQuestion] = useState(true)
  const [checkSex, setCheckSex] = useState(true);
  const [checkBio, setCheckBio] = useState(true);

  const { language } = useContext(LanguageContext);

  const changeView = async (
    statePiece,
    setStatePiece,
    stateInformationString
  ) => {
    if (statePiece) {
      await setStatePiece(false);
    } else {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      let res;
      switch (stateInformationString) {
        case "firstName":
          res = await axios.put(`/api/auth/firstName`, { firstName }, config);
          await setFirstName(res.data.firstName);
          break;
        case "lastName":
          res = await axios.put(`/api/auth/lastName`, { lastName }, config);
          await setLastName(res.data.lastName);
          break;
        case "email":
          res = await axios.put(`/api/auth/email`, { email }, config);
          await setEmail(res.data.email);
          break;
        case "bio":
          res = await axios.put(`/api/auth/bio`, { bio }, config);
          await setBio(res.data.bio);
          break;
        case "username":
          res = await axios.put(`/api/auth/username`, { username }, config);
          await setUsername(res.data.username);
          break;
        case "city":
          res = await axios.put(`/api/auth/city`, { city }, config);
          await setCity(res.data.city);
          break;
        case "zip":
          res = await axios.put(`/api/auth/zip`, { zip }, config);
          await setZip(res.data.zip);
          break;
        case "phone":
          res = await axios.put(`/api/auth/phone`, { phone }, config);
          await setPhone(res.data.phone);
          break;
        case "sex":
          res = await axios.put(`/api/auth/sex`, { sex }, config);
          await setSex(res.data.sex);
          break;
        case "dob":
          res = await axios.put(`/api/auth/dob`, { dob });
          await setDob(res.data.dob);
          break;
        default:
          console.log("Nope!");
      }
      await setStatePiece(true);
      await window.location.reload();
    }
  };

  const changeProfileOverview = (value) => {
    const newHidden = handleProfileOverview(hidden, value);
    setHidden(newHidden);
    console.log(newHidden);
  };

  useEffect(() => {
    (async function () {
      const res = await axios.get("/api/auth");
      const {
        firstName,
        lastName,
        email,
        sex,
        bio,
        dob,
        username,
        city,
        country,
        zip,
        phone,
        question,
      } = await res.data;

      await setFirstName(firstName);
      await setLastName(lastName);
      await setEmail(email);
      await setSex(sex);
      await setBio(bio);
      await setDob(dob);
      await setUsername(username);
      await setCity(city);
      await setCountry(country);
      await setZip(zip);
      await setPhone(phone);
      await setQuestion(question);
    })();
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
  };

  const hideSelectedInformation = (e) => {
    const realHidden = hidden.join(" ");
    hideSelected(realHidden, user._id);
  };

  return (
    <div className="mb-5" style={{ pointerEvents: "all" }}>
      <form onSubmit={onSubmit}>
        <div className="container">
          <div className="d-flex justify-content-between my-3">
            <h2 className="m-0">{overview[language]}</h2>
            <Link className="btn btn-secondary" to="/">
              <i className="fas fa-arrow-left pr-2"></i> {goback[language]}
            </Link>
          </div>
          <ul className="list-group" style={{ marginBottom: "2rem" }}>
            <li className="overview-items list-group-item list-group-item-action d-flex justify-content-between">
              {checkFirstName ? (
                <span>
                  {_firstname[language]}: {firstName}
                </span>
              ) : (
                <EditField
                  type="text"
                  setter={setFirstName}
                  value={firstName}
                />
              )}
              <i
                className="fas fa-edit pointer pl-4"
                onClick={() =>
                  changeView(checkFirstName, setCheckFirstName, "firstName")
                }
              />
            </li>
            <li className="overview-items list-group-item list-group-item-action d-flex justify-content-between">
              {checkLastName ? (
                <span>
                  {_lastname[language]}: {lastName}
                </span>
              ) : (
                <EditField type="text" setter={setLastName} value={lastName} />
              )}
              <i
                className="fas fa-edit pointer pl-4"
                onClick={() =>
                  changeView(checkLastName, setCheckLastName, "lastName")
                }
              />
            </li>
            <li className="overview-items list-group-item list-group-item-action d-flex justify-content-between">
              {checkSex ? (
                <span>
                  {yoursex[language]}:{" "}
                  {sex === "m"
                    ? male[language]
                    : sex === "f"
                    ? female[language]
                    : nospecify[language]}
                </span>
              ) : (
                <EditButtons setter={setSex} />
              )}
              <div
                className="d-flex justify-content-end"
                style={{ width: "70px" }}
              >
                <i
                  className={`fas fa-${
                    hidden.includes("sex") ? "eye-slash" : "eye"
                  } pointer`}
                  onClick={() => changeProfileOverview("sex")}
                />
                <i
                  className="fas fa-edit pointer pl-4"
                  onClick={() => changeView(checkSex, setCheckSex, "sex")}
                />
              </div>
            </li>
            <li className="overview-items list-group-item list-group-item-action d-flex justify-content-between">
              {checkEmail ? (
                <span>
                  {_email[language]}: {email}
                </span>
              ) : (
                <EditField type="email" setter={setEmail} value={email} />
              )}
              <div
                className="d-flex justify-content-end"
                style={{ width: "70px" }}
              >
                <i
                  className={`fas fa-${
                    hidden.includes("email") ? "eye-slash" : "eye"
                  } pointer`}
                  onClick={() => changeProfileOverview("email")}
                />
                <i
                  className="fas fa-edit pointer pl-4"
                  onClick={() => changeView(checkEmail, setCheckEmail, "email")}
                />
              </div>
            </li>
            <li className="overview-items list-group-item list-group-item-action d-flex justify-content-between">
              {checkUsername ? (
                <span>
                  {_username[language]}: {username}
                </span>
              ) : (
                <EditField type="text" setter={setUsername} value={username} />
              )}
              <div
                className="d-flex justify-content-end"
                style={{ width: "70px" }}
              >
                <i
                  className={`fas fa-${
                    hidden.includes("username") ? "eye-slash" : "eye"
                  } pointer`}
                  onClick={() => changeProfileOverview("username")}
                />
                <i
                  className="fas fa-edit pointer pl-4"
                  onClick={() =>
                    changeView(checkUsername, setCheckUsername, "username")
                  }
                />
              </div>
            </li>
            <li className="overview-items list-group-item list-group-item-action d-flex justify-content-between">
              {checkDob ? (
                <span>
                  {dateofbirth[language]}:{" "}
                  <Moment format="DD.MM.YYYY.">{dob}</Moment>
                </span>
              ) : (
                <EditDatePicker value={dob} setter={setDob} />
              )}
              <div
                className="d-flex justify-content-end"
                style={{ width: "70px" }}
              >
                <i
                  className={`fas fa-${
                    hidden.includes("dob") ? "eye-slash" : "eye"
                  } pointer`}
                  onClick={() => changeProfileOverview("dob")}
                />
                <i
                  className="fas fa-edit pointer pl-4"
                  onClick={() => changeView(checkDob, setCheckDob, "dob")}
                />
              </div>
            </li>
            <li className="overview-items list-group-item list-group-item-action d-flex justify-content-between">
              {checkCity ? (
                <span>
                  {_city[language]}: {city}
                </span>
              ) : (
                <EditField type="text" setter={setCity} value={city} />
              )}
              <div
                className="d-flex justify-content-end"
                style={{ width: "70px" }}
              >
                <i
                  className={`fas fa-${
                    hidden.includes("city") ? "eye-slash" : "eye"
                  } pointer`}
                  onClick={() => changeProfileOverview("city")}
                />
                <i
                  className="fas fa-edit pointer pl-4"
                  onClick={() => changeView(checkCity, setCheckCity, "city")}
                />
              </div>
            </li>
            <li className="overview-items list-group-item list-group-item-action d-flex justify-content-between">
              {checkCountry ? (
                <span>
                  {_country[language]}: {country}
                </span>
              ) : (
                <EditField value={country} setter={setCountry} />
              )}
              <div
                className="d-flex justify-content-end"
                style={{ width: "70px" }}
              >
                <i
                  className={`fas fa-${
                    hidden.includes("country") ? "eye-slash" : "eye"
                  } pointer`}
                  onClick={() => changeProfileOverview("country")}
                />
                <i
                  className="fas fa-edit pointer pl-4"
                  onClick={() =>
                    changeView(checkCountry, setCheckCountry, "country")
                  }
                />
              </div>
            </li>
            <li className="overview-items list-group-item list-group-item-action d-flex justify-content-between">
              {checkZip ? (
                <span>
                  {zipcode[language]}: {zip}
                </span>
              ) : (
                <EditField type="number" setter={setZip} value={zip} />
              )}
              <div
                className="d-flex justify-content-end"
                style={{ width: "70px" }}
              >
                <i
                  className={`fas fa-${
                    hidden.includes("zip") ? "eye-slash" : "eye"
                  } pointer`}
                  onClick={() => changeProfileOverview("zip")}
                />
                <i
                  className="fas fa-edit pointer pl-4"
                  onClick={() => changeView(checkZip, setCheckZip, "zip")}
                />
              </div>
            </li>
            <li className="overview-items list-group-item list-group-item-action d-flex justify-content-between">
              <span>
                {securityquestion[language]}: {question}
              </span>
              <i className="fas fa-times text-danger"></i>
            </li>
            <li className="overview-items list-group-item list-group-item-action d-flex justify-content-between">
              {checkPhone ? (
                <span>
                  {yourphonenumber[language]}: {phone}
                </span>
              ) : (
                <EditField type="text" setter={setPhone} value={phone} />
              )}
              <div
                className="d-flex justify-content-end"
                style={{ width: "70px" }}
              >
                <i
                  className={`fas fa-${
                    hidden.includes("phone") ? "eye-slash" : "eye"
                  } pointer`}
                  onClick={() => changeProfileOverview("phone")}
                />
                <i
                  className="fas fa-edit pointer pl-4"
                  onClick={() => changeView(checkPhone, setCheckPhone, "phone")}
                />
              </div>
            </li>
            <li className="overview-items list-group-item list-group-item-action d-flex justify-content-between">
              {checkBio ? (
                <span>
                  {yourbio[language]}: {bio}
                </span>
              ) : (
                <EditArea type="text" value={bio} setter={setBio} />
              )}
              <div
                className="d-flex justify-content-end"
                style={{ width: "70px" }}
              >
                <i
                  className={`fas fa-${
                    hidden.includes("bio") ? "eye-slash" : "eye"
                  } pointer`}
                  onClick={() => changeProfileOverview("bio")}
                />
                <i
                  className="fas fa-edit pointer pl-4"
                  onClick={() => changeView(checkBio, setCheckBio, "bio")}
                />
              </div>
            </li>
          </ul>
          {!arrayEquals(hidden, user.hidden.split(" ")) && (
            <div className="d-flex justify-content-end my-3">
              <button
                onClick={() =>
                  setHidden(user && user.hidden ? user.hidden.split(" ") : [])
                }
                className="btn btn-danger mr-2"
              >
                <i className="fas fa-ban pr-2" /> Cancel
              </button>
              <button
                className="btn btn-success ml-2"
                onClick={hideSelectedInformation}
              >
                <i className="fas fa-check pr-2" /> Save
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

ProfileOverview.propTypes = {
  auth: PropTypes.object.isRequired,
  hideSelected: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { hideSelected })(ProfileOverview);

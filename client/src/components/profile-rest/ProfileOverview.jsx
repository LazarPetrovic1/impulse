import React, { useState, useContext, useEffect } from "react";
import { LanguageContext } from "../../contexts/LanguageContext";
import Moment from "react-moment";
import { registercomponent } from "../../utils/langObject";
import axios from "axios";
import EditField from "../misc/EditField";
import EditArea from "../misc/EditArea";
import EditButtons from "../misc/EditButtons";
import EditDatePicker from "../misc/EditDatePicker";
import moment from "moment";
import PageContent from "../layout/PageContent";

function ProfileOverview() {
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
  const [security, setSecurity] = useState("");
  const [phone, setPhone] = useState("");
  const [question, setQuestion] = useState("");
  const [bio, setBio] = useState("");

  // Checkbox pieces
  const [checkFirstName, setCheckFirstName] = useState(true);
  const [checkLastName, setCheckLastName] = useState(true);
  const [checkDob, setCheckDob] = useState(true);
  const [checkUsername, setCheckUsername] = useState(true);
  const [checkCity, setCheckCity] = useState(true);
  const [checkCountry, setCheckCountry] = useState(true);
  const [checkZip, setCheckZip] = useState(true);
  const [checkEmail, setCheckEmail] = useState(true);
  const [checkSecurity, setCheckSecurity] = useState(true);
  const [checkPhone, setCheckPhone] = useState(true);
  const [checkQuestion, setCheckQuestion] = useState(true);
  const [checkSex, setCheckSex] = useState(true);
  const [checkBio, setCheckBio] = useState(true);

  const {
    _firstname,
    _lastname,
    _email,
    yoursex,
    male,
    female,
    nospecify,
    _username,
    yourbio,
    dateofbirth,
    yourphonenumber,
    overview,
    fullname,
    securityquestion,
    _from,
    _city,
    _country,
    zipcode
  } = registercomponent;

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
          "Content-Type": "application/json"
        }
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

  useEffect(() => {
    (async function() {
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
        security
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
      await setSecurity(security);
    })();
  }, []);

  const onSubmit = e => {
    e.preventDefault();
    console.log(e);
  };

  return (
    <PageContent>
      <form onSubmit={onSubmit}>
        <div className="container">
          <h2 style={{ marginBottom: "2rem" }}>{overview[language]}:</h2>
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
                className="fas fa-edit pointer"
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
                className="fas fa-edit pointer"
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
              <i
                className="fas fa-edit pointer"
                onClick={() => changeView(checkSex, setCheckSex, "sex")}
              />
            </li>
            <li className="overview-items list-group-item list-group-item-action d-flex justify-content-between">
              {checkEmail ? (
                <span>
                  {_email[language]}: {email}
                </span>
              ) : (
                <EditField type="email" setter={setEmail} value={email} />
              )}
              <i
                className="fas fa-edit pointer"
                onClick={() => changeView(checkEmail, setCheckEmail, "email")}
              />
            </li>
            <li className="overview-items list-group-item list-group-item-action d-flex justify-content-between">
              {checkUsername ? (
                <span>
                  {_username[language]}: {username}
                </span>
              ) : (
                <EditField type="text" setter={setUsername} value={username} />
              )}
              <i
                className="fas fa-edit pointer"
                onClick={() =>
                  changeView(checkUsername, setCheckUsername, "username")
                }
              />
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
              <i
                className="fas fa-edit pointer"
                onClick={() => changeView(checkDob, setCheckDob, "dob")}
              />
            </li>
            <li className="overview-items list-group-item list-group-item-action d-flex justify-content-between">
              {checkCity ? (
                <span>
                  {_city[language]}: {city}
                </span>
              ) : (
                <EditField type="text" setter={setCity} value={city} />
              )}
              <i
                className="fas fa-edit pointer"
                onClick={() => changeView(checkCity, setCheckCity, "city")}
              />
            </li>
            <li className="overview-items list-group-item list-group-item-action d-flex justify-content-between">
              <span>
                {_country[language]}: {country}
              </span>
              <i
                className="fas fa-edit pointer"
                onClick={() => changeView(checkCountry, setCheckCountry)}
              />
            </li>
            <li className="overview-items list-group-item list-group-item-action d-flex justify-content-between">
              {checkZip ? (
                <span>
                  {zipcode[language]}: {zip}
                </span>
              ) : (
                <EditField type="number" setter={setZip} value={zip} />
              )}
              <i
                className="fas fa-edit pointer"
                onClick={() => changeView(checkZip, setCheckZip, "zip")}
              />
            </li>
            <li className="overview-items list-group-item list-group-item-action d-flex justify-content-between">
              <span>
                {securityquestion[language]}: {question}
              </span>
              <i
                className="fas fa-edit pointer"
                onClick={() => changeView(checkQuestion, setCheckQuestion)}
              />
            </li>
            <li className="overview-items list-group-item list-group-item-action d-flex justify-content-between">
              {checkPhone ? (
                <span>
                  {yourphonenumber[language]}: {phone}
                </span>
              ) : (
                <EditField type="text" setter={setPhone} value={phone} />
              )}
              <i
                className="fas fa-edit pointer"
                onClick={() => changeView(checkPhone, setCheckPhone, "phone")}
              />
            </li>
            <li className="overview-items list-group-item list-group-item-action d-flex justify-content-between">
              {checkBio ? (
                <span>
                  {yourbio[language]}: {bio}
                </span>
              ) : (
                <EditArea value={bio} setter={setBio} />
              )}
              <i
                className="fas fa-edit pointer"
                onClick={() => changeView(checkBio, setCheckBio, "bio")}
              />
            </li>
          </ul>
        </div>
      </form>
    </PageContent>
  );
}

export default ProfileOverview;

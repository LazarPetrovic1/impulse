import React, { useState, useContext, useRef, Fragment } from "react";
import SettingsSideNav from "../../styled/Settings/SettingsSideNav";
import SettingsListItem from "../../styled/Settings/SettingsListItem";
import { LanguageContext } from "../../contexts/LanguageContext";
import { ThemeContext } from "../../contexts/ThemeContext";
import { DevContext } from "../../contexts/DevContext";
import { FontContext } from "../../contexts/FontContext";
import SettingsTheme from "./SettingsTheme";
import { settingscomponent } from "../../utils/langObject";
import ContentPolicy from "./ContentPolicy";
import SettingsLanguages from "./SettingsLanguages";
import ProfileOverview from "../profile-rest/ProfileOverview";
import SocialProfile from "../SocialRoutes/SocialProfile";
import devoptions from "../../utils/devoptions";
import TermsAndConditions from "./TermsAndConditions";
import APIDocs from "./APIDocs";
import ColourModal from "./ColourModal";
import { Link } from "react-router-dom";

const settingsBarWidth = "250px";
const {
  _basicsettings,
  _contentpolicy,
  _accountinformation,
  _selectlanguage,
  _changetheme,
  _uselegacyfont,
  _additionalinformation,
  _termsandconditions,
  _themeplayground,
  _apidocs,
  _as,
  _usedevexperience,
  _hide,
  _language,
  _theme,
  _font,
  _devmode,
  _recognizedvalues,
  _strings,
  _boolean,
  _changetextcolour,
  _changepassword,
} = settingscomponent;

function Settings() {
  const [selectedSetting, setSelectedSetting] = useState(1);
  const [isHidden, setIsHidden] = useState(false);
  const [devOption, setDevOption] = useState("lslanguage");
  const [copied, setCopied] = useState(false);
  const { isDarkTheme } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);
  const { isLegacyFont, toggleLegacyFont } = useContext(FontContext);
  const { isDevExp, toggleDevExp } = useContext(DevContext);
  const devCopy = useRef();
  const [showColMod, setShowColMod] = useState(false);

  const copyText = () => {
    let textField = document.createElement("textarea");
    textField.innerText = devCopy.current.innerText;
    document.body.appendChild(textField).select();
    document.execCommand("copy");
    textField.remove();
    setCopied(true);
  };

  return (
    <div style={{ pointerEvents: "all" }}>
      <SettingsSideNav
        width={settingsBarWidth}
        isHidden={isHidden}
        isDarkTheme={isDarkTheme}
      >
        {!isHidden && (
          <ul>
            <li
              className={selectedSetting === 1 ? "selected" : ""}
              onClick={() => setSelectedSetting(1)}
            >
              {_basicsettings[language]}
            </li>
            <li
              className={selectedSetting === 2 ? "selected" : ""}
              onClick={() => setSelectedSetting(2)}
            >
              {_accountinformation[language]}
            </li>
            <li
              className={selectedSetting === 3 ? "selected" : ""}
              onClick={() => setSelectedSetting(3)}
            >
              {_contentpolicy[language]}
            </li>
            <li
              className={selectedSetting === 4 ? "selected" : ""}
              onClick={() => setSelectedSetting(4)}
            >
              {_additionalinformation[language]}
            </li>
            <li
              className={selectedSetting === 5 ? "selected" : ""}
              onClick={() => setSelectedSetting(5)}
            >
              {_termsandconditions[language]}
            </li>
            <li
              className={selectedSetting === 6 ? "selected" : ""}
              onClick={() => setSelectedSetting(6)}
            >
              {_themeplayground[language]}
            </li>
            <li>
              <Link
                className="btn pl-0 text-left"
                style={{ color: "white", fontSize: "1rem" }}
                to="/impulse/change-password"
              >
                {_changepassword[language]}
              </Link>
            </li>
            {isDevExp && (
              <li
                className={selectedSetting === 7 ? "selected" : ""}
                onClick={() => setSelectedSetting(7)}
              >
                {_apidocs[language]}
              </li>
            )}
          </ul>
        )}
        {selectedSetting === 6 && (
          <button
            className="btn bg-dark text-light position-absolute"
            style={{ right: 0, bottom: 0 }}
            onClick={() => setIsHidden(!isHidden)}
          >
            {isHidden ? (
              <i className="fas fa-angle-double-right" />
            ) : (
              <Fragment>
                {_hide[language]}{" "}
                <i className="fas fa-angle-double-left pl-2" />
              </Fragment>
            )}
          </button>
        )}
      </SettingsSideNav>
      {selectedSetting === 1 && (
        <article
          style={{
            marginLeft: settingsBarWidth,
            minHeight: "calc(100vh - 86px)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <ul
            className="list-group"
            style={{
              borderTop: `1px solid ${isDarkTheme ? "#ddd" : "#111"}`,
              borderBottom: `1px solid ${isDarkTheme ? "#ddd" : "#111"}`,
            }}
          >
            <SettingsListItem
              className="list-group-item d-flex align-items-center"
              isDarkTheme={isDarkTheme}
              getCenter
            >
              <div className="d-flex justify-content-between w-100">
                <div className="d-flex align-items-center">
                  {_selectlanguage[language]}:
                  <SettingsLanguages />
                </div>
                <button
                  className="btn btn-secondary btn-lg"
                  onClick={() => setShowColMod(true)}
                >
                  <i className="fas fa-palette" />
                </button>
              </div>
            </SettingsListItem>
            <SettingsListItem
              className="list-group-item"
              isDarkTheme={isDarkTheme}
            >
              <span style={{ whiteSpace: "nowrap" }}>
                {_changetheme[language]}:
              </span>
              <SettingsTheme />
            </SettingsListItem>
            <SettingsListItem
              isDarkTheme={isDarkTheme}
              className="list-group-item"
            >
              <div className="d-flex mr-2 justify-content-center align-items-center">
                <input
                  type="checkbox"
                  name="useLegacyFont"
                  id="useLegacyFont"
                  value={isLegacyFont}
                  checked={isLegacyFont}
                  onChange={toggleLegacyFont}
                />
              </div>
              <span style={{ whiteSpace: "nowrap" }}>
                {_uselegacyfont[language]}
              </span>
            </SettingsListItem>
            <SettingsListItem
              isDarkTheme={isDarkTheme}
              className="list-group-item"
            >
              <div className="d-flex mr-2 justify-content-center align-items-center">
                <input
                  type="checkbox"
                  name="useDevExp"
                  id="useDevExp"
                  value={isDevExp}
                  checked={isDevExp}
                  onChange={toggleDevExp}
                />
              </div>
              <span style={{ whiteSpace: "nowrap" }}>
                {_usedevexperience[language]}
              </span>
            </SettingsListItem>
          </ul>
          {isDevExp && (
            <section
              className="d-flex flex-column justify-content-center align-items-center"
              style={{ flexGrow: 1 }}
            >
              <div className="d-flex mb-5">
                <button
                  onClick={() => {
                    setDevOption("lslanguage");
                    setCopied(false);
                  }}
                  className={`btn btn-${
                    devOption === "lslanguage" ? "success" : "secondary"
                  }`}
                >
                  {_language[language]}
                </button>
                <button
                  onClick={() => {
                    setDevOption("lstheme");
                    setCopied(false);
                  }}
                  className={`btn btn-${
                    devOption === "lstheme" ? "success" : "secondary"
                  }`}
                >
                  {_theme[language]}
                </button>
                <button
                  onClick={() => {
                    setDevOption("lsfont");
                    setCopied(false);
                  }}
                  className={`btn btn-${
                    devOption === "lsfont" ? "success" : "secondary"
                  }`}
                >
                  {_font[language]}
                </button>
                <button
                  onClick={() => {
                    setDevOption("lsdevmode");
                    setCopied(false);
                  }}
                  className={`btn btn-${
                    devOption === "lsdevmode" ? "success" : "secondary"
                  }`}
                >
                  {_devmode[language]}
                </button>
              </div>
              <article className="p-5 border position-relative">
                <button
                  className={`btn btn-${
                    copied ? "success" : "primary"
                  } position-absolute`}
                  style={{ top: 0, right: 0 }}
                  onClick={copyText}
                >
                  <i
                    className={`fas fa-${
                      copied ? "clipboard-check" : "clipboard"
                    }`}
                  />
                </button>
                <div
                  ref={devCopy}
                  className="p-5 lead"
                  style={{ background: "#222" }}
                >
                  {devoptions[devOption].storage}
                  <br />
                  {devoptions[devOption].reload}
                </div>
                <p className="mt-5">
                  {_recognizedvalues[language]}{" "}
                  {devoptions[devOption].values.join(", ")}, {_as[language]}{" "}
                  {devOption === "lslanguage" || devOption === "lstheme"
                    ? _strings[language]
                    : _boolean[language]}
                  .
                </p>
              </article>
            </section>
          )}
        </article>
      )}
      <div style={{ marginLeft: settingsBarWidth }}>
        {selectedSetting === 2 && <ProfileOverview />}
        {selectedSetting === 3 && <ContentPolicy />}
        {selectedSetting === 4 && <SocialProfile />}
        {selectedSetting === 5 && <TermsAndConditions />}
        {/*selectedSetting === 6 && <SettingsThemePlayground />*/}
        {selectedSetting === 7 && <APIDocs />}
      </div>
      <ColourModal
        show={showColMod}
        onClose={() => setShowColMod(false)}
        title={_changetextcolour[language]}
      />
    </div>
  );
}

export default Settings;

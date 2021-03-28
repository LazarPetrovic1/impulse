import React, { useState, useContext, useRef, useEffect } from "react";
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

const settingsBarWidth = "250px";
const {
  _basicsettings,
  _contentpolicy,
  _accountinformation,
  _item,
  _selectlanguage,
  _changetheme,
  _some,
  _uselegacyfont,
  _additionalinformation,
  _usedevexperience,
} = settingscomponent;

function Settings() {
  const [selectedSetting, setSelectedSetting] = useState(1);
  const [devOption, setDevOption] = useState("lslanguage");
  const [copied, setCopied] = useState(false);
  const { isDarkTheme } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);
  const { isLegacyFont, toggleLegacyFont } = useContext(FontContext);
  const { isDevExp, toggleDevExp } = useContext(DevContext);
  const devCopy = useRef();

  useEffect(() => {
    console.log(devCopy);
  }, [devCopy]);

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
      <SettingsSideNav width={settingsBarWidth} isDarkTheme={isDarkTheme}>
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
            {_item[language]} 5
          </li>
        </ul>
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
              {_selectlanguage[language]}:
              <SettingsLanguages />
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
            <SettingsListItem
              isLast
              isDarkTheme={isDarkTheme}
              className="list-group-item"
            >
              {_some[language]} {_item[language]}
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
                  Language
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
                  Theme
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
                  Font
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
                  Dev mode
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
                  Recognized values are{" "}
                  {devoptions[devOption].values.join(", ")}, as{" "}
                  {devOption === "lslanguage" || devOption === "lstheme"
                    ? "strings"
                    : "booleans"}
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
      </div>
    </div>
  );
}

export default Settings;

import React, { useState, useEffect, useContext, useRef } from "react";
import Modal from "../utils/Modal";
import { connect } from "react-redux";
import themesFunction from "../../utils/themes";
import { LanguageContext } from "../../contexts/LanguageContext";
import { ThemeContext } from "../../contexts/ThemeContext";

function SettingsPlayground({ show, onClose, style, auth: { user } }) {
  const [themes, setThemes] = useState(null);
  const [theme, setTheme] = useState(null);
  const { isDarkTheme } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);
  let scriptRef = useRef();
  const setScript = async (value) => {
    try {
      if (theme) {
        scriptRef = await document.querySelector(
          `script[src="./playgroundThemes/${theme}.js"]`
        );
      }
      if (scriptRef) {
        await document.body.removeChild(scriptRef);
      }
      const script = await document.createElement("script");
      script.src = `./playgroundThemes/${value}.js`;
      script.async = true;
      await document.body.appendChild(script);
    } catch (e) {
      console.warn(e.message);
    }
  };
  const changeTheme = async (value) => {
    await setScript(value);
    await setTheme(value);
  };
  useEffect(() => {
    if (user._id && (user.isPremium || user.trial.isUsingTrial)) {
      setThemes(() => {
        const realthemes = themesFunction(
          user.isPremium || user.trial.isUsingTrial
        );
        return realthemes;
      });
    } else {
      setThemes(() => {
        const realthemes = themesFunction();
        return realthemes;
      });
    }
    setTheme(isDarkTheme);
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (theme) {
      setScript(theme);
    }
    // eslint-disable-next-line
  }, [theme]);
  return (
    <Modal
      title="Theme playground"
      provideOwnClosure
      show={show}
      onClose={onClose}
      style={style}
    >
      <h1>Try out the different themes</h1>
      <div
        className="form-group"
        style={{ maxHeight: "250px", overflow: "auto" }}
      >
        {themes &&
          themes.length > 0 &&
          themes.map((theme) => (
            <div
              key={theme.value}
              className={`d-block p-4 border-bottom position-relative ${
                theme.isPremiumTheme && "bg-info"
              }`}
            >
              <input
                className={`${theme.inputClassName} d-inline-block`}
                type="radio"
                value={theme.value}
                onClick={(e) => changeTheme(theme.value)}
                style={{
                  height: "2rem",
                  width: "2rem",
                  margin: "0 0.5rem",
                  cursor: "pointer",
                }}
                name="theme"
                checked={theme.toString() === theme.value.toString()}
              />
              <h1
                className={`text-primary text-right ${
                  theme.isPremiumTheme && "text-light"
                }`}
                style={{ ...theme.labelStyle, cursor: "default" }}
              >
                {theme.text[language]}
              </h1>
            </div>
          ))}
      </div>
      <div className="form-group">
        {theme && theme.length > 0 && (
          <canvas
            id="playground"
            width={460}
            height={450}
            style={{
              maxHeight: "450px !important",
              minHeight: "450px !important",
              height: "450px !important",
              maxWidth: "460px !important",
              minWidth: "460px !important",
              width: "460px !important",
              backgroundColor: "#111",
            }}
          />
        )}
      </div>
    </Modal>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(SettingsPlayground);

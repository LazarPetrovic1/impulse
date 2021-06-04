import React, { useContext, Fragment, useState, useEffect } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { LanguageContext } from "../../contexts/LanguageContext";
import themesFunction from "../../utils/themes";
import { connect } from "react-redux";
import Modal from "../utils/Modal";

function PremiumThemes({ themes, onClick }) {
  const { language } = useContext(LanguageContext);
  const [show, setShow] = useState(false);
  return (
    themes && (
      <Fragment>
        <div
          className="form-check form-check-inline"
          onClick={() => setShow(true)}
        >
          <button
            className="ml-4 border form-check-label bg-primary text-light"
            style={{ whiteSpace: "nowrap" }}
            htmlFor=""
          >
            {JSON.parse(localStorage.getItem("isDarkTheme"))
              .slice(0, 1)
              .toUpperCase()
              .concat(JSON.parse(localStorage.getItem("isDarkTheme")).slice(1))}
          </button>
        </div>
        <Modal
          title="Choose a theme"
          provideOwnClosure
          show={show}
          onClose={() => setShow(false)}
          style={{
            maxHeight: "400px",
            overflow: "auto",
          }}
        >
          <div className="form-group">
            {themes.map((theme) => (
              <div
                key={theme.value}
                className={`d-block p-4 border-bottom ${
                  theme.isPremiumTheme && "bg-info"
                }`}
              >
                <input
                  className={`${theme.inputClassName} d-inline-block`}
                  type="radio"
                  value={theme.value}
                  onChange={onClick}
                  style={{
                    height: "2rem",
                    width: "2rem",
                    margin: "0 0.5rem",
                    cursor: "pointer",
                  }}
                  checked={theme.checked}
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
          <div className="modal-footer" style={{ backgroundColor: "#111" }}>
            <button
              type="button"
              className="btn btn-danger"
              data-dismiss="modal"
              onClick={() => setShow(false)}
            >
              <i className="fas fa-times pr-2" /> Close
            </button>
          </div>
        </Modal>
      </Fragment>
    )
  );
}

function SettingsTheme({ auth: { user } }) {
  const { language } = useContext(LanguageContext);
  const { toggleTheme } = useContext(ThemeContext);
  const [themes, setThemes] = useState(null);
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
    // eslint-disable-next-line
  }, []);
  const onClick = (e) => {
    e.persist();
    if (e.target.defaultValue === "false") {
      toggleTheme("false");
    } else {
      toggleTheme(JSON.stringify(e.target.defaultValue));
    }
    window.location.reload();
  };

  const basicthemes = themes && (
    <Fragment>
      {themes.map((theme) => (
        <div className={theme.divClassName} key={theme.value}>
          <input
            className={theme.inputClassName}
            type="radio"
            value={theme.value}
            onChange={onClick}
            checked={theme.checked}
          />
          <label
            className={theme.labelClassName}
            style={theme.labelStyle}
            htmlFor={theme.htmlFor}
          >
            {theme.text[language]}
          </label>
        </div>
      ))}
    </Fragment>
  );

  return (user && user.isPremium) ||
    (user && user.trial && user.trial.isUsingTrial) ? (
    <PremiumThemes themes={themes} onClick={onClick} />
  ) : (
    basicthemes
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(SettingsTheme);

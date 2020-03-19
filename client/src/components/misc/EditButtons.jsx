import React, { Fragment, useContext } from "react";
import { registercomponent } from "../../utils/langObject";
import { LanguageContext } from "../../contexts/LanguageContext";

function EditButtons(props) {
  const { setter } = props;

  const { male, female, nospecify } = registercomponent;

  const { language } = useContext(LanguageContext);

  return (
    <Fragment>
      <div className="custom-control custom-radio">
        <input
          type="radio"
          id="male"
          name="sex"
          className="custom-control-input"
          value="m"
          onChange={() => setter("m")}
        />
        <label className="custom-control-label" htmlFor="male">
          {male[language]}
        </label>
      </div>
      <div className="custom-control custom-radio">
        <input
          type="radio"
          id="female"
          name="sex"
          className="custom-control-input"
          value="f"
          onChange={() => setter("f")}
        />
        <label className="custom-control-label" htmlFor="female">
          {female[language]}
        </label>
      </div>
      <div className="custom-control custom-radio">
        <input
          type="radio"
          id="unknown"
          name="sex"
          className="custom-control-input"
          value="n/a"
          onChange={() => setter("n/a")}
        />
        <label className="custom-control-label" htmlFor="unknown">
          {nospecify[language]}
        </label>
      </div>
    </Fragment>
  );
}

export default EditButtons;

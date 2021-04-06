import React, { useState, useContext } from "react";
import arrowData from "../../../animations/generic/right_arrow.json";
import { LanguageContext } from "../../../contexts/LanguageContext";
import { generic } from "../../../utils/langObject";
import Lottie from "react-lottie-player";

const { _back } = generic;

function GoBackIcon({ text, width, height }) {
  const { language } = useContext(LanguageContext);
  const [play, setPlay] = useState(false);
  return (
    <span
      onMouseEnter={() => setPlay(true)}
      onMouseLeave={() => setPlay(false)}
    >
      <Lottie
        loop
        animationData={arrowData}
        play={play}
        style={{
          width,
          height,
          display: "inline-block",
          transform: "rotateZ(180deg)",
        }}
        className={text ? "pl-2" : ""}
      />
      {text && _back[language]}
    </span>
  );
}

export default GoBackIcon;

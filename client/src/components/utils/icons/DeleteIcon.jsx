import React, { useState, useContext } from "react";
import deleteData from "../../../animations/generic/delete.json";
import { LanguageContext } from "../../../contexts/LanguageContext";
import { generic } from "../../../utils/langObject";
import Lottie from "react-lottie-player";

const { _delete } = generic;

function DeleteIcon({ text, width, height }) {
  const { language } = useContext(LanguageContext);
  const [play, setPlay] = useState(false);
  return (
    <span
      onMouseEnter={() => setPlay(true)}
      onMouseLeave={() => setPlay(false)}
    >
      <Lottie
        loop
        animationData={deleteData}
        play={play}
        style={{ width, height, display: "inline-block" }}
        className={text ? "pr-2" : ""}
      />
      {text && _delete[language]}
    </span>
  );
}

export default DeleteIcon;

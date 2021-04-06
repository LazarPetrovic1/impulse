import React, { useState, useContext } from "react";
import editData from "../../../animations/generic/edit.json";
import { LanguageContext } from "../../../contexts/LanguageContext";
import { generic } from "../../../utils/langObject";
import Lottie from "react-lottie-player";

const { _edit } = generic;

function EditIcon({ text, width, height }) {
  const { language } = useContext(LanguageContext);
  const [play, setPlay] = useState(false);
  return (
    <span
      onMouseEnter={() => setPlay(true)}
      onMouseLeave={() => setPlay(false)}
    >
      <Lottie
        loop
        animationData={editData}
        play={play}
        style={{ width, height, display: "inline-block" }}
        className={text ? "pr-2" : ""}
      />
      {text && _edit[language]}
    </span>
  );
}

export default EditIcon;

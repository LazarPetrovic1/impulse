import React, { useState, useContext } from "react";
import chatData from "../../../animations/generic/discussion.json";
import { LanguageContext } from "../../../contexts/LanguageContext";
import { generic } from "../../../utils/langObject";
import Lottie from "react-lottie-player";

const { _discussion, _chat, _cancel } = generic;

function ChatIcon({ text, width, height }) {
  const { language } = useContext(LanguageContext);
  const [play, setPlay] = useState(false);
  return (
    <span
      onMouseEnter={() => setPlay(true)}
      onMouseLeave={() => setPlay(false)}
    >
      <Lottie
        loop
        animationData={chatData}
        play={play}
        style={{ width, height, display: "inline-block" }}
        className={text ? "pr-2" : ""}
      />
      {text && text === "discussion"
        ? _discussion[language]
        : text === "chat"
        ? _chat[language]
        : _cancel[language]}
    </span>
  );
}

export default ChatIcon;

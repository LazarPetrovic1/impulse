import React, { useState } from "react";
import Lottie from "react-lottie-player";

function SideMenuIcon({ text, width, height, data }) {
  const [play, setPlay] = useState(false);
  return (
    <span
      onMouseEnter={() => setPlay(true)}
      onMouseLeave={() => setPlay(false)}
    >
      <Lottie
        loop
        animationData={data}
        play={play}
        style={{ width, height, display: "inline-block" }}
        className={text ? "pr-2" : ""}
      />
      {text && text}
    </span>
  );
}

export default SideMenuIcon;

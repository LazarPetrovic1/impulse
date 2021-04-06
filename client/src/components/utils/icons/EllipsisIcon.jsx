import React from "react";
import Lottie from "react-lottie-player";
import ellipsis from "../../../animations/homepage/ellipsis.json";

function EllipsisIcon({ text, width, height }) {
  return (
    <span
      className={"position-absolute"}
      style={{
        top: "50%",
        transform: "translateY(-50%)",
      }}
    >
      <Lottie
        loop
        play
        animationData={ellipsis}
        style={{ width, height, display: "inline-block" }}
        className={text ? "pr-2" : ""}
      />
      {text && text}
    </span>
  );
}

export default EllipsisIcon;

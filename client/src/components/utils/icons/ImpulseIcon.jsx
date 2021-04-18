import React from "react";
import impulseData from "../../../animations/impulse.json";
import Lottie from "react-lottie-player";

function GoBackIcon({ width, height }) {
  return (
    <span>
      <Lottie
        loop
        animationData={impulseData}
        play
        style={{
          width,
          height,
          display: "inline-block",
        }}
      />
    </span>
  );
}

export default GoBackIcon;

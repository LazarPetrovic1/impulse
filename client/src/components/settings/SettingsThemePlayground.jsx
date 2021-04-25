import React, { useState } from "react";
import PlayGroundCanvas from "../../styled/Settings/PlayGroundCanvas";
import {
  dark,
  daysnow,
  drawworm,
  fireworks,
  fountain,
  galaxy,
  imagination,
  impulse,
  impulseplus,
  impulseplusplus,
  inferno,
  interstellar,
  matrix,
  network,
  neuralcore,
  painter,
  particles,
  parts,
  photons,
  rain,
  rainbow,
  smoke,
  snakes,
  snow,
  space,
  spacespider,
  spaceworm,
  stars,
  tunnel,
  waves,
} from "../../utils/themeFuncs";

function SettingsThemePlayground() {
  // eslint-disable-next-line
  const [theme, setTheme] = useState("");
  // eslint-disable-next-line
  const executeTheme = (value) => {
    const canvas = document.getElementById("canvas");
    canvas.clearRect(0, 0, canvas.width, canvas.height);
    switch (value) {
      case "dark":
        setTheme("dark");
        dark();
        break;
      case "daysnow":
        setTheme("daysnow");
        daysnow();
        break;
      case "drawworm":
        setTheme("drawworm");
        drawworm();
        break;
      case "fireworks":
        setTheme("fireworks");
        fireworks();
        break;
      case "fountain":
        setTheme("fountain");
        fountain();
        break;
      case "galaxy":
        setTheme("galaxy");
        galaxy();
        break;
      case "imagination":
        setTheme("imagination");
        imagination();
        break;
      case "impulse":
        setTheme("impulse");
        impulse();
        break;
      case "impulseplus":
        setTheme("impulseplus");
        impulseplus();
        break;
      case "impulseplusplus":
        setTheme("impulseplusplus");
        impulseplusplus();
        break;
      case "inferno":
        setTheme("inferno");
        inferno();
        break;
      case "interstellar":
        setTheme("interstellar");
        interstellar();
        break;
      case "matrix":
        setTheme("matrix");
        matrix();
        break;
      case "network":
        setTheme("network");
        network();
        break;
      case "neuralcore":
        setTheme("neuralcore");
        neuralcore();
        break;
      case "painter":
        setTheme("painter");
        painter();
        break;
      case "particles":
        setTheme("particles");
        particles();
        break;
      case "parts":
        setTheme("parts");
        parts();
        break;
      case "photons":
        setTheme("photons");
        photons();
        break;
      case "rain":
        setTheme("rain");
        rain();
        break;
      case "rainbow":
        setTheme("rainbow");
        rainbow();
        break;
      case "smoke":
        setTheme("smoke");
        smoke();
        break;
      case "snakes":
        setTheme("snakes");
        snakes();
        break;
      case "snow":
        setTheme("snow");
        snow();
        break;
      case "space":
        setTheme("space");
        space();
        break;
      case "spacespider":
        setTheme("spacespider");
        spacespider();
        break;
      case "spaceworm":
        setTheme("spaceworm");
        spaceworm();
        break;
      case "stars":
        setTheme("stars");
        stars();
        break;
      case "tunnel":
        setTheme("tunnel");
        tunnel();
        break;
      case "waves":
        setTheme("waves");
        waves();
        break;
      default:
    }
  };
  return (
    <PlayGroundCanvas id="theme" height="calc(100vh - 86px)" width="100%" />
  );
}

export default SettingsThemePlayground;

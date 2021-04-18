import React, { useContext, useEffect } from "react";
import { ThemeContext } from "../../../contexts/ThemeContext";
import { FontContext } from "../../../contexts/FontContext";

function PageContent(props) {
  const { isDarkTheme, toggleTheme } = useContext(ThemeContext);
  const { isLegacyFont } = useContext(FontContext);

  useEffect(() => {
    const script = document.createElement("script");
    if (isDarkTheme && typeof isDarkTheme === "string") {
      script.src = `./canvasThemes/${isDarkTheme}.js`;
      if (!script.getAttribute("id")) {
        script.setAttribute("id", "theme");
      }
      script.async = true;
      document.body.appendChild(script);
    } else if (isDarkTheme && typeof isDarkTheme === "boolean") {
      toggleTheme(JSON.stringify("impulse"));
      window.location.reload();
    } else return () => document.body.removeChild(script);
    // eslint-disable-next-line
  }, []);

  const styles = {
    backgroundColor: isDarkTheme ? "transparent" : "#eee", // change to white
    color: isDarkTheme ? "white" : "black",
    minHeight: "100vh",
    margin: 0,
    padding: 0,
    position: "relative",
    zIndex: 1,
    pointerEvents: "none",
    fontFamily: `${isLegacyFont ? "Impulse" : "Roboto"}, sans-serif`,
  };
  return <div style={styles}>{props.children}</div>;
}

export default PageContent;

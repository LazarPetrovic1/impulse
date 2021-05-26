import React, { useContext, useEffect } from "react";
import { ThemeContext } from "../../../contexts/ThemeContext";
import { FontContext } from "../../../contexts/FontContext";
import { ColourContext } from "../../../contexts/ColourContext";
import StyledPageContent from '../../../styled/StyledPageContent';

function PageContent(props) {
  const { isDarkTheme, toggleTheme } = useContext(ThemeContext);
  const { isLegacyFont } = useContext(FontContext);
  const { colour } = useContext(ColourContext)

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

  return (
    <StyledPageContent
      isDarkTheme={isDarkTheme}
      isLegacyFont={isLegacyFont}
      colour={colour}
    >
      {props.children}
    </StyledPageContent>
  );
}

export default PageContent;

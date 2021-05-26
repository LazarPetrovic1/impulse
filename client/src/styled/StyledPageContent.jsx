import styled from 'styled-components'

const StyledPageContent = styled.section`
  background-color: ${props => props.isDarkTheme ? "transparent" : "#eee"};
  color: ${props => typeof props.colour === "string" ? props.colour : props.isDarkTheme ? "white" : "black" };
  min-height: 100vh;
  margin: 0;
  padding: 0;
  position: relative;
  z-index: 1;
  pointer-events: none;
  font-family: ${props => props.isLegacyFont ? "Impulse" : "Roboto"}, sans-serif;
  & code {
    color: ${props => typeof props.colour === "string" ? props.colour : props.isDarkTheme ? "white" : "black" };
    background-color: ${props => props.isDarkTheme ? "transparent" : "#eee"};
  }
`
// color: ${props => props.isDarkTheme ? "white" : "black"};

export default StyledPageContent;

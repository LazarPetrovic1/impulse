import styled from 'styled-components'

const SettingsSideNav = styled.nav`
  height: calc(100vh - 86px); /* navbar height */
  width: ${props => props.width};
  position: fixed;
  z-index: 3;
  top: 86px; /* navbar height */
  left: 0;
  border-top: 1px solid ${props => props.isDarkTheme ? "#ddd" : "#111"};
  border-right: 1px solid ${props => props.isDarkTheme ? "#ddd" : "#111"};
  background-color: ${props => props.isDarkTheme ? "#111" : "#ccc"};
  overflow-x: hidden;
  padding-top: 60px;
  & ul {
    list-style-type: none;
    margin: 0;
    padding-inline-start: 0;
  }
  & li {
    cursor: pointer;
    user-select: none;
    display: block;
    padding: 1rem 0 1rem 2rem;
    &.selected {
      background-color: ${props => props.isDarkTheme ? "#222" : "#bbb"};
      border-bottom: 1px solid ${props => props.isDarkTheme ? "#ddd" : "#111"};
    }
  }
  & a {
    padding: 8px 8px 8px 32px;
    text-decoration: none;
    font-size: 25px;
    color: #818181;
    display: block;
    transition: 0.3s;
    &:hover {
      color: #f1f1f1;
    }
  }
`

export default SettingsSideNav;

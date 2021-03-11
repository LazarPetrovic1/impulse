import styled from 'styled-components'

const SettingsLanguagesUl = styled.ul`
  width: 200px;
  height: 38px;
  line-height: 22px;
  vertical-align: middle;
  position: relative;
  background: #333;
  margin-left: 2.5rem;
  border: 1px solid #ccc;
  padding-inline-start: 0;
  overflow: hidden;
  &::after {
    content: "▼";
    font-size: 0.5em;
    font-family: arial;
    position: absolute;
    top: 50%;
    right: 5px;
    transform: translate(0, -50%);
  }
  &:hover {
    overflow: visible;
    &::after {
      content: "";
    }
    & > li {
      background-color: #333;
    }
  }
  & > li {
    padding: 0.5rem 0 0.5rem 1rem;
    cursor: pointer;
    display: flex;
    border-bottom: 1px solid #ccc;
    align-items: center;
    position: relative;
    z-index: 5;
    & > p {
      font-size: 20px;
      margin: 0 0 0 1rem;
    }
    &:hover {
      background-color: #555;
    }
  }
`

export default SettingsLanguagesUl;

import styled from "styled-components";

const LeftSideNavigation = styled.nav`
  background: transparent;
  border-right: 1px solid ${(props) => (props.isDarkTheme ? "#eee" : "#111")};
  text-align: center;
  grid-column: span 2 / auto;
  & > ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    width: 100%;
    & > li {
      padding: 1rem;
      position: relative;
      display: block;
      width: 100%;
      transition: all 150ms;
      &:hover {
        background-color: ${(props) => (props.isDarkTheme ? "#eee" : "#111")};
        & > a {
          color: ${(props) => (props.isDarkTheme ? "#111" : "#eee")};
        }
        &::before {
          transform: scaleX(1);
        }
        &::after {
          transform: scaleX(1);
        }
      }
      &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 2px;
        background-color: #3d3d3d;
        transform: scaleX(0);
        transition: all 0.5s;
        transform-origin: left;
      }
      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        right: 0;
        width: 100%;
        height: 2px;
        background-color: #3d3d3d;
        transform: scaleX(0);
        transition: all 0.5s;
        transform-origin: right;
      }
      & > a {
        color: ${(props) => (props.isDarkTheme ? "#eee" : "#111")};
        font-size: 20px;
        text-decoration: none;
        text-transform: uppercase;
        padding: 5px 10px;
        margin: 0 10px;
        position: relative;
        transition: all 150ms;
      }
    }
  }

  @media (max-width: 631px) {
    grid-column: span 1 / auto;
    & > ul {
      & > li {
        padding: 1rem 0.3rem;
        position: relative;
        display: block;
        transition: all 150ms;
        &:hover {
          background-color: ${(props) => (props.isDarkTheme ? "#eee" : "#111")};
          & > a {
            color: ${(props) => (props.isDarkTheme ? "#111" : "#eee")};
          }
          &::before {
            transform: scaleX(1);
          }
          &::after {
            transform: scaleX(1);
          }
        }
        &::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background-color: #3d3d3d;
          transform: scaleX(0);
          transition: all 0.5s;
          transform-origin: left;
        }
        &::after {
          content: "";
          position: absolute;
          bottom: 0;
          right: 0;
          width: 100%;
          height: 2px;
          background-color: #3d3d3d;
          transform: scaleX(0);
          transition: all 0.5s;
          transform-origin: right;
        }
        & > a {
          color: ${(props) => (props.isDarkTheme ? "#eee" : "#111")};
          font-size: 20px;
          text-decoration: none;
          text-transform: uppercase;
          padding: 5px 10px;
          margin: 0 10px;
          position: relative;
          transition: all 150ms;
        }
    }
  }
`;

export default LeftSideNavigation;

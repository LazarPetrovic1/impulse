import React from "react";
import styled from "styled-components";

const ProgressBar = styled.ul`
  max-width: 1000px;
  pointer-events: all;
  margin: 1.5rem auto 140px auto;
  padding: 0;
  counter-reset: step;
  & li {
    list-style-type: none;
    width: calc(100% / 7);
    float: left;
    font-size: 11px;
    position: relative;
    text-align: center;
    text-transform: uppercase;
    color: #7d7d7d;
    &[name="important"] {
      font-style: oblique;
      font-weight: bolder;
    }
    &:before {
      width: 30px;
      height: 30px;
      content: counter(step);
      counter-increment: step;
      line-height: 30px;
      border: 2px solid #7d7d7d;
      display: block;
      text-align: center;
      margin: 0 auto 10px auto;
      border-radius: 50%;
      background-color: white;
    }
    &:after {
      width: 100%;
      height: 2px;
      content: "";
      position: absolute;
      background-color: #7d7d7d;
      top: 15px;
      left: -50%;
      z-index: -1;
    }
    &:first-child:after {
      content: none;
    }
    &.active {
      color: green;
      &::before {
        border-color: #55b776;
      }
    }
    &.active + li::after {
      background-color: #55b776;
    }
  }
`;

function RegisterSteps({ progress }) {
  return (
    <ProgressBar>
      <li name="important" className={progress >= 0 ? "active" : ""}>
        Basic Information
      </li>
      <li name="important" className={progress >= 1 ? "active" : ""}>
        Profile Information
      </li>
      <li className={progress >= 2 ? "active" : ""}>Your bio</li>
      <li className={progress >= 3 ? "active" : ""}>Other information</li>
      <li name="important" className={progress >= 4 ? "active" : ""}>
        License, terms and conditions
      </li>
      <li name="important" className={progress >= 5 ? "active" : ""}>
        Security question
      </li>
      {/*<li className={progress >= 6 ? "active" : ""}>
        Snap an image (for validation)
      </li>*/}
      <li className={progress >= 7 ? "active" : ""}>Information overview</li>
    </ProgressBar>
  );
}

export default RegisterSteps;

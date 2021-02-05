import React from 'react';
import styled from 'styled-components'

const StepsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0.5rem;
  & > div {
    border-top: 0.3rem solid #c0c0c0;
    color: #c0c0c0;
    flex: 1;
    padding: 1rem;
    font-weight: bold;
    font-size: 13px;
    text-align: center;
  }
  & > div.active {
    border-top-color: rgb(123, 167, 226);
    color: rgb(123, 167, 226);
  }
`

function RegisterSteps({ progress }) {
  return (
    <StepsContainer>
      <div className={progress >= 0 ? 'active' : ''}>Basic Personal Information</div>
      <div className={progress >= 1 ? 'active' : ''}>Basic Profile Information</div>
      <div className={progress >= 2 ? 'active' : ''}>Your bio</div>
      <div className={progress >= 3 ? 'active' : ''}>Other relevant information</div>
      <div className={progress >= 4 ? 'active' : ''}>License, terms and conditions</div>
      <div className={progress >= 5 ? 'active' : ''}>Security question</div>
      <div className={progress >= 6 ? 'active' : ''}>Snap an image (for validation)</div>
      <div className={progress >= 7 ? 'active' : ''}>Information overview</div>
    </StepsContainer>
  );
}

export default RegisterSteps;

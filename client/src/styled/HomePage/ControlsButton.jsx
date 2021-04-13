import styled from "styled-components";

const ControlsButton = styled.button`
  flex: 1;
  @media only screen and (max-width: 600px) {
    span[name="text"] {
      display: none;
    }
  }
`;

export default ControlsButton;

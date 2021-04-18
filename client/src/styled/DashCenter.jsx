import styled from "styled-components";

const DashCenter = styled.div`
  display: ${(props) => (props.display ? props.display : "flex")};
  justify-content: ${(props) => props.justification};
  flex-direction: ${(props) => (props.flexDir ? props.flexDir : "row")};
  align-items: center;
  flex-wrap: wrap;
  pointer-events: all;
  margin: 1rem auto;
  @media only screen and (max-width: 1920px) and (max-height: 1080px) {
    max-width: ${(props) => props.maxw || "80%"};
    /* height: 800px; */
  }
  @media only screen and (max-width: 992px) {
    max-width: 90%;
    /* height: 600px; */
  }
  @media only screen and (max-width: 600px) {
    max-width: 300px;
    /* height: 400px; */
  }
`;

export default DashCenter;

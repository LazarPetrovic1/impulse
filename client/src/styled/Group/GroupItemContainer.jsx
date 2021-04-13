import styled from "styled-components";

const GroupItemContainer = styled.section`
  @media only screen and (min-width: 601px) {
    article {
      max-width: 200px;
    }
    img {
      width: 200px;
      height: 160px;
    }
  }
  @media only screen and (max-width: 600px) {
    width: 90%;
    article {
      width: 100%;
      display: flex;
    }
    img {
      width: 100px;
      height: 80px;
    }
    p[name="about"],
    p[name="people"],
    p[name="isauth"],
    p[name="isseen"],
    p[name="date"] {
      display: none;
    }
  }
`;

export default GroupItemContainer;

import styled from "styled-components";
import brokenLogo from "../../assets/impulse-logos-redesigned/Impulse_logo_broken_2.png";

const BrokenLogo = styled.img.attrs(() => ({
  alt: "It's broken!",
  title: "It's broken!",
  src: brokenLogo,
}))`
  user-select: none;
`;

export default BrokenLogo;

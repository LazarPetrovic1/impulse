import styled from "styled-components";

const ResponsiveVideo = styled.video.attrs(() => ({
  controls: true,
  autoPlay: true,
}))`
  width: 100%;
  height: auto;
`;

export default ResponsiveVideo;

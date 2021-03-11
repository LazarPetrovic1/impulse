import styled from 'styled-components'

const ImageSliderContainer = styled.article`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: auto;
  & button[name="slider"] {
    border: 0;
    outline: 0;
    height: 100%;
    cursor: pointer;
    flex: 1;
    font-size: 2.5rem;
    background-color: transparent;
    color: ${props => props.isDarkTheme ? 'rgb(220, 220, 220)' : 'rgb(45, 45, 45)'};
    transition: all 100ms linear;
    &:hover {
      color: ${props => props.isDarkTheme ? 'rgb(180, 180, 180)' : 'rgb(10, 10, 10)'};
    }
  }
`

export default ImageSliderContainer;

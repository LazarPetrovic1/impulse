import styled from 'styled-components'

const CloseImageSlider = styled.span`
  position: absolute;
  top: 1rem;
  right: 1rem;
  border-radius: 50%;
  color: ${props => props.isDarkTheme ? 'rgb(220, 220, 220)' : 'rgb(45, 45, 45)'};
  transition: all 100ms linear;
  font-size: 2.5rem;
  cursor: pointer;
  &:hover {
    color: ${props => props.isDarkTheme ? 'rgb(180, 180, 180)' : 'rgb(10, 10, 10)'};
  }
`
export default CloseImageSlider;

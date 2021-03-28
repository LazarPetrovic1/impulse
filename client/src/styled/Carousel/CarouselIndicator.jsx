import styled from 'styled-components'

const CarouselIndicators = styled.li`
  position: relative;
  flex: 0 1 auto;
  width: 1.5em;
  height: 0.3em;
  margin: 0 0.3em;
  background: #111;
  cursor: pointer;
  &:hover { background: #ddd; }
  &.active {
    background: #eee;
    cursor: default;
  }
`

export default CarouselIndicators;

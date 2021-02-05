import styled from 'styled-components'

const Container = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  max-width: ${({ maxWidth }) => maxWidth && `${maxWidth}px`};
  max-height: ${({ maxHeight }) => maxHeight && `${maxHeight}px`};
`

export default Container;

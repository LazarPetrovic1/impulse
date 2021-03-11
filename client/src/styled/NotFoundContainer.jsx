import styled from 'styled-components'

const NotFoundContainer = styled.div`
  border: 2px solid ${props => props.isDarkTheme ? '#eee' : "#111"};
  padding: 2rem 3rem 3rem 3rem;
  border-radius: 1rem;
  pointer-events: all;
  & img {
    user-select: none;
  }
`

export default NotFoundContainer;

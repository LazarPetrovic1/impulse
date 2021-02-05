import styled from 'styled-components'

const ForumGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-gap: 10px;
  & div[name="divider"] {
    grid-column: span 1 / auto;
  }
`

export default ForumGrid;

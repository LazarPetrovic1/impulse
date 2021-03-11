import styled from 'styled-components'

const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  padding: 0.5rem;
  & div[name="information"] {
    display: flex;
  }
  & p[name="date"] {
    display: flex;
    justify-content: flex-end;
  }
`

export default CommentContainer;

import styled from 'styled-components'

const ViewCounter = styled.h1`
  font-style: oblique;
  letter-spacing: 1.5px;
  text-decoration: underline;
  & > span {
    padding-bottom: 10px;
    display: inline-block;
    border-bottom: 2px double white;
  }
`

export default ViewCounter;

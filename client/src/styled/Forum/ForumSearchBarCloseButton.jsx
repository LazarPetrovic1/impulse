import styled from 'styled-components'

const ForumSearchBarCloseButton = styled.i.attrs(() => ({
  className: 'fas fa-times'
}))`
  position: absolute;
  top: 10px;
  right: 20px;
  color: #111 !important;
`

export default ForumSearchBarCloseButton;

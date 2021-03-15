import styled from 'styled-components'

const ChatFileUpload = styled.div`
  display: inline-block;
  & label[for="file"],
  span[title="Insert Emoji"] {
    display: inline-block;
    padding: 6px 12px;
    cursor: pointer;
  }
  & input[type="file"] {
    display: none;
  }
`

export default ChatFileUpload;

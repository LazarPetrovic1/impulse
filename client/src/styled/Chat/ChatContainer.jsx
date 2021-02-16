import styled from 'styled-components'

const ChatContainer = styled.article`
  display: grid;
  pointer-events: all;
  grid-template-columns: repeat(5, 1fr);
  /* grid-gap: 10px; */
  & div[name="messages"] {
    grid-column: span 4 / auto;
    position: relative;
    & div[name="message-holder"] {
      padding: 0 2rem;
      height: calc(100vh - 86px - 38px);
      overflow: auto;
    }
    & form {
      position: absolute;
      bottom: 0;
      left: 0;
      display: flex;
      width: 100%;
      & input {
        flex: 1;
      }
    }
  }
  & div[name="messages"],
  & div[name="chatsidebar"] {
    height: calc(100vh - 86px);
    background-color: ${props => props.isDarkTheme ? "rgba(0, 0, 0, 0.6)" : "rgba(255, 255, 255, 0.6)"};
  }
  & div[name="chatsidebar"] {
    border-right: 1px solid ${props => props.isDarkTheme ? "#eee" : "#111"};
  }
`

export default ChatContainer;

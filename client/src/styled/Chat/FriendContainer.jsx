import styled from 'styled-components'

const FriendContainer = styled.div`
  padding: 0.5rem 1rem;
  border-bottom: 1px solid ${props => props.isDarkTheme ? "#eee" : "#111"};
  background-color: ${props =>
    props.isDarkTheme && props.selected ? "#222" :
    !props.isDarkTheme && props.selected ? "#ddd" :
    props.isDarkTheme && !props.selected ? "#111" :
    !props.isDarkTheme && !props.selected ? "#eee" : "transparent"
  };
  font-size: 22px;
  user-select: none;
  cursor: pointer;
  & span {
    display: inline-block;
    margin-left: 0.5rem;
  }
`

export default FriendContainer;

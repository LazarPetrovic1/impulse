import styled from 'styled-components'

const Button = styled.button`
  width: 75%;
  min-width: 250px;
  max-width: 640px;
  margin-top: 24px;
  padding: 7px 12px;
  font-size: 17px;
  border: 0;
  background: ${props => props.isDarkTheme ? '#242424' : '#ddd'};
  border-radius: 1rem;
  color: ${props => props.isDarkTheme ? '#ddd' : '#242424'};
  &:focus {
    outline: 0;
  }
`

export default Button;

import styled from 'styled-components'

const StatsNames = styled.div`
  position: absolute;
  bottom: -4rem;
  right: -6rem;
  z-index: 2;
  background-color: ${props => !!props.isDarkTheme ? "#111" : "#eee"};
  padding: 1rem;
  min-width: 150px;
`

export default StatsNames;

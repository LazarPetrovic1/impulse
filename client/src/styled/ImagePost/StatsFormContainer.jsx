import styled from 'styled-components'

const StatsFormContainer = styled.article`
  width: ${props => props.width ? props.width : "80%"};
  margin: ${props => props.margin ? props.margin : "0 auto 2rem auto"};
`

export default StatsFormContainer;

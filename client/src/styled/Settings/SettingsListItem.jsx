import styled from 'styled-components'

const SettingsListItem = styled.li`
  background: ${props => props.isDarkTheme ? 'transparent' : "#ddd"};
  border-bottom: 1px solid ${props => props.isDarkTheme && !props.isLast ? '#ddd' : "#111"};
  display: flex;
  ${props => props.getCenter && `
    align-items: center
  `}
  overflow: auto;
`

export default SettingsListItem;

import styled from 'styled-components'

const DashboardSideMenuUl = styled.ul.attrs(() => ({
  className: 'navbar-nav mr-auto'
}))`
  position: absolute;
  left: -50px;
  & li {
    transition: all 250ms linear;
    &:hover {
      transform: translate(30px, 0);
    }
  }
`

export default DashboardSideMenuUl;

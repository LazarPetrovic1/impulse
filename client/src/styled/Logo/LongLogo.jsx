import styled from 'styled-components'
import longLogo from '../../assets/IMPULSE_LOGOS/photoshop-logos/long.png';

const LongLogo = styled.img.attrs(() => ({
  alt: 'Impulse: Make an impact. Change lives.',
  title: 'Impulse: Make an impact. Change lives.',
  src: longLogo
}))`
  user-select: none;
`

export default LongLogo;

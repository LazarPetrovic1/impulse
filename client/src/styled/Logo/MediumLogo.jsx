import styled from 'styled-components'
import mediumLogo from '../../assets/impulse-logos-redesigned/Impulse_logo_medium.png';

const MediumLogo = styled.img.attrs(() => ({
  alt: 'Impulse: Make an impact. Change lives.',
  title: 'Impulse: Make an impact. Change lives.',
  src: mediumLogo
}))`
  height: 60px;
  user-select: none;
`

export default MediumLogo;

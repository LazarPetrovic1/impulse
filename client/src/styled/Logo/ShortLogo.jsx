import styled from 'styled-components'
// import shortLogo from '../../assets/impulse-logos-old/short.png';
import shortLogo from '../../assets/impulse-logos-redesigned/Impulse_logo_short.png';

const ShortLogo = styled.img.attrs(() => ({
  alt: 'Impulse: Make an impact. Change lives.',
  title: 'Impulse: Make an impact. Change lives.',
  src: shortLogo
}))`
  user-select: none;
  filter: ${props => props.liked === 'impulse' ? "none" : "grayscale(100%)"};
`

export default ShortLogo;

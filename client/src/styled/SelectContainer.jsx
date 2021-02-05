import styled from 'styled-components'

const SelectContainer = styled.section`
  padding: ${props => props.padding ? props.padding : '0.6rem 1rem'};
  position: relative;
  /* min-width: ${props => props.minw ? props.minw : '200px'}; */
  min-width: 130px;
  float: left;
  & select::-ms-expand {
    display: none;
  }
  &::after {
    content: '<>';
    margin-right: ${props => props.mrafter ? props.mrafter : '0'};
    font: 17px "Consolas", monospace;
    color: ${props => props.isDarkTheme ? '#fff' : '#111'};
    -webkit-transform: rotate(90deg) translateX(-100%);
    -moz-transform: rotate(90deg) translateX(-100%);
    -ms-transform: rotate(90deg) translateX(-100%);
    transform: rotate(90deg) translateX(-100%);
    right: 3px;
    top: calc(50% + 7px); /* ~ margtop + label marg-bot / 2 */
    padding: 0 0 2px;
    border-bottom: 1px solid #999;
    position: absolute;
    pointer-events: none;
  }
  & select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    display: block;
    width: 100%;
    float: right;
    margin-top: 10px;
    padding: 10px 35px 10px 25px;
    font-size: 16px;
    line-height: 1.75;
    border: 1px solid ${props => props.isDarkTheme ? '#fff' : '#111'};
    background: ${props => props.isDarkTheme ? '#111' : '#fff'};;
    color: ${props => props.isDarkTheme ? '#fff' : '#111'};
    border: 1px solid ${props => props.isDarkTheme ? '#eee' : '#111'};
    background-image: none;
    -ms-word-break: normal;
    word-break: normal;
  }
`

export default SelectContainer;

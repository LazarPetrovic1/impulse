import styled from "styled-components";

const SearchButton = styled.i.attrs(() => ({
  className: "fas fa-search",
}))`
  position: absolute;
  top: 50%;
  left: 1rem;
  color: black;
  transform: translateY(-50%);
`;

export default SearchButton;

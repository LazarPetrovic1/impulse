import React, { Fragment } from 'react';
import styled from 'styled-components'
import SocialSearchResultsContainer from '../../../styled/SocialSearchResultsContainer';
import SocialResultItem from './SocialResultItem';

const SearchButton = styled.i.attrs(() => ({
  className: "fas fa-search"
}))`
  position: absolute;
  top: 50%;
  left: 1rem;
  color: black;
  transform: translateY(-50%)
`

function SocialSearch({ search, onInputChange, searchResults }) {
  return (
    <Fragment>
      <div className={`form-group position-relative ${search.length > 2 && "mb-0"}`} style={{ pointerEvents: 'all' }}>
        <input
          type="search"
          className="form-control"
          style={{
            paddingLeft: "2.5rem",
            paddingRight: "2.5rem"
          }}
          placeholder="Search for people..."
          value={search}
          onChange={onInputChange}
        />
        <SearchButton />
      </div>
      {search.length > 2 && (
        <SocialSearchResultsContainer className="mb-2">
          {searchResults && searchResults.length > 0 && searchResults.map(sr => (
            <SocialResultItem key={sr._id} sr={sr} />
          ))}
        </SocialSearchResultsContainer>
      )}
    </Fragment>
  )
}

export default SocialSearch;

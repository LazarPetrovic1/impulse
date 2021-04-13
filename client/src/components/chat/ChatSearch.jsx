import React, { Fragment, useContext, useState, useEffect } from "react";
import ChatSearchResultsContainer from "../../styled/Chat/ChatSearchResultsContainer";
import ChatResultItem from "./ChatResultItem";
import { LanguageContext } from "../../contexts/LanguageContext";
import { socialsearchcomponent } from "../../utils/langObject";
import axios from "axios";
import { uniqueArray } from "../../utils/arr";
import SearchButton from "../../styled/SearchButton";

const { _searchforpeople } = socialsearchcomponent;

function ChatSearch({ selectPerson, people }) {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const searchPeople = async (value) => {
    const res = await axios.post("/api/users/search", { search: value });
    await setSearchResults(
      res.data.length > 1 ? uniqueArray(res.data) : res.data
    );
  };

  const onInputChange = (e) => setSearch(e.target.value);
  const { language } = useContext(LanguageContext);

  useEffect(() => {
    (function () {
      console.log(search.length >= 2);
      if (search.length >= 2) {
        searchPeople(search);
      } else if (search.length < 2) {
        setSearchResults([]);
      }
    })();
  }, [search]);

  return (
    <Fragment>
      <div
        className={`form-group position-relative ${
          searchResults.length > 0 && "mb-0"
        }`}
        style={{ pointerEvents: "all" }}
      >
        <input
          type="search"
          className="form-control"
          style={{
            paddingLeft: "2.5rem",
            paddingRight: "1rem",
          }}
          placeholder={_searchforpeople[language]}
          value={search}
          onChange={onInputChange}
        />
        <SearchButton />
      </div>
      <div className="position-relative" style={{ height: 0 }}>
        {searchResults.length > 0 && (
          <ChatSearchResultsContainer className="mb-2">
            {searchResults.length > 0 &&
              searchResults.map((sr) => (
                <ChatResultItem
                  selectPerson={selectPerson}
                  setSearch={setSearch}
                  key={sr._id}
                  sr={sr}
                  people={people}
                />
              ))}
          </ChatSearchResultsContainer>
        )}
      </div>
    </Fragment>
  );
}

export default ChatSearch;

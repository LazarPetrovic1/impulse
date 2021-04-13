import React from "react";

function ChatResultItem({ sr, selectPerson, setSearch, people }) {
  const { firstName, _id, lastName, username } = sr;
  const pickPerson = () => {
    selectPerson(_id);
    setSearch("");
  };

  return (
    <div
      className="d-flex"
      onClick={pickPerson}
      style={{
        cursor: "pointer",
        backgroundColor: people.includes(_id) ? "#bdcdf4" : "#fff",
        padding: "0.3rem 2.5rem",
      }}
    >
      <img
        className="img-thumbnail rounded-circle"
        src={`https://robohash.org/${_id}?set=set4&size=40x40`}
        alt={`${firstName}'s avatar`}
      />
      <div className="d-flex flex-column ml-5">
        <p className="mb-1">
          {firstName} {lastName}
          <br />
          <span className="mb-1 text-muted">(@{username})</span>
        </p>
      </div>
    </div>
  );
}

export default ChatResultItem;

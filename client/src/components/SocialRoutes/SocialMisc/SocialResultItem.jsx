import React from 'react';
import { Link } from 'react-router-dom';

function SocialResultItem({ sr }) {
  const {
    firstName,
    _id,
    lastName,
    username,
    email,
    zip,
    city,
    country,
    sex
  } = sr

  return (
    <div className="d-flex">
      <img
        className="img-thumbnail rounded-circle"
        src="https://randomuser.me/api/portraits/men/8.jpg"
        alt={`${firstName}'s avatar`}
      />
      <div className="d-flex flex-column ml-5">
        <p className="mb-1"><Link to={`/social/profile/${_id}`}>{firstName} {lastName}</Link></p>
        <p className="mb-1 text-muted">@{username}</p>
        <p className="mb-1">{email}</p>
        <p className="mb-1">{zip}, {city}, {country}</p>
        <p
          className="mb-1"
          style={{ color: sex === 'm' ? "navy" : sex === 'f' ? "pink" : "darkgray" }}
        >
          {sex === 'm' ? "Male" : sex === 'f' ? "Female" : "<Redacted>"}
        </p>
      </div>
    </div>
  )
}

export default SocialResultItem;

import React from 'react';
import { Link } from 'react-router-dom';

function SocialSearchItem({ fs, src }) {
  const {
    firstName,
    lastName,
    username,
    sex,
    city,
    country,
    _id
  } = fs
  return (
    <div className="border d-inline-block p-3 mx-3" style={{ pointerEvents: 'all' }}>
      <div className="text-center mb-2">
        <img className="img-thumbnail rounded-circle" src={src} alt={`${firstName}'s avatar`} />
      </div>
      <div>
        <Link to={`/social/profile/${_id}`}>{firstName} {lastName}</Link>
      </div>
      <div>@{username}</div>
      <div>{sex === 'm' ? "Male" : sex === "f" ? "Female" : "Hidden"}</div>
      <div><b>{city}</b></div>
      <div>{country}</div>
    </div>
  )
}

export default SocialSearchItem;

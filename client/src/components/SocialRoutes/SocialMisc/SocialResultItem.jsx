import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../../../contexts/LanguageContext';
import { socialsearchitemcomponent } from '../../../utils/langObject';

const {
  _male,
  _female,
  _hidden
} = socialsearchitemcomponent

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
  const { language } = useContext(LanguageContext)

  return (
    <div className="d-flex">
      <img
        className="img-thumbnail rounded-circle"
        src={`https://robohash.org/${_id}?set=set4&size=150x150`}
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
          {sex === 'm' ? `${_male[language]}` : sex === 'f' ? `${_female[language]}` : `${_hidden[language]}`}
        </p>
      </div>
    </div>
  )
}

export default SocialResultItem;

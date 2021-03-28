import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../../../contexts/LanguageContext';
import { socialsearchitemcomponent } from '../../../utils/langObject';

const {
  _male,
  _female,
  _hidden
} = socialsearchitemcomponent

function SocialSearchItem({ fs, src }) {
  const { language } = useContext(LanguageContext)
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
      <div className="text-center mb-2" style={{ userSelect: 'none' }}>
        <img className="img-thumbnail rounded-circle" src={src} alt={`${firstName}'s avatar`} />
      </div>
      <div style={{ userSelect: 'none' }}>
        <Link to={`/social/profile/${_id}`}>{firstName} {lastName}</Link>
      </div>
      <div style={{ userSelect: 'none' }}>@{username}</div>
      <div style={{ userSelect: 'none' }}>{sex === 'm' ? `${_male[language]}` : sex === "f" ? `${_female[language]}` : `${_hidden[language]}`}</div>
      <div style={{ userSelect: 'none' }}><b>{city}</b></div>
      <div style={{ userSelect: 'none' }}>{country}</div>
    </div>
  )
}

export default SocialSearchItem;

import React, { Fragment, useContext } from 'react';
import { registercomponent } from "../../../utils/langObject"
import { LanguageContext } from '../../../contexts/LanguageContext'
import BioTextArea from '../../../styled/BioTextArea';

const {
  tellusalittlebit,
  yourbio,
  looksgood
} = registercomponent

function StepThree({ bio, onChange, onProgressChange }) {
  const { language } = useContext(LanguageContext)
  return (
    <Fragment>
      <h2 className='mb-2'>{tellusalittlebit[language]}</h2>
      <label htmlFor='bio'>{yourbio[language]}:{' '}</label>
      <BioTextArea
        className={
          bio
            ? 'form-control is-valid'
            : 'form-control is-invalid'
        }
        placeholder={tellusalittlebit[language]}
        name='bio'
        value={bio}
        required
        onChange={onChange}
      />
      {bio ? (
        <div className='valid-feedback mt-5'>{looksgood[language]}</div>
      ) : (
        <div className='invalid-feedback mt-5'>{tellusalittlebit[language]}</div>
      )}
      <div className="d-flex justify-content-end">
        <button className="btn btn-secondary" onClick={() => onProgressChange([bio])}>
          Proceed&nbsp;&nbsp;<i className="fas fa-arrow-right"></i>
        </button>
      </div>
    </Fragment>
  )
}

export default StepThree;

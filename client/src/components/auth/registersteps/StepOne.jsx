import React, { Fragment, useContext } from 'react';
import { registercomponent } from "../../../utils/langObject"
import { LanguageContext } from '../../../contexts/LanguageContext'

const {
  yourbasic,
  _firstname,
  looksgood,
  pleaseenter,
  _name,
  _lastname,
  _email,
  yoursex,
  male,
  female,
  nospecify
} = registercomponent

function StepOne({
  onChange,
  firstName,
  lastName,
  email,
  sex,
  onProgressChange
}) {
  const { language } = useContext(LanguageContext)
  return (
    <Fragment>
      <h2 className='mb-2'>{yourbasic[language]}</h2>
      <label htmlFor='firstName'>{_firstname[language]}</label>
      <input
        type='text'
        onChange={onChange}
        name='firstName'
        value={firstName}
        className={
          firstName
          ? `form-control is-valid`
          : 'form-control is-invalid'
        }
        placeholder={_firstname[language]}
        required
      />
      {firstName ? (
        <div className='valid-feedback'>{looksgood[language]}</div>
      ) : (
        <div className='invalid-feedback'>{pleaseenter[language]}{" "}{_name[language]}</div>
      )}
      <label htmlFor='lastName'>{_lastname[language]}</label>
      <input
        type='text'
        className={
          lastName
          ? `form-control is-valid`
          : 'form-control is-invalid'
        }
        value={lastName}
        name='lastName'
        onChange={onChange}
        placeholder={_lastname[language]}
        required
      />
      {lastName ? (
        <div className='valid-feedback'>{looksgood[language]}</div>
      ) : (
        <div className='invalid-feedback'>{pleaseenter[language]}{" "}{_name[language]}</div>
      )}
      <label htmlFor='email'>{_email[language]}</label>
      <input
        type='email'
        className={
          email
          ? `form-control is-valid`
          : 'form-control is-invalid'
        }
        value={email}
        name='email'
        onChange={onChange}
        required
        placeholder={_email[language]}
      />
      {email ? (
        <div className='valid-feedback'>{looksgood[language]}</div>
      ) : (
        <div className='invalid-feedback'>{pleaseenter[language]}{" "}{_email[language]}</div>
      )}
      <label htmlFor='sex' className='mt-4'>{yoursex[language]}</label>
      <div className='custom-control custom-radio'>
        <input
          type='radio'
          id='male'
          name='sex'
          className={
            sex === 'm'
            ? 'custom-control-input is-valid'
            : 'custom-control-input is-invalid'
          }
          value='m'
          onChange={onChange}
        />
        <label className='custom-control-label' htmlFor='male'>{male[language]}</label>
      </div>
      <div className='custom-control custom-radio'>
        <input
          type='radio'
          id='female'
          name='sex'
          className={
            sex === 'f'
            ? 'custom-control-input is-valid'
            : 'custom-control-input is-invalid'
          }
          value='f'
          onChange={onChange}
        />
        <label className='custom-control-label' htmlFor='female'>{female[language]}</label>
      </div>
      <div className='custom-control custom-radio'>
        <input
          type='radio'
          id='unknown'
          name='sex'
          className={
            sex === 'n/a'
            ? 'custom-control-input is-valid'
            : 'custom-control-input is-invalid'
          }
          value='n/a'
          onChange={onChange}
        />
        <label className='custom-control-label' htmlFor='unknown'>{nospecify[language]}</label>
      </div>
      {sex ? (
        <div className='d-block valid-feedback'>{looksgood[language]}</div>
      ) : (
        <div className='d-block invalid-feedback'>{pleaseenter[language]}{" "}{yoursex[language]}</div>
      )}
      <div className="d-flex justify-content-end">
        <button className="btn btn-secondary" onClick={() => onProgressChange([firstName, lastName, email, sex])}>
          Proceed&nbsp;&nbsp;<i className="fas fa-arrow-right"></i>
        </button>
      </div>
    </Fragment>
  )
}

export default StepOne;

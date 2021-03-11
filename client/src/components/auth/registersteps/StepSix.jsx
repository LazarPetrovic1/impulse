import React, { Fragment, useContext } from 'react';
import { registercomponent } from "../../../utils/langObject"
import { LanguageContext } from '../../../contexts/LanguageContext'

const {
  addsecurity,
  securityanswer,
  chooseone,
  _answer,
  looksgood,
  pleaseenter
} = registercomponent

function StepSix({
  setData,
  data,
  questions,
  question,
  onChange,
  security,
  onProgressChange
}) {
  const { language } = useContext(LanguageContext)
  return (
    <Fragment>
      <h2>{addsecurity[language]}</h2>
      <label htmlFor='question' className='mt-2'>{securityanswer[language]}</label>
      <select
        onChange={e =>
          setData({ ...data, question: e.target.value })
        }
        name='questions'
        className={
          question
            ? 'form-control is-valid'
            : 'form-control is-invalid'
        }
        required
      >
        <option value=''>{chooseone[language]}</option>
        {
          questions.map(
            quest => (
              <option value={quest} key={quest}>{quest}</option>
        ))}
      </select>
      <label htmlFor='security' className=' mt-2'>{_answer[language]}</label>
      <input
        type='text'
        name='security'
        disabled={!question}
        onChange={onChange}
        className={
          security
            ? `form-control is-valid`
            : 'form-control is-invalid'
        }
        placeholder={_answer[language]}
        value={security}
        required
      />
      {
        security ? (
          <div className='valid-feedback'>{looksgood[language]}</div>
        ) : (
          <div className='invalid-feedback'>{pleaseenter[language]}{" "}{_answer[language]}</div>
      )}
      <div className="d-flex justify-content-end">
        <button className="btn btn-secondary" onClick={() => onProgressChange([security])}>
          Proceed&nbsp;&nbsp;<i className="fas fa-arrow-right"></i>
        </button>
      </div>
    </Fragment>
  )
}

export default StepSix;

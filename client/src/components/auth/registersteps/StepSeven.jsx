import React, { Fragment, useContext } from 'react';
import { registercomponent } from "../../../utils/langObject"
import { LanguageContext } from '../../../contexts/LanguageContext'
import Camera from '../../misc/Camera'

const {
  picturetext,
  compeletelyoptional,
  pleasenote
} = registercomponent

function StepSeven({ setImage, onProgressChange }) {
  const { language } = useContext(LanguageContext)
  return (
    <Fragment>
      <article>
        <h5 className="mb-3">{picturetext[language]}{" "}<b>{compeletelyoptional[language]}</b></h5>
        <Camera
          onCapture={blob => setImage(blob)}
          onClear={() => setImage(null)}
        />
        <p className='mt-3'>{pleasenote[language]}</p>
      </article>
      <div className="d-flex justify-content-end">
        <button className="btn btn-secondary" onClick={() => onProgressChange([true])}>
          Proceed&nbsp;&nbsp;<i className="fas fa-arrow-right"></i>
        </button>
      </div>
    </Fragment>
  )
}

export default StepSeven;

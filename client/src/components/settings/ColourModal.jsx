import React, { useContext } from 'react';
import { ColourContext } from "../../contexts/ColourContext";
import ChromePicker from 'react-color';
import Modal from '../utils/Modal';

function ColourModal({ title, show, onClose }) {
  const { colour, setColour, background, setBackground } = useContext(ColourContext)
  const getBg = (clr) => {
    const { rgb: { r, g, b, a } } = clr
    setBackground(`rgba(${r}, ${g}, ${b}, ${a})`)
  }
  return (
    <Modal
      show={show}
      onClose={onClose}
      title={title}
      provideOwnClosure
    >
      <div className="d-flex flex-column">
        <div className="p-3 d-flex flex-column justify-content-center">
          <h2>Text colour</h2>
          <ChromePicker
            color={colour}
            onChange={(clr) => setColour(clr.hex)}
          />
        </div>
        <div className="p-3 d-flex flex-column justify-content-center">
          <h2>Background colour</h2>
          <ChromePicker
            color={background}
            onChange={getBg}
          />
        </div>
        <h4 className="text-center" style={{ background }}>Change the text colour to something more... personal.</h4>
      </div>
    </Modal>
  )
}

export default ColourModal;

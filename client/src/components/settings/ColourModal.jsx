import React, { useContext } from "react";
import { ColourContext } from "../../contexts/ColourContext";
import ChromePicker from "react-color";
import Modal from "../utils/Modal";
import { LanguageContext } from "../../contexts/LanguageContext";
import { colourmodalcomponent } from "../../utils/langObject";

function ColourModal({ title, show, onClose }) {
  const { colour, setColour, background, setBackground } = useContext(
    ColourContext
  );
  const { _textcolour, _bgc, _changecolour } = colourmodalcomponent;
  const { language } = useContext(LanguageContext);
  const getBg = (clr) => {
    const {
      rgb: { r, g, b, a },
    } = clr;
    setBackground(`rgba(${r}, ${g}, ${b}, ${a})`);
  };
  return (
    <Modal show={show} onClose={onClose} title={title} provideOwnClosure>
      <div className="d-flex flex-column">
        <div className="p-3 d-flex flex-column justify-content-center">
          <h2>{_textcolour[language]}</h2>
          <ChromePicker color={colour} onChange={(clr) => setColour(clr.hex)} />
        </div>
        <div className="p-3 d-flex flex-column justify-content-center">
          <h2>{_bgc[language]}</h2>
          <ChromePicker color={background} onChange={getBg} />
        </div>
        <h4 className="text-center" style={{ background }}>
          {_changecolour[language]}
        </h4>
      </div>
    </Modal>
  );
}

export default ColourModal;

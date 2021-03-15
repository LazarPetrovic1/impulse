import React from 'react';
import ReactEmoji from 'react-emoji';
import emojis from '../../utils/emojis';

function EmojiPicker({ setMsg, msg }) {
  return (
    <div
      style={{
        maxWidth: "300px",
        maxHeight: "300px",
        overflowY: "auto",
        position: "absolute",
        bottom: "45px"
      }}
    >
      {emojis.map(e => (
        <button
          className="btn"
          onClick={() => setMsg(() => msg.concat(e, " "))}
        >
          {ReactEmoji.emojify(e)}
        </button>
      ))}
    </div>
  )
}

export default EmojiPicker;

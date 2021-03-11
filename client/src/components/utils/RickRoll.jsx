import React, { useState, useEffect } from 'react';
import songs from '../../utils/songs';

function RickRoll() {
  const [song, setSong] = useState("")
  useEffect(() => {
    setSong(songs[Math.floor(Math.random() * songs.length)])
  }, [])
  return song && (
    <iframe
      title={song}
      style={{
        width: "100%",
        height: "600px"
      }}
      src={`https://www.youtube.com/embed/${song}?controls=0&autoplay=1`}
      frameBorder="0"
      allow="autoplay;"
      allowFullScreen
      autoPlay
    />
  )
}

export default RickRoll;

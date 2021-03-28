import React, { useState, useEffect, useContext } from 'react';
import { searchGif } from '../../utils/gifpicker';
import { SocketContext } from '../../contexts/SocketContext'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const styles = {
  pointerEvents: "all",
  height: "400px",
  position: "absolute",
  bottom: "45px",
  background: "#eee",
  maxWidth: "485px",
  overflowY: "auto"
}

function GifPicker({ onMessageSubmit, chat, auth: { user } }) {
  const [results, setResults] = useState([])
  const [search, setSearch] = useState("")
  // eslint-disable-next-line
  const [rating, setRating] = useState('g')
  const { socket } = useContext(SocketContext)

  const addGif = (res) => {
    const media = [{
      name: res.title,
      type: 'gif',
      src: res.embed_url
    }]

    if (chat && chat._id) {
      socket.emit('message', {
        _id: chat._id,
        body: "",
        userId: user._id,
        isMedia: true,
        media
      })
    }
  }

  useEffect(() => {
    (async function() {
      try {
        const values = await searchGif('thunder and lightning', 'r')
        await setResults(values)
      } catch(e) {
        console.warn("Error, dude");
      }
    }());
  }, [])

  const onChange = async (e) => {
    e.persist()
    await setSearch(e.target.value)
    if (search.length > 3) {
      const valuesReturned = await searchGif(e.target.value)
      await setResults(valuesReturned)
    }
  }

  return (
    <div style={styles}>
      <input
        type="search"
        className="form-control"
        onChange={onChange}
        value={search}
      />
      <div>
        {results && results.length > 0 && results.map(res => (
          <div className="position-relative" key={res.embed_url}>
            <iframe
              key={res.embed_url}
              src={res.embed_url}
              title={res.title}
              width="480"
              height="284"
              frameBorder="0"
              className="giphy-embed"
            />
            <div onClick={() => addGif(res)} className="position-absolute" style={{ cursor: "pointer", top: 0, left: 0, height: "100%", width: "100%", zIndex: 10 }} />
          </div>
        ))}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

GifPicker.propTypes = {
  auth: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, null)(GifPicker);

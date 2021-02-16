import React, { useContext, useState, useEffect, useRef } from 'react';
import ChatContainer from '../../styled/Chat/ChatContainer';
import { ThemeContext } from '../../contexts/ThemeContext'
import { SocketContext } from '../../contexts/SocketContext'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Friend from './Friend';
import Moment from 'react-moment';
import ReactEmoji from 'react-emoji';

function Chat(props) {
  const { auth: { user } } = props
  const { isDarkTheme } = useContext(ThemeContext)
  const { socket } = useContext(SocketContext)
  const [msg, setMsg] = useState("")
  const [chat, setChat] = useState({})
  const [selected, setSelected] = useState(
    user.friends.length > 0 ? user.friends[0] : null
  )
  const selectFriend = (i) => setSelected(user.friends[i])
  const scroller = useRef()

  useEffect(() => {
    (async function() {
      try {
        await socket.emit('getChat', {
          userId: user && user._id,
          theirId: selected && selected.user && selected.user
        })
        if (!chat) {
          await socket.emit('getChat', {
            userId: selected && selected.user && selected.user,
            theirId: user && user._id
          })
        }
      } catch(e) {
        console.warn(e);
      }
    }());
    // eslint-disable-next-line
  }, [selected])

  useEffect(() => {
    socket.on('message', ({chatStuff, userId}) => {
      setChat(chatStuff)
    })
    socket.on('getChat', (chat) => setChat(chat))
    // eslint-disable-next-line
  }, [chat])

  const onMessageSubmit = (e) => {
    e.preventDefault()
    if (chat && chat._id) {
      socket.emit('message', { _id: chat._id, body: msg, userId: user._id })
    } else if (selected && selected.user && (!chat || !chat._id)) {
      socket.emit('spawnChat', { people: [user._id, selected.user], message: msg, userId: user._id })
      socket.emit('getChat', { userId: user._id, theirId: selected.user })
    }
    setMsg("")
  }

  useEffect(() => {
    scroller.current.scrollIntoView({ behavior: 'smooth' })
  }, [chat])

  return (
    <ChatContainer isDarkTheme={isDarkTheme}>
      <div name="chatsidebar">
        <h3 className="p-2">Current chats</h3>
        {user.friends.map((friend, i) => (
          <Friend
            selected={selected}
            setSelected={setSelected}
            selectFriend={selectFriend}
            key={friend.user}
            id={friend.user}
            i={i}
          />
        ))}
      </div>
      <div name="messages">
        <div name="message-holder">
          {chat && chat.messages && chat.messages.map(message => (
            <div key={message._id}>
              <div className={`d-flex my-3 ${message.user === user._id && "justify-content-end"}`}>
                <span style={{ borderRadius: '10px' }} className={`px-3 py-2 ${message.user === user._id ? "bg-primary" : "bg-secondary"}`}>{ReactEmoji.emojify(message.body)}</span>
                <sup className="text-muted d-inline-block px-2">
                  <Moment format="DD.MM.YYYY">{message.date}</Moment>
                </sup>
              </div>
            </div>
          ))}
          <div ref={scroller} />
        </div>
        {/* IT'S OWN COMPONENT */}
        <form onSubmit={e => onMessageSubmit(e)}>
          <input
            type="text"
            value={msg}
            onChange={e => setMsg(e.target.value)}
            className="form-control"
            placeholder="Type a message"
          />
          <button className="btn btn-secondary" type="submit">
            <i className="fas fa-paper-plane" />
          </button>
        </form>
      </div>
    </ChatContainer>
  )
}

Chat.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, null)(Chat);

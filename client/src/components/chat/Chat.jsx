import React, { useContext, useState, useEffect, useRef, useCallback } from 'react';
import { CHAT_DELIMITER } from '../../utils/nonReduxConstants';
import ChatContainer from '../../styled/Chat/ChatContainer';
import { ThemeContext } from '../../contexts/ThemeContext'
import { SocketContext } from '../../contexts/SocketContext'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Friend from './Friend';
import Moment from 'react-moment';
import ReactEmoji from 'react-emoji';
import ChatInput from './ChatInput';

function Chat(props) {
  const { auth: { user } } = props
  const [page, setPage] = useState(1)
  const { isDarkTheme } = useContext(ThemeContext)
  const { socket } = useContext(SocketContext)
  const [hasMore, setHasMore] = useState(true)
  const [msg, setMsg] = useState("")
  const [chat, setChat] = useState({})
  const [selected, setSelected] = useState(user.friends.length > 0 ? user.friends[0] : null)
  const selectFriend = async (i) => {
    await setPage(1)
    await setChat({})
    await setSelected(user.friends[i])
    setHasMore(true)
  }
  const scroller = useRef()
  const observer = useRef()
  const firstChatElementRef = useCallback((node) => {
    if (!hasMore) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        socket.emit("getInitialChatState", {
          userId: user && user._id,
          theirId: selected && selected.user && selected.user,
          page,
          limit: CHAT_DELIMITER
        })
        setPage((prevPage) => prevPage + 1)
      }
    })
    if (node) observer.current.observe(node)
    // eslint-disable-next-line
  }, [selected, hasMore, page])

  const sortChat = (prevChat, newChat) => {
    let newChatResult;
    let newChatResultMessages;
    if (prevChat && prevChat.messages && prevChat.messages.length > 0) {
      newChatResultMessages = [...new Set([ ...newChat.messages, ...prevChat.messages ])]
      newChatResult = {
        ...prevChat,
        messages: newChatResultMessages
      }
    } else {
      newChatResultMessages = [...new Set([...newChat.messages])]
      newChatResult = {
        ...newChat,
        messages: newChatResultMessages
      }
    }
    return newChatResult
  }

  useEffect(() => {
    socket.on('message', ({ message }) => {
      setChat((prevChat) => ({ ...prevChat, messages: [ ...prevChat.messages, message ] }))
    })
    socket.on("gotInitialChatState", ({ newChat, hasMoreValue }) => {
      if (newChat && newChat.messages.length < 1) {
        setHasMore(false)
        return
      }
      setChat((prevChat) => sortChat(prevChat, newChat))
      setHasMore(true)
    })
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    scroller.current.scrollIntoView({ behavior: 'smooth' })
  }, [chat, selected, hasMore, page])

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
          <div ref={firstChatElementRef} />
          {chat && chat.messages && chat.messages.map((message, i) => i === 0 ? (
            <div key={message._id}>
              <div className={`d-flex my-3 ${message.user === user._id && "justify-content-end"}`}>
                {message &&
                  message.isMedia &&
                  message.media &&
                  message.media.length > 0 &&
                  message.media.map(med => med.type === 'video' ? (
                    <video className="mx-2" src={med.src} style={{ maxHeight: "100px", width: "auto" }} />
                  ) : med.type === 'image' ? (
                    <img className="mx-2" src={med.src} style={{ maxHeight: "100px", width: "auto" }} alt="" />
                  ) : null
                )}
              </div>
              <div className={`d-flex my-3 ${message.user === user._id && "justify-content-end"}`}>
                <span style={{ borderRadius: '10px' }} className={`px-3 py-2 ${message.user === user._id ? "bg-primary" : "bg-secondary"}`}>{ReactEmoji.emojify(message.body)}</span>
                <sup className="text-muted d-inline-block px-2">
                  <Moment format="DD.MM.YYYY">{message.date}</Moment>
                </sup>
              </div>
            </div>
          ) : (
            <div key={message._id}>
              <div className={`d-flex my-3 ${message.user === user._id && "justify-content-end"}`}>
                {message &&
                  message.isMedia &&
                  message.media &&
                  message.media.length > 0 &&
                  message.media.map(med => med.type === 'video' ? (
                    <video className="mx-2" src={med.src} style={{ maxHeight: "100px", width: "auto" }} />
                  ) : med.type === 'image' ? (
                    <img className="mx-2" src={med.src} style={{ maxHeight: "100px", width: "auto" }} alt="" />
                  ) : null
                )}
              </div>
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
        <ChatInput
          chat={chat}
          selected={selected}
          msg={msg}
          setMsg={setMsg}
        />
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

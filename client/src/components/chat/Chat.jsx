import React, {
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { CHAT_DELIMITER } from "../../utils/nonReduxConstants";
import ChatContainer from "../../styled/Chat/ChatContainer";
import { ThemeContext } from "../../contexts/ThemeContext";
import { LanguageContext } from "../../contexts/LanguageContext";
import { SocketContext } from "../../contexts/SocketContext";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Friend from "./Friend";
import Moment from "react-moment";
import ReactEmoji from "react-emoji";
import ChatInput from "./ChatInput";
import groupData from "../../animations/generic/group.json";
import GenericIcon from "../utils/icons/GenericIcon";
import { chatcomponent } from "../../utils/langObject";
import ChatGroupModal from "./ChatGroupModal";
import ChatGroup from "./ChatGroup";

const { _creategroup } = chatcomponent;

function Chat(props) {
  const {
    auth: { user },
  } = props;
  const { isDarkTheme } = useContext(ThemeContext);
  const { socket } = useContext(SocketContext);
  const { language } = useContext(LanguageContext);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [chat, setChat] = useState({});
  const [groups, setGroups] = useState([]);
  const [selected, setSelected] = useState(
    user.friends.length > 0 ? user.friends[0] : null
  );
  const [createGroup, setCreateGroup] = useState(false);
  const selectFriend = async (i) => {
    console.log("CLICKING");
    await setPage(1);
    await setChat({});
    await setSelected(user.friends[i]);
    setHasMore(true);
  };
  const scroller = useRef();
  const observer = useRef();
  const firstChatElementRef = useCallback(
    (node) => {
      if (!hasMore) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          socket.emit("getInitialChatState", {
            people: [
              user && user._id,
              selected && selected.user ? selected.user : selected.people,
            ].flat(),
            page,
            limit: CHAT_DELIMITER,
          });
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    // eslint-disable-next-line
    [selected, hasMore, page]
  );

  const sortChat = (prevChat, newChat) => {
    let newChatResult;
    let newChatResultMessages;
    if (prevChat && prevChat.messages && prevChat.messages.length > 0) {
      newChatResultMessages = [
        ...new Set([...newChat.messages, ...prevChat.messages]),
      ];
      newChatResult = {
        ...prevChat,
        messages: newChatResultMessages,
      };
    } else {
      newChatResultMessages = [...new Set([...newChat.messages])];
      newChatResult = {
        ...newChat,
        messages: newChatResultMessages,
      };
    }
    return newChatResult;
  };

  useEffect(() => {
    socket.on("message", ({ message }) => {
      setChat((prevChat) => ({
        ...prevChat,
        messages: [...prevChat.messages, message],
      }));
    });
    socket.on("gotInitialChatState", ({ newChat, hasMoreValue }) => {
      if (newChat && newChat.messages.length < 1) {
        setHasMore(false);
        return;
      }
      setChat((prevChat) => sortChat(prevChat, newChat));
      setHasMore(true);
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    socket.emit("findGroupChats", { userId: user._id });
    socket.on("foundGroupChats", ({ chats }) => setGroups(chats));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    scroller.current.scrollIntoView({ behavior: "smooth" });
  }, [chat, selected, hasMore, page]);

  return (
    <ChatContainer isDarkTheme={isDarkTheme}>
      <div name="chatsidebar">
        <h3 className="p-2">Current chats</h3>
        {user.friends.map((friend, i) => (
          <Friend
            selected={selected}
            selectFriend={selectFriend}
            key={friend.user}
            id={friend.user}
            i={i}
          />
        ))}
        <div className="mt-3 px-3">
          <button
            className="btn btn-block btn-primary btn-lg"
            onClick={() => setCreateGroup(true)}
          >
            <GenericIcon
              width={50}
              height={30}
              data={groupData}
              text={_creategroup[language]}
            />
          </button>
          <hr />
          <h3>Group chats</h3>
          {groups && groups.length > 0 ? (
            groups.map((gr) => (
              <div key={gr._id} onClick={() => setSelected(gr)}>
                <ChatGroup
                  gr={gr}
                  setPage={setPage}
                  setChat={setChat}
                  setSelected={setSelected}
                  setHasMore={setHasMore}
                  chat={chat}
                />
              </div>
            ))
          ) : (
            <h4>No groups here</h4>
          )}
        </div>
      </div>
      <div name="messages">
        <div name="message-holder">
          <div ref={firstChatElementRef} />
          {chat &&
            chat.messages &&
            chat.messages.map((message, i) =>
              i === 0 ? (
                <div key={message._id}>
                  <div
                    className={`d-flex my-3 ${
                      message.user === user._id && "justify-content-end"
                    }`}
                  >
                    {message &&
                      message.isMedia &&
                      message.media &&
                      message.media.length > 0 &&
                      message.media.map((med) =>
                        med.type === "video" ? (
                          <video
                            key={med.src}
                            className="mx-2"
                            src={med.src}
                            style={{ maxHeight: "100px", width: "auto" }}
                          />
                        ) : med.type === "image" ? (
                          <img
                            key={med.src}
                            className="mx-2"
                            src={med.src}
                            style={{ maxHeight: "100px", width: "auto" }}
                            alt=""
                          />
                        ) : med.type === "gif" ? (
                          <iframe
                            title={med.name}
                            key={med.src}
                            src={med.src}
                            width="480"
                            height="284"
                            frameBorder="0"
                            className="giphy-embed"
                          />
                        ) : null
                      )}
                  </div>
                  <div
                    className={`d-flex my-3 ${
                      message.user === user._id && "justify-content-end"
                    }`}
                  >
                    {message.body && (
                      <span
                        style={{ borderRadius: "10px" }}
                        className={`px-3 py-2 ${
                          message.user === user._id
                            ? "bg-primary"
                            : "bg-secondary"
                        }`}
                      >
                        {ReactEmoji.emojify(message.body)}
                      </span>
                    )}
                    <sup className="text-muted d-inline-block px-2">
                      <Moment format="DD.MM.YYYY">{message.date}</Moment>
                    </sup>
                  </div>
                </div>
              ) : (
                <div key={message._id}>
                  <div
                    className={`d-flex my-3 ${
                      message.user === user._id && "justify-content-end"
                    }`}
                  >
                    {message &&
                      message.isMedia &&
                      message.media &&
                      message.media.length > 0 &&
                      message.media.map((med) =>
                        med.type === "video" ? (
                          <video
                            className="mx-2"
                            src={med.src}
                            key={med.src}
                            style={{ maxHeight: "100px", width: "auto" }}
                          />
                        ) : med.type === "image" ? (
                          <img
                            className="mx-2"
                            src={med.src}
                            key={med.src}
                            style={{ maxHeight: "100px", width: "auto" }}
                            alt=""
                          />
                        ) : med.type === "gif" ? (
                          <iframe
                            title={med.name}
                            key={med.src}
                            src={med.src}
                            width="480"
                            height="284"
                            frameBorder="0"
                            className="giphy-embed"
                          />
                        ) : null
                      )}
                  </div>
                  <div
                    className={`d-flex my-3 ${
                      message.user === user._id && "justify-content-end"
                    }`}
                  >
                    {message.body && (
                      <span
                        style={{ borderRadius: "10px" }}
                        className={`px-3 py-2 ${
                          message.user === user._id
                            ? "bg-primary"
                            : "bg-secondary"
                        }`}
                      >
                        {ReactEmoji.emojify(message.body)}
                      </span>
                    )}
                    <sup className="text-muted d-inline-block px-2">
                      <Moment format="DD.MM.YYYY">{message.date}</Moment>
                    </sup>
                  </div>
                </div>
              )
            )}
          <div ref={scroller} />
        </div>
        <ChatInput
          chatid={chat._id}
          selecteduser={
            selected && selected.user ? selected.user : selected.people
          }
        />
      </div>
      <ChatGroupModal
        createGroup={createGroup}
        setCreateGroup={setCreateGroup}
      />
    </ChatContainer>
  );
}

Chat.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(Chat);

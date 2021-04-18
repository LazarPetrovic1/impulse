import axios from "axios";
import React, { useState, useEffect, Fragment, useContext } from "react";
import { getUserById } from "../../utils/users";
import Modal from "../utils/Modal";
import { Link } from "react-router-dom";
import { SocketContext } from "../../contexts/SocketContext";
import DeleteIcon from "../utils/icons/DeleteIcon";

function ChatGroup({ gr, setPage, setChat, setSelected, setHasMore, chat }) {
  const [people, setPeople] = useState([]);
  const [clearChat, setClearChat] = useState(gr.clearChat);
  const [num, setNum] = useState(1);
  const [info, setInfo] = useState(false);
  const { socket } = useContext(SocketContext);
  const onClick = () => {
    setPage(1);
    setChat({});
    setSelected(gr);
    setHasMore(true);
  };
  useEffect(() => {
    (async function () {
      try {
        let allPeople = [];
        for (const member of gr.people) {
          const fullMember = await getUserById(member);
          await allPeople.push(fullMember);
        }
        await setPeople(allPeople);
      } catch (e) {
        console.warn(e.message);
      }
    })();
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    socket.on("chatPurged", ({ chat }) => {
      setChat(chat);
    });
    // eslint-disable-next-line
  }, [chat]);

  const purgeChat = () => socket.emit("purgeChat", { id: chat._id });
  const setPeriodicDelete = async (num, clearChat) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ num, clearChat });
    try {
      await axios.post(`/cron/chat/schedule/${gr._id}`, body, config);
    } catch (e) {
      console.warn(e.message);
    }
  };

  return (
    <Fragment key={gr._id}>
      <article
        onClick={onClick}
        className="d-flex justify-content-between align-items-center pointer"
        style={{ userSelect: "none" }}
      >
        <h3>{gr.name}</h3>
        <button
          className="btn btn-primary rounded-circle"
          onClick={() => setInfo(true)}
        >
          <i className="fas fa-info px-1" />
        </button>
      </article>
      <Modal
        title={`Members of ${gr.name}`}
        show={info}
        onClose={() => setInfo(false)}
        provideOwnClosure
      >
        <div className="form-group">
          {people &&
            people.length > 0 &&
            people.map((person) => (
              <div key={person._id} className="d-flex py-2 align-items-center">
                <img
                  src={`https://robohash.org/${person._id}?set=set4&size=40x40`}
                  className="rounded-circle mr-2"
                  alt=""
                />
                <h2 className="ml-2">
                  <Link to={`/social/profile/${person._id}`}>
                    {person.firstName} {person.lastName}
                  </Link>
                </h2>
              </div>
            ))}
        </div>
        <div className="form-group">
          <button className="btn btn-danger" onClick={purgeChat}>
            <DeleteIcon width={40} height={35} /> Clear chat
          </button>
          <h3 className="mt-3 mb-2">Still paranoid?</h3>
          <div className="form-check d-flex align-items-center">
            <input
              className="form-check-input"
              type="checkbox"
              value={clearChat}
              id="clearChat"
              style={{ width: "20px", height: "20px" }}
              onChange={(e) => setClearChat(!clearChat)}
              name="clearChat"
              checked={clearChat}
            />
            <label className="form-check-label" htmlFor="clearChat">
              <span className="lead d-inline-block mx-2 mt-2">
                Periodically clear chat every
              </span>
              <input
                type="number"
                name="num"
                id="num"
                value={num}
                max={59}
                min={-1}
                style={{ width: "42px" }}
                disabled={!clearChat}
                onChange={(e) => setNum(parseInt(e.target.value))}
                className="d-inline-block mx-2"
              />
              <span className="lead ml-2">
                {num === 1 ? "minute" : "minutes"}
              </span>
            </label>
          </div>
          <div className="form-group d-flex justify-content-end mt-4">
            <button
              className="btn btn-primary btn-lg"
              onClick={
                clearChat
                  ? () => setPeriodicDelete(num, clearChat)
                  : () => setPeriodicDelete(0, false)
              }
            >
              <i className="fas fa-paper-plane pr-2" /> Submit
            </button>
          </div>
        </div>
      </Modal>
    </Fragment>
  );
}

// [
//   {
//    people: [
//      "60118e7bc52e5c0399baec97",
//      "601daaa0c8506d05dcecff27",
//      "602980468dc7cc04913070fa",
//      "601a7cf91c0e0f4050fa41f4",
//      "5faa91e19cce1c1f2f388d9b"
//    ],
//    name: 'Sahisti',
//    _id: "6074be20a865c174338b1f5b",
//    messages: [ [Object] ],
//    isGroup: true,
//    date: "2021-04-12T21:39:44.308Z",
//    __v: 0
//   }
// ]

export default ChatGroup;

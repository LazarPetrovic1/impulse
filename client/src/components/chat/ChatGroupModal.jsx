import React, { useState, useContext } from "react";
import Modal from "../utils/Modal";
import { connect } from "react-redux";
import Friend from "./Friend";
import ChatSearch from "./ChatSearch";
import ChatGroupPerson from "./ChatGroupPerson";
import { SocketContext } from "../../contexts/SocketContext";

function ChatGroupModal({ createGroup, setCreateGroup, auth }) {
  const { user } = auth;
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [people, setPeople] = useState([user._id]);
  const { socket } = useContext(SocketContext);
  const onSubmit = (e) => {
    e.preventDefault();
    socket.emit("spawnChat", {
      people,
      message: desc,
      userId: user._id,
      isGroup: true,
      name,
    });
    setCreateGroup(false);
  };
  const selectPerson = (id) => {
    const isChecked = people.includes(id);
    if (isChecked) {
      setPeople(() =>
        people.filter((person) => person.toString() !== id.toString())
      );
    } else {
      setPeople([...people, id]);
    }
  };
  const clearAll = () => {
    setName("");
    setDesc("");
    setPeople([]);
  };

  return (
    <Modal
      title="Create a group"
      onClose={() => setCreateGroup(false)}
      show={createGroup}
      provideOwnClosure
    >
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Group name</label>
          <input
            type="text"
            placeholder="Enter group name..."
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="name"
            name="name"
            required
          />
        </div>
        <div className="form-group">
          <h3>Add people to the group</h3>
          <ChatSearch selectPerson={selectPerson} people={people} />
          {user.friends.map((friend) => (
            <div
              key={friend.user}
              onClick={() => selectPerson(friend.user)}
              className="d-flex align-items-center mx-4"
            >
              {/* eslint-disable-next-line */}
              <input
                className="form-check-input"
                style={{ height: "30px", width: "30px" }}
                type="checkbox"
                value={friend.user}
                checked={people.includes(friend.user)}
              />
              <div style={{ flex: 1 }}>
                <Friend id={friend.user} group />
              </div>
            </div>
          ))}
        </div>
        <div className="form-group">
          <h5>People added so far</h5>
          <ul>
            {people.length > 0 ? (
              people.map((person) => (
                <ChatGroupPerson key={person} id={person} person={person} />
              ))
            ) : (
              <p>Nobody</p>
            )}
          </ul>
        </div>
        <div className="form-group">
          <label htmlFor="desc">Group description</label>
          <input
            type="text"
            placeholder="Enter group description..."
            className="form-control"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            id="desc"
            name="desc"
            required
          />
        </div>
        <div className="form-group d-flex justify-content-end align-items-center">
          <button
            type="button"
            className="btn btn-danger btn-lg mr-2 mt-1"
            onClick={clearAll}
          >
            <i className="fas fa-times pr-2" />
            Reset
          </button>
          <button type="submit" className="btn btn-primary btn-lg ml-2">
            <i className="fas fa-paper-plane pr-2" />
            Submit
          </button>
        </div>
      </form>
    </Modal>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(ChatGroupModal);

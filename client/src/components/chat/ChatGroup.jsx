import React, { useState, useEffect, Fragment } from "react";
import { getUserById } from "../../utils/users";
import Modal from "../utils/Modal";
import { Link } from "react-router-dom";

function ChatGroup({ gr, setPage, setChat, setSelected, setHasMore }) {
  const [people, setPeople] = useState([]);
  const [info, setInfo] = useState(false);
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

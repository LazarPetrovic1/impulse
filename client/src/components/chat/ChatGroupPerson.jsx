import React, { useState, useEffect } from "react";
import { getUserById } from "../../utils/users";

function ChatGroupPerson({ person }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    (async function () {
      try {
        const someone = await getUserById(person);
        await setUser(someone);
      } catch (e) {
        console.warn(e.message);
      }
    })();
    // eslint-disable-next-line
  }, []);
  return user ? (
    <li key={user._id}>
      {user.firstName} {user.lastName}
    </li>
  ) : (
    <p key={person}>...</p>
  );
}

export default ChatGroupPerson;

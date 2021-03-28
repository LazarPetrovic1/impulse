import React, { useContext, useEffect, useState } from 'react';
import FriendContainer from '../../../styled/Chat/FriendContainer';
import { ThemeContext } from '../../../contexts/ThemeContext'
import { getUserById } from '../../../utils/users';

function Friend({ id, groupInfo, setGroupInfo }) {
  const { isDarkTheme } = useContext(ThemeContext)
  const [friend, setFriend] = useState({})
  useEffect(() => {
    (async function() {
      try {
        const user = await getUserById(id)
        await setFriend(user)
      } catch(e) {
        console.warn(e.message);
      }
    }());
    // eslint-disable-next-line
  }, [])
  const setPeople = (id) => {
    if (groupInfo.people.includes(id)) {
      setGroupInfo({
        ...groupInfo,
        people: groupInfo.people.filter(gip => gip !== id)
      })
    } else {
      setGroupInfo({ ...groupInfo, people: [...groupInfo.people, id] })
    }
  }
  return friend ? (
    <FriendContainer isDarkTheme={isDarkTheme} onClick={() => setPeople(id)}>
      <input type="checkbox" checked={groupInfo.people.includes(id)} />
      <img
        className="ml-3 rounded-circle"
        src={`https://robohash.org/${friend._id}?set=set4&size=22x22`}
        alt={`${friend.firstName} ${friend.lastName}'s avatar`}
      /> {/* WIDTH=22px && HEIGHT=22px */}
      <span>{friend.firstName} {friend.lastName}</span>
    </FriendContainer>
  ) : null
}

export default Friend;

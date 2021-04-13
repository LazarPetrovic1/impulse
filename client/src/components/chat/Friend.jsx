import React, { useContext, useEffect, useState } from "react";
import FriendContainer from "../../styled/Chat/FriendContainer";
import { ThemeContext } from "../../contexts/ThemeContext";
import { connect } from "react-redux";
import { getUserById } from "../../utils/users";
import PropTypes from "prop-types";

function Friend({ i, auth, id, selected, selectFriend, group }) {
  const { isDarkTheme } = useContext(ThemeContext);
  const [friend, setFriend] = useState({});
  const onClick = () => {
    if (group) {
      return;
    }
    selectFriend(i);
  };
  useEffect(() => {
    (async function () {
      try {
        const user = await getUserById(id);
        await setFriend(user);
      } catch (e) {
        console.warn(e.message);
      }
    })();
    // eslint-disable-next-line
  }, []);
  return (
    friend && (
      <FriendContainer
        isDarkTheme={isDarkTheme}
        selected={
          !group && selected && selected.user ? selected.user === id : false
        }
        onClick={onClick}
      >
        <img
          className="rounded-circle"
          src={`https://robohash.org/${friend._id}?set=set4&size=22x22`}
          alt={`${friend.firstName} ${friend.lastName}'s avatar`}
        />{" "}
        {/* WIDTH=22px && HEIGHT=22px */}
        <span>
          {friend.firstName} {friend.lastName}
        </span>
      </FriendContainer>
    )
  );
}

Friend.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(Friend);

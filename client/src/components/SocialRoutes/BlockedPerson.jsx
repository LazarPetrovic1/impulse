import React, { useState, useEffect } from "react";
import { getUserById } from "../../utils/users";
import PropTypes from "prop-types";
import { unblockPerson } from "../../actions/auth";
import { connect } from "react-redux";

function BlockedPerson({ bp, unblockPerson, auth: { user } }) {
  const [person, setPerson] = useState({});
  useEffect(() => {
    (async function () {
      try {
        const user = await getUserById(bp.user);
        await setPerson(user);
        await console.log(user);
      } catch (e) {
        console.warn(e.message);
      }
    })();
    // eslint-disable-next-line
  }, []);
  const unblockThisPerson = () => {
    unblockPerson({ senderId: user._id, blockedId: bp.user });
    window.location.reload();
  };
  return (
    Object.keys(person).length > 0 && (
      <div className="alert alert-info d-flex justify-content-between align-items-center">
        <h4 className="m-0">
          {person.firstName}&nbsp;
          {person.lastName}&nbsp; (@{person.username})
        </h4>
        <button
          className="btn"
          title="Unblock person"
          onClick={unblockThisPerson}
        >
          <i className="fas fa-times" />
        </button>
      </div>
    )
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

BlockedPerson.propTypes = {
  bp: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  unblockPerson: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { unblockPerson })(BlockedPerson);

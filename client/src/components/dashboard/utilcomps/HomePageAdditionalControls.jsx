import React, { useState, useEffect, useContext } from "react";
import { LanguageContext } from "../../../contexts/LanguageContext";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import GroupItem from "./GroupItem";
// import CarouselGroups from "../../carousels/CarouselGroups";
import { homepageadditionalcontrolscomponent } from "../../../utils/langObject";

const {
  _saysthhere,
  _creategroup,
  _livestream,
  _nogroup,
  _youcaneasily,
  _joinone,
  _or,
  _createyourown,
} = homepageadditionalcontrolscomponent;

function HomePageAdditionalControls({ group, setShow }) {
  const [status, setStatus] = useState("");
  const { language } = useContext(LanguageContext);
  const submitStatus = (e) => {
    e.preventDefault();
    // Handle status here
    setStatus("");
  };

  return (
    <div className="w-100">
      <form onSubmit={submitStatus}>
        <input
          type="text"
          className="form-control form-control-lg"
          placeholder={_saysthhere[language]}
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />
      </form>
      <div className="d-flex mt-3">
        <button
          className="btn btn-primary btn-lg"
          style={{ flex: 1 }}
          onClick={() => setShow(true)}
        >
          <i className="fas fa-users pr-2" /> {_creategroup[language]}
        </button>
        <button className="btn btn-primary btn-lg" style={{ flex: 1 }}>
          <i className="fas fa-video pr-2" /> {_livestream[language]}
        </button>
      </div>
      {group && group.groups && group.groups.length > 0 ? (
        group.groups.map((gr) => <GroupItem group={gr} key={gr._id} />)
      ) : (
        <div
          style={{ height: "250px" }}
          className="d-flex align-items-center justify-content-center flex-column"
        >
          <h2 className="text-primary mt-3">{_nogroup[language]}</h2>
          <h4 className="text-secondary mt-3">
            {_youcaneasily[language]}
            <span className="font-weight-bold">{_joinone[language]}</span>{" "}
            {_or[language]}
            <span className="font-weight-bold">{_createyourown[language]}</span>
            !
          </h4>
        </div>
      )}
    </div>
  );
}

HomePageAdditionalControls.propTypes = {
  group: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  group: state.group,
});

export default connect(mapStateToProps, null)(HomePageAdditionalControls);

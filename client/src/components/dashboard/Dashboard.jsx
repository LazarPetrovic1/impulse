import React, { useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { getCurrentProfile, deleteAccount } from "../../actions/profile";
import Spinner from "../layout/Spinner";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import SideMenu from "./SideMenu";

function Dashboard(props) {
  const {
    getCurrentProfile,
    deleteAccount,
    auth: { user },
    profile: { profile, loading }
  } = props;

  useEffect(
    () => {
      getCurrentProfile();
    },
    [getCurrentProfile]
  );

  const {
    firstName,
    lastName,
    email,
    sex,
    bio,
    dob,
    username,
    city,
    country,
    zip,
    phone,
    question,
    security,
    imageTaken
  } = user

  return loading ? (
    <Spinner />
  ) : (
    <div style={{height: "92vh"}}>
      <div className="text-center">
        <h1 className="large text-primary">Dashboard</h1>
        <p className="lead">
          <i className="fas fa-user" /> Welcome, {user && `${firstName} ${lastName}`}
        </p>
      </div>
        {profile !== null ? (
          <div className="text-center">
            <div className="my-2">
              <button className="btn btn-danger" onClick={() => deleteAccount}>
                <i className="fas fa-user-minus" /> Delete my account
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <p>You have not yet set up a profile. Please add some info.</p>
              <Link to="/create-profile" className="btn btn-primary my-1">
                Create a profile!
              </Link>
            </div>
          )}
      <div className="row">
        <div className="col-3">
          <SideMenu />
        </div>
      </div>
    </div>
  );
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount }
)(Dashboard);
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import { getCurrentProfile } from "../../actions/profile";
import Spinner from "../layout/Spinner";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ShortLogo from "../../styled/Logo/ShortLogo";
import EditIcon from "../utils/icons/EditIcon";

function SocialProfile({
  setAlert,
  getCurrentProfile,
  profile: { profile, loading },
  auth,
}) {
  useEffect(() => {
    getCurrentProfile();
    // eslint-disable-next-line
  }, [getCurrentProfile]);

  return profile && !loading ? (
    <article className="container" style={{ pointerEvents: "all" }}>
      <h1>Welcome, {auth.user.firstName}</h1>
      <ul className="list-group">
        <li className="list-group-item" style={{ color: "#111" }}>
          <ShortLogo liked="impulse" height="20px" width="20px" />
          &nbsp;&nbsp;
          <Link style={{ color: "#111" }} to="/">
            https://impul.se/social/profile/{auth.user._id}
          </Link>
        </li>
        {profile.employment === "None" ? null : (
          <li className="list-group-item" style={{ color: "#111" }}>
            <i className="fas fa-briefcase" />
            &nbsp;&nbsp; Works at {profile.employment}
          </li>
        )}
        {profile.website === "None" ? null : (
          <li className="list-group-item" style={{ color: "#111" }}>
            <i className="fas fa-globe" />
            &nbsp;&nbsp;
            <a
              style={{ color: "#111" }}
              href={profile.website}
              target="_blank"
              rel="noopener noreferrer"
            >
              Website
            </a>
          </li>
        )}
        {profile.status === "Hide" ? null : (
          <li className="list-group-item" style={{ color: "#111" }}>
            <i className="fas fa-heart" />
            &nbsp;&nbsp;
            {profile.status}
          </li>
        )}
        {profile.social.youtube && (
          <li className="list-group-item" style={{ color: "#111" }}>
            <i className="fab fa-youtube" />
            &nbsp;&nbsp;
            <a
              style={{ color: "#111" }}
              href={profile.social.youtube}
              target="_blank"
              rel="noopener noreferrer"
            >
              YouTube
            </a>
          </li>
        )}
        {profile.social.twitter && (
          <li className="list-group-item" style={{ color: "#111" }}>
            <i className="fab fa-twitter" />
            &nbsp;&nbsp;
            <a
              style={{ color: "#111" }}
              href={profile.social.twitter}
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter
            </a>
          </li>
        )}
        {profile.social.facebook && (
          <li className="list-group-item" style={{ color: "#111" }}>
            <i className="fab fa-facebook" />
            &nbsp;&nbsp;
            <a
              style={{ color: "#111" }}
              href={profile.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
          </li>
        )}
        {profile.social.instagram && (
          <li className="list-group-item" style={{ color: "#111" }}>
            <i className="fab fa-instagram" />
            &nbsp;&nbsp;
            <a
              style={{ color: "#111" }}
              href={profile.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
          </li>
        )}
        {profile.social.linkedin && (
          <li className="list-group-item" style={{ color: "#111" }}>
            <i className="fab fa-linkedin" />
            &nbsp;&nbsp;
            <a
              style={{ color: "#111" }}
              href={profile.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </li>
        )}
      </ul>
      <div className="d-flex justify-content-end mt-3 py-0">
        <Link className="btn btn-secondary" to="/social/create-social-profile">
          <EditIcon width={42} height={36} insert="Edit information" />
        </Link>
      </div>
    </article>
  ) : !profile ? (
    <div className="m-auto" style={{ width: "80%" }}>
      <h1 className="text-primary">
        You don't seem to have customized your profile
      </h1>
      <Link
        to="/social/create-social-profile"
        className="btn btn-primary btn-lg"
      >
        Add more!
      </Link>
    </div>
  ) : (
    <Spinner />
  );
}

SocialProfile.propTypes = {
  auth: PropTypes.object.isRequired,
  setAlert: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, {
  setAlert,
  getCurrentProfile,
})(SocialProfile);

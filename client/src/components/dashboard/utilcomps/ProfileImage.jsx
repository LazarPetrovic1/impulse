import React, { useContext } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { LanguageContext } from "../../../contexts/LanguageContext";
import AddProfileImage from "../../../styled/ImagePost/AddProfileImage";
import { dashboardcomponent } from "../../../utils/langObject";
import Lottie from "react-lottie-player";
import addbutton from "../../../animations/addbutton-backup.json";

function ProfileImage({
  auth: { user },
  setProfileUploadButton,
  setProfileSlider,
  setFn,
  profileUploadButton,
  setAddFilesModal,
}) {
  const { _placeholder } = dashboardcomponent;
  const { language } = useContext(LanguageContext);
  return (
    <div className="container">
      <div className="text-center" style={{ pointerEvents: "all" }}>
        <div
          className="d-inline-block position-relative rounded-circle"
          style={{ overflow: "hidden" }}
        >
          {user.profileImages.length > 0 ? (
            <img
              alt="Featured on profile"
              style={{
                userSelect: "none",
                width: "350px",
                height: "350px",
                cursor: "pointer",
              }}
              src={user.profileImages[user.profileImages.length - 1].url}
              onMouseEnter={() => setProfileUploadButton(true)}
              onMouseLeave={() => setProfileUploadButton(false)}
              onClick={() =>
                setProfileSlider([true, user.profileImages.length - 1])
              }
            />
          ) : (
            <img
              style={{ userSelect: "none" }}
              src={`https://robohash.org/${user._id}?set=set4&size=350x350`}
              alt={_placeholder[language]}
              onMouseEnter={() => setProfileUploadButton(true)}
              onMouseLeave={() => setProfileUploadButton(false)}
            />
          )}
          {profileUploadButton && (
            <AddProfileImage
              className="btn btn-secondary btn-block"
              onMouseEnter={() => setProfileUploadButton(true)}
              onMouseLeave={() => setProfileUploadButton(false)}
              onClick={() => {
                setFn("profile");
                setAddFilesModal(true);
              }}
            >
              <Lottie
                loop
                animationData={addbutton}
                play
                style={{ width: 32, height: 32, display: "inline-block" }}
              />
              {/*<i className="fas fa-plus fa-2x" />*/}
            </AddProfileImage>
          )}
        </div>
      </div>
      <h1 className="text-primary text-center display-4 mt-3">
        {user.firstName} {user.lastName}
      </h1>
    </div>
  );
}

ProfileImage.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(ProfileImage);

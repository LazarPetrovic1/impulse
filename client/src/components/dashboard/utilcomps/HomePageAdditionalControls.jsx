import React, { useState, useContext, useEffect } from "react";
import { LanguageContext } from "../../../contexts/LanguageContext";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import GroupItem from "./GroupItem";
import { homepageadditionalcontrolscomponent } from "../../../utils/langObject";
import { createStatus } from "../../../actions/status";
// import Lottie from "react-lottie-player";
// import creategroup from "../../../animations/homepage/creategroup.json";
import livestream from "../../../animations/homepage/livestream.json";
import creategroup from "../../../animations/social-backup.json";
import EllipsisIcon from "../../utils/icons/EllipsisIcon";
import GenericIcon from "../../utils/icons/GenericIcon";
import { meInGroups } from "../../../actions/group.js";
import ControlsButton from "../../../styled/HomePage/ControlsButton";
import SwiperCore, { Navigation, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/scrollbar/scrollbar.min.css";

SwiperCore.use([Navigation, A11y]);

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

function HomePageAdditionalControls({
  group,
  setShow,
  createStatus,
  meInGroups,
}) {
  const [status, setStatus] = useState("");
  const { language } = useContext(LanguageContext);
  const submitStatus = async (e) => {
    e.preventDefault();
    await createStatus(status);
    await setStatus("");
  };

  useEffect(() => {
    (async function () {
      try {
        await meInGroups();
      } catch (e) {
        console.warn(e.message);
      }
    })();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="w-100">
      <form onSubmit={submitStatus} className="position-relative">
        <input
          type="text"
          className="form-control form-control-lg"
          placeholder={_saysthhere[language]}
          style={{ paddingLeft: "50px" }}
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />
        <EllipsisIcon width={50} height={30} />
      </form>
      <div className="d-flex mt-3">
        <ControlsButton
          className="btn btn-primary btn-lg"
          onClick={() => setShow(true)}
        >
          <GenericIcon width={50} height={30} data={creategroup} />
          <span name="text">{_creategroup[language]}</span>
        </ControlsButton>
        <ControlsButton className="btn btn-primary btn-lg">
          <GenericIcon width={50} height={30} data={livestream} />
          <span name="text">{_livestream[language]}</span>
        </ControlsButton>
      </div>
      {group && Array.isArray(group.groups) && group.groups.length > 0 && (
        <Swiper slidesPerView={3} navigation>
          {group.groups.map((gr) => (
            <SwiperSlide key={gr._id}>
              <GroupItem group={gr} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      {group && Array.isArray(group.groups) && group.groups.length < 0 && (
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
  createStatus: PropTypes.func.isRequired,
  meInGroups: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  group: state.group,
});

export default connect(mapStateToProps, { createStatus, meInGroups })(
  HomePageAdditionalControls
);

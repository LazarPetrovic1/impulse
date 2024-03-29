import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { LanguageContext } from "../../contexts/LanguageContext";
import { sidemenucomponent } from "../../utils/langObject";
import DashboardSideMenuUl from "../../styled/DashboardSideMenuUl";
import chatData from "../../animations/chat.json";
import socialData from "../../animations/social-backup.json";
import videosData from "../../animations/videos.json";
import upgradeData from "../../animations/upgrade.json";
import forumData from "../../animations/forum.json";
import SideMenuIcon from "../utils/icons/GenericIcon";
import useWindowSize from "../../hooks/useWindowSize";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const { _forum, _social, _videos, _chat, _upgrade } = sidemenucomponent;

function SideMenu({ auth: { user } }) {
  // eslint-disable-next-line
  const [width, _] = useWindowSize();
  const { language } = useContext(LanguageContext);
  return (
    <nav
      className="navbar navbar-light d-block custom-sidenav position-relative"
      style={{ pointerEvents: "all", bottom: "250px" }}
    >
      <DashboardSideMenuUl>
        <li
          className={`nav-item bg-light m-1 ${
            width > 600 ? "px-5" : "pl-5"
          } text-center`}
        >
          <Link className="nav-link lead text-primary" to="/forum">
            <SideMenuIcon
              text={_forum[language]}
              width={33}
              height={30}
              data={forumData}
            />
          </Link>
        </li>
        <li
          className={`nav-item bg-light m-1 ${
            width > 600 ? "px-5" : "pl-5"
          } text-center`}
        >
          <Link className="nav-link text-primary lead" to="/social">
            <SideMenuIcon
              text={_social[language]}
              width={33}
              height={30}
              data={socialData}
            />
          </Link>
        </li>
        <li
          className={`nav-item bg-light m-1 ${
            width > 600 ? "px-5" : "pl-5"
          } text-center`}
        >
          <Link className="nav-link text-primary lead" to="/chat">
            <SideMenuIcon
              text={_chat[language]}
              width={33}
              height={30}
              data={chatData}
            />
          </Link>
        </li>
        <li
          className={`nav-item bg-light m-1 ${
            width > 600 ? "px-5" : "pl-5"
          } text-center`}
        >
          <Link className="nav-link text-primary lead" to="/videos-all">
            <SideMenuIcon
              text={_videos[language]}
              width={31}
              height={30}
              data={videosData}
            />
          </Link>
        </li>
        {user.trial.isUsingTrial || user.isPremium ? null : (
          <li
            className={`nav-item bg-light m-1 ${
              width > 600 ? "px-5" : "pl-5"
            } text-center`}
          >
            <Link className="nav-link text-primary lead" to="/upgrade">
              <SideMenuIcon
                text={_upgrade[language]}
                width={31}
                height={30}
                data={upgradeData}
              />
            </Link>
          </li>
        )}
      </DashboardSideMenuUl>
    </nav>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

SideMenu.propTypes = {
  auth: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, null)(SideMenu);

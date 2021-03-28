import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import profile from "./profile";
import forum from "./forum";
import video from "./video";
import image from "./image";
import notifs from "./notifs";
import group from "./group";
import allmedia from "./allmedia";

export default combineReducers({
  alert,
  auth,
  profile,
  forum,
  image,
  notifs,
  video,
  allmedia,
  group,
});

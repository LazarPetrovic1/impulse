import {
  GET_NOTIFS,
  // GET_NOTIF,
  // NOTIF_ERROR,
  POST_NOTIF,
  SEND_FRIEND_REQUEST,
} from "./types";
import io from "socket.io-client";

const socket = io.connect(`http://localhost:5000`);

export const findNotifs = (userId) => async (dispatch) => {
  await socket.emit("findNotif", userId);
  // eslint-disable-next-line
  const notifs = socket.on("foundNotifs", ({ notifications, id }) => {
    if (id === userId) {
      dispatch({
        type: GET_NOTIFS,
        payload: notifications.filter((not) => not.user === id),
      });
    }
  });
};

export const sendNotif = ({
  userId,
  type,
  language,
  username,
  name,
  url,
}) => async (dispatch) => {
  await socket.emit("sendNotif", {
    userId,
    type,
    language,
    username,
    name,
    url,
  });
  const notif = socket.on("sentNotif", (notif) => {});
  dispatch({
    type: POST_NOTIF,
    payload: notif,
  });
  dispatch(findNotifs(userId));
};

export const readNotifs = (userId) => async (dispatch) => {
  await socket.emit("readNotifs", userId);
  // eslint-disable-next-line
  dispatch(findNotifs(userId));
};

export const sendFriendRequest = ({ senderId, accepterId }) => async (
  dispatch
) => {
  await socket.emit("sendFriendRequest", { senderId, accepterId });
  await socket.on("sentFriendRequest", (user) => {
    dispatch({
      type: SEND_FRIEND_REQUEST,
      payload: user.friendRequestsSent,
    });
  });
};

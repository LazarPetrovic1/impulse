import {
  GET_NOTIFS,
  // GET_NOTIF,
  // NOTIF_ERROR,
  POST_NOTIF
} from './types';
import io from 'socket.io-client';

const socket = io.connect(`http://localhost:5000`)

export const findNotifs = (userId) => async dispatch => {
  await socket.emit('findNotif', userId)
  // eslint-disable-next-line
  const notifs = socket.on('foundNotifs', ({ notifications, id }) => {
    if (id === userId) {
      dispatch({
        type: GET_NOTIFS,
        payload: notifications.filter(not => not.user === id)
      })
    }
  })
};

export const sendNotif = ({ userId, type, language, username, name }) => async dispatch => {
  await socket.emit("sendNotif", { userId, type, language, username, name })
  const notif = socket.on('sentNotif', notif => {
    console.log(notif);
  })
  dispatch({
    type: POST_NOTIF,
    payload: notif
  })
};

import {
  GET_NOTIFS,
  GET_NOTIF,
  NOTIF_ERROR,
} from "../actions/types";

const initialState = {
  notifs: [],
  loading: true,
  error: null,
  notif: null
}

export default (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case GET_NOTIFS:
      return {
        ...state,
        loading: false,
        notifs: payload
      }
    case GET_NOTIF:
      return {
        ...state,
        loading: false,
        notif: payload
      }
    case NOTIF_ERROR:
      return {
        ...state,
        loading: false,
        error: payload
      }
    default:
      return state
  }
};

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  DELETE_ACCOUNT,
  ADD_PROFILE_IMAGE,
  PREMIUM_USER,
  UNFRIEND_PERSON,
  BLOCK_PERSON,
  SEND_FRIEND_REQUEST,
  UNBLOCK_PERSON,
  CHANGE_PASSWORD,
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: null,
  user: null,
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_LOADED:
    case ADD_PROFILE_IMAGE:
    case PREMIUM_USER:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    case REGISTER_SUCCESS:
    case CHANGE_PASSWORD:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
    case DELETE_ACCOUNT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    case UNFRIEND_PERSON:
      return {
        ...state,
        loading: false,
        user: {
          ...state.user,
          friends: payload,
        },
      };
    case BLOCK_PERSON:
      return {
        ...state,
        loading: false,
        user: {
          ...state.user,
          friends: payload.friends,
          blocked: payload.blocked,
        },
      };
    case UNBLOCK_PERSON:
      return {
        ...state,
        loading: false,
        user: {
          ...state.user,
          blocked: payload.blocked,
        },
      };
    case SEND_FRIEND_REQUEST:
      return {
        ...state,
        user: {
          ...state.user,
          friendRequestsSent: payload,
        },
      };
    default:
      return state;
  }
};

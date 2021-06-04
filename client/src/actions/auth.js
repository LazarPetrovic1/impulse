import axios from "axios";
import { setAlert } from "./alert";
import {
  ADD_PROFILE_IMAGE,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  AUTH_ERROR,
  IMAGE_ERROR,
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE,
  PREMIUM_USER,
  BLOCK_PERSON,
  UNFRIEND_PERSON,
  UNBLOCK_PERSON,
} from "./types";
import setAuthToken from "../utils/setAuthToken";
import io from "socket.io-client";
const socket = io.connect(`http://localhost:5000`);

// Load a user
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("/api/auth");

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (e) {
    console.warn(e.message); // Console warning
    dispatch({
      type: CLEAR_PROFILE,
    });

    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const hideSelected = (hidden, id) => async (dispatch) => {
  const body = JSON.stringify({ hidden });
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(`/api/users/hide/${id}`, body, config);
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (e) {
    console.warn(e.message); // Console warning
    dispatch({
      type: CLEAR_PROFILE,
    });

    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register a user
export const register = ({
  firstName,
  lastName,
  email,
  sex,
  bio,
  dob,
  username,
  password,
  city,
  country,
  zip,
  phone,
  question,
  security,
  imageTaken,
}) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({
    firstName,
    lastName,
    email,
    sex,
    bio,
    dob,
    username,
    password,
    city,
    country,
    zip,
    phone,
    question,
    security,
    imageTaken,
  });

  try {
    const res = await axios.post("/api/users", body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (e) {
    const errors = e.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

// Log the user in
export const login = ({ email, username, phone, password }) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  let body;

  if (email) {
    body = JSON.stringify({ email, password });
  } else if (username) {
    body = JSON.stringify({ username, password });
  } else if (phone) {
    body = JSON.stringify({ phone, password });
  }

  try {
    const res = await axios.post("/api/auth", body, config);
    await console.log(res);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (e) {
    const errors = e.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// Logout / clear profile
export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};

export const imageUploadDispatch = (item) => (dispatch) => {
  dispatch({
    type: USER_LOADED,
    payload: item,
  });
};

export const uploadProfileImage = (base64EncodedImage, content) => async (
  dispatch
) => {
  try {
    const body = JSON.stringify({ data: base64EncodedImage, content });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.put("/api/auth/profileImage", body, config);
    dispatch({
      type: ADD_PROFILE_IMAGE,
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: IMAGE_ERROR,
      payload: { msg: e.message },
    });
  }
};

export const getFreeTrial = () => async (dispatch) => {
  try {
    const res = await axios.put(`/api/users/trial/get`);
    dispatch({
      type: PREMIUM_USER,
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

export const endFreeTrial = () => async (dispatch) => {
  try {
    const res = await axios.put(`/api/users/trial/end`);
    dispatch({
      type: PREMIUM_USER,
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

export const getPremiumAccount = () => async (dispatch) => {
  try {
    const res = await axios.put(`/api/users/premium/get`);
    dispatch({
      type: PREMIUM_USER,
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

export const stopPremiumAccount = () => async (dispatch) => {
  try {
    const res = await axios.put(`/api/users/premium/end`);
    dispatch({
      type: PREMIUM_USER,
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

export const unfriendPerson = ({ senderId, blockedId }) => async (dispatch) => {
  await socket.emit("unfriendPerson", { senderId, blockedId });
  // eslint-disable-next-line
  const person = socket.on("unfriendedPerson", (senderUser) => {
    dispatch({
      type: UNFRIEND_PERSON,
      payload: senderUser.friends,
    });
  });
};

export const blockPerson = ({ senderId, blockedId }) => async (dispatch) => {
  await socket.emit("blockPerson", { senderId, blockedId });
  // eslint-disable-next-line
  const person = socket.on("blockedPerson", (senderUser) => {
    dispatch({
      type: BLOCK_PERSON,
      payload: {
        friends: senderUser.friends,
        blocked: senderUser.blocked,
      },
    });
  });
};

export const unblockPerson = ({ senderId, blockedId }) => async (dispatch) => {
  await socket.emit("unblockPerson", { senderId, blockedId });
  // eslint-disable-next-line
  const person = socket.on("unblockedPerson", (senderUser) => {
    dispatch({
      type: UNBLOCK_PERSON,
      payload: {
        blocked: senderUser.blocked,
      },
    });
  });
};

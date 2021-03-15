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
  CLEAR_PROFILE
} from "./types";
import setAuthToken from "../utils/setAuthToken";

// Load a user
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("/api/auth");

    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (e) {
    console.warn(e.message); // Console warning
    dispatch({
      type: CLEAR_PROFILE
    });

    dispatch({
      type: AUTH_ERROR
    });
  }
};

export const hideSelected = (hidden, id) => async dispatch => {
  const body = JSON.stringify({ hidden })
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  try {
    const res = await axios.post(`/api/users/hide/${id}`, body, config)
    dispatch({
      type: USER_LOADED,
      payload: res.data
    })
  } catch (e) {
    console.warn(e.message); // Console warning
    dispatch({
      type: CLEAR_PROFILE
    });

    dispatch({
      type: AUTH_ERROR
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
  imageTaken
}) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
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
    imageTaken
  });

  try {
    const res = await axios.post("/api/users", body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (e) {
    const errors = e.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: REGISTER_FAIL
    });
  }
};

// Log the user in
export const login = ({email, username, phone, password}) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  let body

  if (email) {
    body = JSON.stringify({ email, password })
  } else if (username) {
    body = JSON.stringify({ username, password })
  } else if (phone) {
    body = JSON.stringify({ phone, password })
  }

  try {
    const res = await axios.post('/api/auth', body, config)
    await console.log(res);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    })

    dispatch(loadUser())
  } catch (e) {
    const errors = e.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: LOGIN_FAIL
    })
  }
}

// Logout / clear profile
export const logout = () => dispatch => {
  dispatch({ type: LOGOUT });
};

export const imageUploadDispatch = (item) => dispatch => {
  dispatch({
    type: USER_LOADED,
    payload: item
  });
}

export const uploadProfileImage = (base64EncodedImage, content) => async dispatch => {
  try {
    const body = JSON.stringify({ data: base64EncodedImage, content })
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    }
    const res = await axios.put('/api/auth/profileImage', body, config)
    dispatch({
      type: ADD_PROFILE_IMAGE,
      payload: res.data
    })
  } catch (e) {
    dispatch({
      type: IMAGE_ERROR,
      payload: { msg: e.message }
    })
  }
};

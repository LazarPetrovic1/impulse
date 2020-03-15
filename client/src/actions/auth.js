import axios from "axios";
import { setAlert } from "./alert";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  AUTH_ERROR,
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
    console.warn(e.message); // Console warning
    const errors = e.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(e.message, "danger")));
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

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    })

    dispatch(loadUser())
  } catch (e) {
    console.warn(e.response.data.errors)
    dispatch({
      type: LOGIN_FAIL
    })
  }
}

// Logout / clear profile
export const logout = () => dispatch => {
  dispatch({ type: LOGOUT });
};
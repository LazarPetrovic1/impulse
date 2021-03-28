import axios from "axios";
import {
  GET_GROUPS,
  ME_IN_GROUPS,
  GET_GROUP,
  CREATE_GROUP,
  DELETE_GROUP,
  DELETE_GROUP_POST,
  GROUP_ERROR,
  CREATE_GROUP_POST,
} from "./types";

export const getGroups = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/group");
    dispatch({
      type: GET_GROUPS,
      payload: res.data,
    });
  } catch (e) {
    console.warn(e.message);
    dispatch({
      type: GROUP_ERROR,
      payload: e.message,
    });
  }
};

export const meInGroups = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/group/mine");
    dispatch({
      type: ME_IN_GROUPS,
      payload: res.data,
    });
  } catch (e) {
    console.warn(e.message);
    dispatch({
      type: GROUP_ERROR,
      payload: e.message,
    });
  }
};

export const getGroup = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/group/${id}`);
    dispatch({
      type: GET_GROUP,
      payload: res.data,
    });
  } catch (e) {
    console.warn(e.message);
    dispatch({
      type: GROUP_ERROR,
      payload: e.message,
    });
  }
};

export const createGroup = ({
  people,
  admin,
  about,
  requiresAdmin,
  isSeen,
  name,
  data,
}) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({
    people,
    admin,
    about,
    requiresAdmin,
    isSeen,
    name,
    data,
  });
  try {
    const res = await axios.post("/api/group", body, config);
    dispatch({
      type: CREATE_GROUP,
      payload: res.data,
    });
  } catch (e) {
    console.warn(e.message);
    dispatch({
      type: GROUP_ERROR,
      payload: e.message,
    });
  }
};

export const deleteGroup = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/group/${id}`);
    dispatch({
      type: DELETE_GROUP,
      payload: id,
    });
  } catch (e) {
    console.warn(e.message);
    dispatch({
      type: GROUP_ERROR,
      payload: e.message,
    });
  }
};

export const deletePostInGroup = (id, postid) => async (dispatch) => {
  try {
    await axios.delete(`/api/group/${id}/${postid}`);
    dispatch({
      type: DELETE_GROUP_POST,
      payload: postid,
    });
  } catch (e) {
    console.warn(e.message);
    dispatch({
      type: GROUP_ERROR,
      payload: e.message,
    });
  }
};

export const postInGroup = (id, post) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ post });
  try {
    const res = await axios.post(`/api/group/${id}`, body, config);
    dispatch({
      type: CREATE_GROUP_POST,
      payload: res.data,
    });
  } catch (e) {
    console.warn(e.message);
    dispatch({
      type: GROUP_ERROR,
      payload: e.message,
    });
  }
};

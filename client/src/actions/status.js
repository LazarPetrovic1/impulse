import axios from "axios";
import {
  CREATE_STATUS,
  GET_ALL_STATUSES,
  GET_MY_STATUSES,
  GET_PERSONS_STATUSES,
  DELETE_STATUS,
  EDIT_STATUS,
  ADD_COMMENT_TO_STATUS,
  GET_COMMENTS_OF_STATUS,
  EDIT_COMMENT_OF_STATUS,
  DELETE_COMMENT_OF_STATUS,
  REPLY_TO_COMMENT_OF_STATUS,
  EDIT_REPLY_TO_COMMENT_OF_STATUS,
  GET_ALL_REPLIES_TO_COMMENT_OF_STATUS,
  DELETE_REPLY_TO_COMMENT_OF_STATUS,
  STATUS_ERROR,
} from "./types";

export const createStatus = (status) => async (dispatch) => {
  const body = JSON.stringify({ body: status });
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post("/api/status", body, config);
    dispatch({
      type: CREATE_STATUS,
      payload: res.data,
    });
  } catch (e) {
    console.warn(e.message);
    dispatch({
      type: STATUS_ERROR,
      payload: e.message,
    });
  }
};

export const getAllStatuses = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/status");
    dispatch({
      type: GET_ALL_STATUSES,
      payload: res.data,
    });
  } catch (e) {
    console.warn(e.message);
    dispatch({
      type: STATUS_ERROR,
      payload: e.message,
    });
  }
};

export const getMyStatuses = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/status/mine");
    dispatch({
      type: GET_MY_STATUSES,
      payload: res.data,
    });
  } catch (e) {
    console.warn(e.message);
    dispatch({
      type: STATUS_ERROR,
      payload: e.message,
    });
  }
};

export const getPersonsStatuses = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/status/${id}`);
    dispatch({
      type: GET_PERSONS_STATUSES,
      payload: res.data,
    });
  } catch (e) {
    console.warn(e.message);
    dispatch({
      type: STATUS_ERROR,
      payload: e.message,
    });
  }
};

export const deleteStatus = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/status/${id}`);
    dispatch({
      type: DELETE_STATUS,
      payload: id,
    });
  } catch (e) {
    console.warn(e.message);
    dispatch({
      type: STATUS_ERROR,
      payload: e.message,
    });
  }
};

export const editStatus = (status, id) => async (dispatch) => {
  const body = JSON.stringify({
    body: status.body,
    isMedia: status.isMedia,
    media: status.media,
    data: status.data,
  });
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.put(`/api/status/${id}`, body, config);
    dispatch({
      type: EDIT_STATUS,
      payload: res.data,
    });
  } catch (e) {
    console.warn(e.message);
    dispatch({
      type: STATUS_ERROR,
      payload: e.message,
    });
  }
};

export const addCommentToStatus = ({ content }, id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ content });
  try {
    const res = await axios.post(`/api/status/comment/${id}`, body, config);
    dispatch({
      type: ADD_COMMENT_TO_STATUS,
      payload: res.data,
    });
  } catch (e) {
    console.warn(e.message);
    dispatch({
      type: STATUS_ERROR,
      payload: e.message,
    });
  }
};

export const getCommentsOfStatus = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/status/comment/${id}`);
    dispatch({
      type: GET_COMMENTS_OF_STATUS,
      payload: [id, res.data],
    });
  } catch (e) {
    console.warn(e.message);
    dispatch({
      type: STATUS_ERROR,
      payload: e.message,
    });
  }
};

export const editCommentOfStatus = (id, comment_id, content) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ content });
  try {
    const res = await axios.put(
      `/api/status/comment/${id}/${comment_id}`,
      body,
      config
    );
    dispatch({
      type: EDIT_COMMENT_OF_STATUS,
      payload: [id, comment_id, res.data],
    });
  } catch (e) {
    console.warn(e.message);
    dispatch({
      type: STATUS_ERROR,
      payload: e.message,
    });
  }
};

export const deleteCommentOfStatus = (id, comment_id) => async (dispatch) => {
  try {
    await axios.delete(`/api/status/comment/${id}/${comment_id}`);
    dispatch({
      type: DELETE_COMMENT_OF_STATUS,
      payload: [id, comment_id],
    });
  } catch (e) {
    console.warn(e.message);
    dispatch({
      type: STATUS_ERROR,
      payload: e.message,
    });
  }
};

export const replyToCommentOfStatus = (id, comment_id, content) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ content });
  try {
    const res = await axios.post(
      `/api/status/comment/${id}/${comment_id}/reply`,
      body,
      config
    );
    dispatch({
      type: REPLY_TO_COMMENT_OF_STATUS,
      payload: [id, comment_id, res.data],
    });
  } catch (e) {
    console.warn(e.message);
    dispatch({
      type: STATUS_ERROR,
      payload: e.message,
    });
  }
};

export const editReplyToCommentOfStatus = (
  id,
  comment_id,
  reply_id,
  replyText
) => async (dispatch) => {
  const config = { headers: { "Content-Type": "application/json" } };
  const body = JSON.stringify({ content: replyText });
  try {
    const res = await axios.put(
      `/api/status/comment/${id}/${comment_id}/${reply_id}`,
      body,
      config
    );
    dispatch({
      type: EDIT_REPLY_TO_COMMENT_OF_STATUS,
      payload: [id, comment_id, res.data],
    });
  } catch (e) {
    console.warn(e.message);
    dispatch({
      type: STATUS_ERROR,
      payload: e.message,
    });
  }
};

export const getAllRepliesToCommentOfStatus = (id, comment_id) => async (
  dispatch
) => {
  try {
    const res = await axios.get(`/api/status/comment/${id}/${comment_id}`);
    dispatch({
      type: GET_ALL_REPLIES_TO_COMMENT_OF_STATUS,
      payload: [id, comment_id, res.data],
    });
  } catch (e) {
    console.warn(e.message);
    dispatch({
      type: STATUS_ERROR,
      payload: e.message,
    });
  }
};

export const deleteReplyToCommentOfStatus = (
  id,
  comment_id,
  reply_id
) => async (dispatch) => {
  try {
    await axios.delete(`/api/status/comment/${id}/${comment_id}/${reply_id}`);
    const payload = [id, comment_id];
    dispatch({
      type: DELETE_REPLY_TO_COMMENT_OF_STATUS,
      payload,
    });
  } catch (e) {
    console.warn(e.message);
    dispatch({
      type: STATUS_ERROR,
      payload: e.message,
    });
  }
};

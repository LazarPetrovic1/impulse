import axios from "axios";
import {
  CREATE_STATUS,
  GET_ALL_STATUSES,
  GET_MY_STATUSES,
  GET_PERSONS_STATUSES,
  DELETE_STATUS,
  EDIT_STATUS,
  LIKE_STATUS,
  DISLIKE_STATUS,
  IMPULSIFY_STATUS,
  ADD_COMMENT_TO_STATUS,
  GET_COMMENTS_OF_STATUS,
  EDIT_COMMENT_OF_STATUS,
  DELETE_COMMENT_OF_STATUS,
  REPLY_TO_COMMENT_OF_STATUS,
  EDIT_REPLY_TO_COMMENT_OF_STATUS,
  GET_ALL_REPLIES_TO_COMMENT_OF_STATUS,
  DELETE_REPLY_TO_COMMENT_OF_STATUS,
  STATUS_ERROR,
  IMPULSIFY_STATUS_COMMENT,
  DISLIKE_STATUS_COMMENT,
  LIKE_STATUS_COMMENT,
  IMPULSIFY_STATUS_REPLY,
  LIKE_STATUS_REPLY,
  DISLIKE_STATUS_REPLY,
  ALL_MEDIA_OUTSIDE_SPAWN,
  ALL_MEDIA_REMOVE,
  ALL_MEDIA_EDIT,
  ALL_MEDIA_OUTSIDE_STATCHANGE,
  ALL_MEDIA_OUTSIDE_SPAWN_COMMENT,
  ALL_MEDIA_OUTSIDE_COMMENT_REMOVE,
  ALL_MEDIA_OUTSIDE_COMMENT_EDIT,
  ALL_MEDIA_OUTSIDE_COMMENT_STATCHANGE,
  ALL_MEDIA_OUTSIDE_SPAWN_REPLY,
  ALL_MEDIA_OUTSIDE_REPLY_STATCHANGE,
  ALL_MEDIA_OUTSIDE_REPLY_REMOVE,
  ALL_MEDIA_OUTSIDE_REPLY_EDIT,
} from "./types";

// export const saveStatus = (status) => async (dispatch) => {}
// export const dismissStatus = (status) => async (dispatch) => {}

export const impulsifyStatusComment = (id, commentId, likerId) => async (
  dispatch
) => {
  const body = JSON.stringify({ likerId });
  const config = { headers: { "Content-Type": "application/json" } };
  try {
    const res = await axios.put(
      `/api/status/${id}/${commentId}/impulse`,
      body,
      config
    );
    dispatch({
      type: IMPULSIFY_STATUS_COMMENT,
      payload: {
        id,
        commentId,
        impulsions: res.data.impulsions,
        endorsements: res.data.endorsements,
        judgements: res.data.judgements,
      },
    });
    dispatch({
      type: ALL_MEDIA_OUTSIDE_COMMENT_STATCHANGE,
      payload: {
        type: "status",
        id,
        comment_id: commentId,
        impulsions: res.data.impulsions,
        endorsements: res.data.endorsements,
        judgements: res.data.judgements,
      },
    });
  } catch (e) {
    dispatch({
      type: STATUS_ERROR,
      payload: { msg: e.message },
    });
  }
};
export const likeStatusComment = (id, commentId, likerId) => async (
  dispatch
) => {
  const body = JSON.stringify({ likerId });
  const config = { headers: { "Content-Type": "application/json" } };
  try {
    const res = await axios.put(
      `/api/status/${id}/${commentId}/like`,
      body,
      config
    );
    dispatch({
      type: LIKE_STATUS_COMMENT,
      payload: {
        id,
        commentId,
        impulsions: res.data.impulsions,
        endorsements: res.data.endorsements,
        judgements: res.data.judgements,
      },
    });
    dispatch({
      type: ALL_MEDIA_OUTSIDE_COMMENT_STATCHANGE,
      payload: {
        type: "status",
        id,
        comment_id: commentId,
        impulsions: res.data.impulsions,
        endorsements: res.data.endorsements,
        judgements: res.data.judgements,
      },
    });
  } catch (e) {
    dispatch({
      type: STATUS_ERROR,
      payload: { msg: e.message },
    });
  }
};
export const dislikeStatusComment = (id, commentId, likerId) => async (
  dispatch
) => {
  const body = JSON.stringify({ likerId });
  const config = { headers: { "Content-Type": "application/json" } };
  try {
    const res = await axios.put(
      `/api/status/${id}/${commentId}/dislike`,
      body,
      config
    );
    dispatch({
      type: DISLIKE_STATUS_COMMENT,
      payload: {
        id,
        commentId,
        impulsions: res.data.impulsions,
        endorsements: res.data.endorsements,
        judgements: res.data.judgements,
      },
    });
    dispatch({
      type: ALL_MEDIA_OUTSIDE_COMMENT_STATCHANGE,
      payload: {
        type: "status",
        id,
        comment_id: commentId,
        impulsions: res.data.impulsions,
        endorsements: res.data.endorsements,
        judgements: res.data.judgements,
      },
    });
  } catch (e) {
    dispatch({
      type: STATUS_ERROR,
      payload: { msg: e.message },
    });
  }
};
export const impulsifyReplyToStatusComment = (
  id,
  commentId,
  replyId,
  likerId
) => async (dispatch) => {
  const body = JSON.stringify({ likerId });
  const config = { headers: { "Content-Type": "application/json" } };
  try {
    const res = await axios.put(
      `/api/status/${id}/${commentId}/${replyId}/impulse`,
      body,
      config
    );
    dispatch({
      type: IMPULSIFY_STATUS_REPLY,
      payload: {
        id,
        commentId,
        replyId,
        impulsions: res.data.impulsions,
        endorsements: res.data.endorsements,
        judgements: res.data.judgements,
      },
    });
    dispatch({
      type: ALL_MEDIA_OUTSIDE_REPLY_STATCHANGE,
      payload: {
        type: "status",
        id,
        comment_id: commentId,
        reply_id: replyId,
        impulsions: res.data.impulsions,
        endorsements: res.data.endorsements,
        judgements: res.data.judgements,
      },
    });
  } catch (e) {
    dispatch({
      type: STATUS_ERROR,
      payload: { msg: e.message },
    });
  }
};
export const likeReplyToStatusComment = (
  id,
  commentId,
  replyId,
  likerId
) => async (dispatch) => {
  const body = JSON.stringify({ likerId });
  const config = { headers: { "Content-Type": "application/json" } };
  try {
    const res = await axios.put(
      `/api/status/${id}/${commentId}/${replyId}/like`,
      body,
      config
    );
    dispatch({
      type: LIKE_STATUS_REPLY,
      payload: {
        id,
        commentId,
        replyId,
        impulsions: res.data.impulsions,
        endorsements: res.data.endorsements,
        judgements: res.data.judgements,
      },
    });
    dispatch({
      type: ALL_MEDIA_OUTSIDE_REPLY_STATCHANGE,
      payload: {
        type: "status",
        id,
        comment_id: commentId,
        reply_id: replyId,
        impulsions: res.data.impulsions,
        endorsements: res.data.endorsements,
        judgements: res.data.judgements,
      },
    });
  } catch (e) {
    dispatch({
      type: STATUS_ERROR,
      payload: { msg: e.message },
    });
  }
};
export const dislikeReplyToStatusComment = (
  id,
  commentId,
  replyId,
  likerId
) => async (dispatch) => {
  const body = JSON.stringify({ likerId });
  const config = { headers: { "Content-Type": "application/json" } };
  try {
    const res = await axios.put(
      `/api/status/${id}/${commentId}/${replyId}/dislike`,
      body,
      config
    );
    dispatch({
      type: DISLIKE_STATUS_REPLY,
      payload: {
        id,
        commentId,
        replyId,
        impulsions: res.data.impulsions,
        endorsements: res.data.endorsements,
        judgements: res.data.judgements,
      },
    });
    dispatch({
      type: ALL_MEDIA_OUTSIDE_REPLY_STATCHANGE,
      payload: {
        type: "status",
        id,
        comment_id: commentId,
        reply_id: replyId,
        impulsions: res.data.impulsions,
        endorsements: res.data.endorsements,
        judgements: res.data.judgements,
      },
    });
  } catch (e) {
    dispatch({
      type: STATUS_ERROR,
      payload: { msg: e.message },
    });
  }
};

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
    dispatch({
      type: ALL_MEDIA_OUTSIDE_SPAWN,
      payload: {
        type: "status",
        item: res.data,
      },
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
export const getPersonsStatuses = (id, page, limit) => async (dispatch) => {
  try {
    const res = await axios.get(
      `/api/status/${id}?page=${page}&limit=${limit}`
    );
    dispatch({
      type: GET_PERSONS_STATUSES,
      payload: res.data.posts,
    });
    return res.data.hasMore;
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
    dispatch({
      type: ALL_MEDIA_REMOVE,
      payload: {
        type: "status",
        id,
      },
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
    dispatch({
      type: ALL_MEDIA_EDIT,
      payload: {
        type: "status",
        id,
        item: res.data,
      },
    });
  } catch (e) {
    console.warn(e.message);
    dispatch({
      type: STATUS_ERROR,
      payload: e.message,
    });
  }
};

export const impulsify = (postId, likerId) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ likerId });
    const res = await axios.put(`/api/status/impulse/${postId}`, body, config);
    dispatch({
      type: IMPULSIFY_STATUS,
      payload: {
        impulsions: res.data.impulsions,
        endorsements: res.data.endorsements,
        judgements: res.data.judgements,
        id: postId,
      },
    });
    dispatch({
      type: ALL_MEDIA_OUTSIDE_STATCHANGE,
      payload: {
        type: "status",
        impulsions: res.data.impulsions,
        endorsements: res.data.endorsements,
        judgements: res.data.judgements,
        id: postId,
      },
    });
  } catch (e) {
    dispatch({
      type: STATUS_ERROR,
      payload: { msg: e.message },
    });
  }
};

export const like = (postId, likerId) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ likerId });
    const res = await axios.put(`/api/status/like/${postId}`, body, config);
    dispatch({
      type: LIKE_STATUS,
      payload: {
        impulsions: res.data.impulsions,
        endorsements: res.data.endorsements,
        judgements: res.data.judgements,
        id: postId,
      },
    });
    dispatch({
      type: ALL_MEDIA_OUTSIDE_STATCHANGE,
      payload: {
        type: "status",
        impulsions: res.data.impulsions,
        endorsements: res.data.endorsements,
        judgements: res.data.judgements,
        id: postId,
      },
    });
  } catch (e) {
    dispatch({
      type: STATUS_ERROR,
      payload: { msg: e.message },
    });
  }
};

export const dislike = (postId, likerId) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ likerId });
    const res = await axios.put(`/api/status/dislike/${postId}`, body, config);
    dispatch({
      type: DISLIKE_STATUS,
      payload: {
        impulsions: res.data.impulsions,
        endorsements: res.data.endorsements,
        judgements: res.data.judgements,
        id: postId,
      },
    });
    dispatch({
      type: ALL_MEDIA_OUTSIDE_STATCHANGE,
      payload: {
        type: "status",
        impulsions: res.data.impulsions,
        endorsements: res.data.endorsements,
        judgements: res.data.judgements,
        id: postId,
      },
    });
  } catch (e) {
    dispatch({
      type: STATUS_ERROR,
      payload: { msg: e.message },
    });
  }
};

export const addCommentToStatus = (content, id) => async (dispatch) => {
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
      payload: {
        id,
        items: res.data,
      },
    });
    dispatch({
      type: ALL_MEDIA_OUTSIDE_SPAWN_COMMENT,
      payload: {
        type: "status",
        id,
        item: res.data,
      },
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
      payload: {
        id,
        comment_id,
        item: res.data,
      },
      // payload: [id, comment_id, res.data],
    });
    dispatch({
      type: ALL_MEDIA_OUTSIDE_COMMENT_EDIT,
      payload: {
        type: "status",
        id,
        comment_id,
        item: res.data,
      },
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
    dispatch({
      type: ALL_MEDIA_OUTSIDE_COMMENT_REMOVE,
      payload: {
        type: "status",
        id,
        comment_id,
      },
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
    dispatch({
      type: ALL_MEDIA_OUTSIDE_SPAWN_REPLY,
      payload: {
        type: "status",
        id,
        comment_id,
        item: res.data,
      },
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
    dispatch({
      type: ALL_MEDIA_OUTSIDE_REPLY_EDIT,
      payload: {
        type: "status",
        id,
        comment_id,
        reply_id,
        item: res.data,
      },
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
    const payload = {
      id,
      comment_id,
      reply_id,
    };
    dispatch({
      type: DELETE_REPLY_TO_COMMENT_OF_STATUS,
      payload,
    });
    dispatch({
      type: ALL_MEDIA_OUTSIDE_REPLY_REMOVE,
      payload: {
        type: "status",
        ...payload,
      },
    });
  } catch (e) {
    console.warn(e.message);
    dispatch({
      type: STATUS_ERROR,
      payload: e.message,
    });
  }
};

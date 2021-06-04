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
  IMPULSE_POST_IN_GROUP,
  LIKE_POST_IN_GROUP,
  DISLIKE_POST_IN_GROUP,
  COMMENT_GROUP_POST,
  GET_COMMENTS_OF_GROUP_POST,
  UPDATE_GROUP_POST_COMMENT,
  DELETE_GROUP_POST_COMMENT,
  REPLY_TO_GROUP_POST_COMMENT,
  GET_REPLIES_TO_COMMENT_OF_GROUP_POST,
  UPDATE_GROUP_POST_REPLY,
  DELETE_GROUP_POST_REPLY,
  IMPULSIFY_GROUP_POST_COMMENT,
  DISLIKE_GROUP_POST_COMMENT,
  LIKE_GROUP_POST_COMMENT,
  IMPULSIFY_GROUP_POST_REPLY,
  LIKE_GROUP_POST_REPLY,
  DISLIKE_GROUP_POST_REPLY,
} from "./types";

import {
  POST_DELIMITER,
  COMMENT_DELIMITER,
  REPLY_DELIMITER,
} from "../utils/nonReduxConstants";

export const impulsifyComment = (id, postId, commentId, likerId) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ likerId });
  try {
    const res = await axios.put(
      `/api/group/${id}/${postId}/${commentId}/impulse`,
      body,
      config
    );
    const payload = {
      id,
      postId,
      commentId,
      impulsions: res.data.impulsions,
      endorsements: res.data.endorsements,
      judgements: res.data.judgements,
    };
    dispatch({
      type: IMPULSIFY_GROUP_POST_COMMENT,
      payload,
    });
  } catch (e) {
    dispatch({
      type: GROUP_ERROR,
      payload: e.message,
    });
  }
};
export const likeComment = (id, postId, commentId, likerId) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ likerId });
  try {
    const res = await axios.put(
      `/api/group/${id}/${postId}/${commentId}/like`,
      body,
      config
    );
    const payload = {
      id,
      postId,
      commentId,
      impulsions: res.data.impulsions,
      endorsements: res.data.endorsements,
      judgements: res.data.judgements,
    };
    dispatch({
      type: LIKE_GROUP_POST_COMMENT,
      payload,
    });
  } catch (e) {
    dispatch({
      type: GROUP_ERROR,
      payload: e.message,
    });
  }
};
export const dislikeComment = (id, postId, commentId, likerId) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ likerId });
  try {
    const res = await axios.put(
      `/api/group/${id}/${postId}/${commentId}/dislike`,
      body,
      config
    );
    const payload = {
      id,
      postId,
      commentId,
      impulsions: res.data.impulsions,
      endorsements: res.data.endorsements,
      judgements: res.data.judgements,
    };
    dispatch({
      type: DISLIKE_GROUP_POST_COMMENT,
      payload,
    });
  } catch (e) {
    dispatch({
      type: GROUP_ERROR,
      payload: e.message,
    });
  }
};
export const impulsifyReplyToImageComment = (
  id,
  postId,
  commentId,
  replyId,
  likerId
) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ likerId });
  try {
    const res = await axios.put(
      `/api/group/${id}/${postId}/${commentId}/${replyId}/impulse`,
      body,
      config
    );
    const payload = {
      id,
      postId,
      commentId,
      replyId,
      impulsions: res.data.impulsions,
      endorsements: res.data.endorsements,
      judgements: res.data.judgements,
    };
    dispatch({
      type: IMPULSIFY_GROUP_POST_REPLY,
      payload,
    });
  } catch (e) {
    dispatch({
      type: GROUP_ERROR,
      payload: e.message,
    });
  }
};
export const likeReplyToImageComment = (
  id,
  postId,
  commentId,
  replyId,
  likerId
) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ likerId });
  try {
    const res = await axios.put(
      `/api/group/${id}/${postId}/${commentId}/${replyId}/like`,
      body,
      config
    );
    const payload = {
      id,
      postId,
      commentId,
      replyId,
      impulsions: res.data.impulsions,
      endorsements: res.data.endorsements,
      judgements: res.data.judgements,
    };
    dispatch({
      type: LIKE_GROUP_POST_REPLY,
      payload,
    });
  } catch (e) {
    dispatch({
      type: GROUP_ERROR,
      payload: e.message,
    });
  }
};
export const dislikeReplyToImageComment = (
  id,
  postId,
  commentId,
  replyId,
  likerId
) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ likerId });
  try {
    const res = await axios.put(
      `/api/group/${id}/${postId}/${commentId}/${replyId}/dislike`,
      body,
      config
    );
    const payload = {
      id,
      postId,
      commentId,
      replyId,
      impulsions: res.data.impulsions,
      endorsements: res.data.endorsements,
      judgements: res.data.judgements,
    };
    dispatch({
      type: DISLIKE_GROUP_POST_REPLY,
      payload,
    });
  } catch (e) {
    dispatch({
      type: GROUP_ERROR,
      payload: e.message,
    });
  }
};

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
export const getGroup = (
  id,
  page = 1,
  commentPage = 1,
  replyPage = 1
) => async (dispatch) => {
  try {
    const res = await axios.get(
      `/api/group/${id}?page=${page}&limit=${POST_DELIMITER}&comment_page=${commentPage}&comment_limit=${COMMENT_DELIMITER}&reply_page=${replyPage}&reply_limit=${REPLY_DELIMITER}`
    );
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
export const impulsePostInGroup = (id, postId, likerId) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ likerId });
    const res = await axios.put(
      `/api/group/impulse/${id}/${postId}`,
      body,
      config
    );
    dispatch({
      type: IMPULSE_POST_IN_GROUP,
      payload: {
        postId,
        impulsions: res.data.impulsions,
        endorsements: res.data.endorsements,
        judgements: res.data.judgements,
      },
    });
  } catch (e) {
    dispatch({
      type: GROUP_ERROR,
      payload: { msg: e.message },
    });
  }
};
export const likePostInGroup = (id, postId, likerId) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ likerId });
  try {
    const res = await axios.put(
      `/api/group/like/${id}/${postId}`,
      body,
      config
    );
    dispatch({
      type: LIKE_POST_IN_GROUP,
      payload: {
        postId,
        impulsions: res.data.impulsions,
        endorsements: res.data.endorsements,
        judgements: res.data.judgements,
      },
    });
  } catch (e) {
    console.warn(e.message);
    dispatch({
      type: GROUP_ERROR,
      payload: e.message,
    });
  }
};
export const dislikePostInGroup = (id, postId, likerId) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ likerId });
  try {
    const res = await axios.put(
      `/api/group/dislike/${id}/${postId}`,
      body,
      config
    );
    dispatch({
      type: DISLIKE_POST_IN_GROUP,
      payload: {
        postId,
        impulsions: res.data.impulsions,
        endorsements: res.data.endorsements,
        judgements: res.data.judgements,
      },
    });
  } catch (e) {
    console.warn(e.message);
    dispatch({
      type: GROUP_ERROR,
      payload: e.message,
    });
  }
};
export const commentGroupPost = (id, postId, text) => async (dispatch) => {
  // :id/:post_id
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ text });
  try {
    const res = await axios.post(`/api/group/${id}/${postId}`, body, config);
    dispatch({
      type: COMMENT_GROUP_POST,
      payload: {
        id,
        postId,
        comments: res.data,
      },
    });
  } catch (e) {
    console.warn(e.message);
    dispatch({
      type: GROUP_ERROR,
      payload: e.message,
    });
  }
};
export const getPostComments = (
  id,
  postId,
  commentPage,
  commentLimit
) => async (dispatch) => {
  try {
    const res = await axios.get(
      `/api/group/${id}/${postId}?comment_page=${commentPage}&comment_limit=${commentLimit}`
    );
    await console.log("REZDEJTA", res.data);
    dispatch({
      type: GET_COMMENTS_OF_GROUP_POST,
      payload: {
        postId,
        comments: res.data.comments,
      },
    });
    return res.data;
  } catch (e) {
    dispatch({
      type: GROUP_ERROR,
      payload: e.message,
    });
  }
};
export const updateComment = (id, postId, commentId, content) => async (
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
      `/api/group/${id}/${postId}/${commentId}`,
      body,
      config
    );
    dispatch({
      type: UPDATE_GROUP_POST_COMMENT,
      payload: {
        id,
        postId,
        commentId,
        comment: res.data,
      },
    });
  } catch (e) {
    console.warn(e.message);
    dispatch({
      type: GROUP_ERROR,
      payload: e.message,
    });
  }
};
export const deleteComment = (id, postId, commentId) => async (dispatch) => {
  try {
    await axios.delete(`/api/group/${id}/${postId}/${commentId}`);
    dispatch({
      type: DELETE_GROUP_POST_COMMENT,
      payload: {
        id,
        postId,
        commentId,
      },
    });
  } catch (e) {
    console.warn(e.message);
    dispatch({
      type: GROUP_ERROR,
      payload: e.message,
    });
  }
};
export const replyToComment = (id, postId, commentId, content) => async (
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
      `/api/group/${id}/${postId}/${commentId}`,
      body,
      config
    );
    dispatch({
      type: REPLY_TO_GROUP_POST_COMMENT,
      payload: {
        id,
        postId,
        commentId,
        comment: res.data,
      },
    });
  } catch (e) {
    console.warn(e.message);
    dispatch({
      type: GROUP_ERROR,
      payload: e.message,
    });
  }
};
export const getCommentReplies = (
  id,
  postId,
  commentId,
  replyPage,
  replyLimit
) => async (dispatch) => {
  try {
    const res = await axios.get(
      `/api/group/${id}/${postId}/${commentId}?reply_page=${replyPage}&reply_limit=${replyLimit}`
    );
    await console.log(res.data);
    dispatch({
      type: GET_REPLIES_TO_COMMENT_OF_GROUP_POST,
      payload: {
        postId,
        commentId,
        replies: res.data.replies,
      },
    });
    return res.data;
  } catch (e) {
    dispatch({
      type: GROUP_ERROR,
      payload: e.message,
    });
  }
};
export const updateReply = (id, postId, commentId, replyId, content) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  console.log("ALL STUFF", {
    id,
    postId,
    commentId,
    replyId,
    content,
  });
  const body = JSON.stringify({ content });
  try {
    const res = await axios.put(
      `/api/group/${id}/${postId}/${commentId}/${replyId}`,
      body,
      config
    );
    dispatch({
      type: UPDATE_GROUP_POST_REPLY,
      payload: {
        id,
        postId,
        commentId,
        replyId,
        reply: res.data,
      },
    });
  } catch (e) {
    console.warn(e.message);
    dispatch({
      type: GROUP_ERROR,
      payload: e.message,
    });
  }
};
export const deleteReply = (id, postId, commentId, replyId, content) => async (
  dispatch
) => {
  try {
    await axios.delete(`/api/group/${id}/${postId}/${commentId}/${replyId}`);
    dispatch({
      type: DELETE_GROUP_POST_REPLY,
      payload: {
        id,
        postId,
        commentId,
        replyId,
      },
    });
  } catch (e) {
    console.warn(e.message);
    dispatch({
      type: GROUP_ERROR,
      payload: e.message,
    });
  }
};

// :id/:post_id/:comment_id/:reply_id
//

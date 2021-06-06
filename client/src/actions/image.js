import axios from "axios";
import {
  CREATE_IMAGE,
  GET_IMAGES,
  // eslint-disable-next-line
  DELETE_IMAGE,
  IMAGE_ERROR,
  WIPE_IMAGES,
  LIKE_IMAGE,
  DISLIKE_IMAGE,
  IMPULSIFY_IMAGE,
  // SAVE_IMAGE,
  IMPULSIFY_IMAGE_COMMENT,
  DISLIKE_IMAGE_COMMENT,
  LIKE_IMAGE_COMMENT,
  IMPULSIFY_IMAGE_REPLY,
  LIKE_IMAGE_REPLY,
  DISLIKE_IMAGE_REPLY,
  IMAGE_POST_ADD_REPLY,
  EDIT_IMAGE_COMMENT,
  EDIT_IMAGE_COMMENT_REPLY,
  ADD_COMMENT,
  GET_IMAGE_COMMENTS,
  DELETE_COMMENT,
  DELETE_REPLY,
  IMAGE_POST_GET_REPLIES,
  ALL_MEDIA_OUTSIDE_SPAWN,
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

// export const saveImage = (id) => async dispatch => {
//   try {
//     const res = await axios.put(`/api/imageposts/save/${id}`)
//     // DISPATCH HERE
//   } catch (e) {
//     dispatch({
//       type: IMAGE_ERROR,
//       payload: { msg: e.message },
//     });
//   }
// }
// export const dismissImage = (id) => async dispatch => {}

export const editImageComment = (id, comment_id, content) => async (
  dispatch
) => {
  const body = JSON.stringify({ content });
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.put(
      `/api/imageposts/comment/${id}/${comment_id}`,
      body,
      config
    );
    dispatch({
      type: EDIT_IMAGE_COMMENT,
      payload: {
        id,
        comment_id,
        item: res.data,
      },
    });
    dispatch({
      type: ALL_MEDIA_OUTSIDE_COMMENT_EDIT,
      payload: {
        type: "image",
        id,
        comment_id,
        item: res.data,
      },
    });
  } catch (e) {
    dispatch({
      type: IMAGE_ERROR,
      payload: { msg: e.message },
    });
  }
};
export const editImageCommentReply = (
  id,
  comment_id,
  reply_id,
  content
) => async (dispatch) => {
  const body = JSON.stringify({ content });
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.put(
      `/api/imageposts/comment/${id}/${comment_id}/${reply_id}`,
      body,
      config
    );
    dispatch({
      type: EDIT_IMAGE_COMMENT_REPLY,
      payload: {
        id,
        comment_id,
        reply_id,
        item: res.data,
      },
    });
    dispatch({
      type: ALL_MEDIA_OUTSIDE_REPLY_EDIT,
      payload: {
        type: "image",
        id,
        comment_id,
        reply_id,
        item: res.data,
      },
    });
  } catch (e) {
    dispatch({
      type: IMAGE_ERROR,
      payload: { msg: e.message },
    });
  }
};
export const impulsifyImageComment = (id, commentId, likerId) => async (
  dispatch
) => {
  const body = JSON.stringify({ likerId });
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.put(
      `/api/imageposts/${id}/${commentId}/impulse`,
      body,
      config
    );
    dispatch({
      type: IMPULSIFY_IMAGE_COMMENT,
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
        type: "image",
        id,
        comment_id: commentId,
        impulsions: res.data.impulsions,
        endorsements: res.data.endorsements,
        judgements: res.data.judgements,
      },
    });
  } catch (e) {
    dispatch({
      type: IMAGE_ERROR,
      payload: { msg: e.message },
    });
  }
};
export const likeImageComment = (id, commentId, likerId) => async (
  dispatch
) => {
  const body = JSON.stringify({ likerId });
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.put(
      `/api/imageposts/${id}/${commentId}/like`,
      body,
      config
    );
    dispatch({
      type: LIKE_IMAGE_COMMENT,
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
        type: "image",
        id,
        comment_id: commentId,
        impulsions: res.data.impulsions,
        endorsements: res.data.endorsements,
        judgements: res.data.judgements,
      },
    });
  } catch (e) {
    dispatch({
      type: IMAGE_ERROR,
      payload: { msg: e.message },
    });
  }
};
export const dislikeImageComment = (id, commentId, likerId) => async (
  dispatch
) => {
  const body = JSON.stringify({ likerId });
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.put(
      `/api/imageposts/${id}/${commentId}/dislike`,
      body,
      config
    );
    dispatch({
      type: DISLIKE_IMAGE_COMMENT,
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
        type: "image",
        id,
        comment_id: commentId,
        impulsions: res.data.impulsions,
        endorsements: res.data.endorsements,
        judgements: res.data.judgements,
      },
    });
  } catch (e) {
    dispatch({
      type: IMAGE_ERROR,
      payload: { msg: e.message },
    });
  }
};
export const impulsifyReplyToImageComment = (
  id,
  commentId,
  replyId,
  likerId
) => async (dispatch) => {
  const body = JSON.stringify({ likerId });
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.put(
      `/api/imageposts/${id}/${commentId}/${replyId}/impulse`,
      body,
      config
    );
    dispatch({
      type: IMPULSIFY_IMAGE_REPLY,
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
        type: "image",
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
      type: IMAGE_ERROR,
      payload: { msg: e.message },
    });
  }
};
export const likeReplyToImageComment = (
  id,
  commentId,
  replyId,
  likerId
) => async (dispatch) => {
  const body = JSON.stringify({ likerId });
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.put(
      `/api/imageposts/${id}/${commentId}/${replyId}/like`,
      body,
      config
    );
    dispatch({
      type: LIKE_IMAGE_REPLY,
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
        type: "image",
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
      type: IMAGE_ERROR,
      payload: { msg: e.message },
    });
  }
};
export const dislikeReplyToImageComment = (
  id,
  commentId,
  replyId,
  likerId
) => async (dispatch) => {
  const body = JSON.stringify({ likerId });
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.put(
      `/api/imageposts/${id}/${commentId}/${replyId}/dislike`,
      body,
      config
    );
    dispatch({
      type: DISLIKE_IMAGE_REPLY,
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
        type: "image",
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
      type: IMAGE_ERROR,
      payload: { msg: e.message },
    });
  }
};
export const wipeImages = () => async (dispatch) =>
  dispatch({ type: WIPE_IMAGES });
export const getImages = (id, page, limit) => async (dispatch) => {
  try {
    const res = await axios.get(
      `/api/imageposts/${id}?page=${page}&limit=${limit}`
    );
    dispatch({
      type: GET_IMAGES,
      payload: res.data.posts,
    });
    return res.data.hasMore;
  } catch (e) {
    dispatch({
      type: IMAGE_ERROR,
      payload: { msg: e.message },
    });
  }
};
export const createImage = (base64EncodedImage, content) => async (
  dispatch
) => {
  try {
    const body = JSON.stringify({ data: base64EncodedImage, content });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post("/api/imageposts/", body, config);
    dispatch({
      type: CREATE_IMAGE,
      payload: res.data,
    });
    dispatch({
      type: ALL_MEDIA_OUTSIDE_SPAWN,
      payload: { type: "image", item: res.data },
    });
  } catch (e) {
    dispatch({
      type: IMAGE_ERROR,
      payload: { msg: e.message },
    });
  }
};
export const addComment = ({ id, text, ownedById }) => async (dispatch) => {
  try {
    const body = JSON.stringify({ text });
    const config = { headers: { "Content-Type": "application/json" } };
    const res = await axios.post(`/api/imageposts/comment/${id}`, body, config);
    dispatch({
      type: ADD_COMMENT,
      payload: { id, item: res.data },
    });
    dispatch({
      type: ALL_MEDIA_OUTSIDE_SPAWN_COMMENT,
      payload: { type: "image", id, item: res.data },
    });
  } catch (e) {
    dispatch({
      type: IMAGE_ERROR,
      payload: { msg: e.message },
    });
  }
};
export const getComments = (id, page, limit) => async (dispatch) => {
  try {
    const res = await axios.get(
      `/api/imageposts/comment/${id}?comment_page=${page}&comment_limit=${limit}`
    );
    dispatch({
      type: GET_IMAGE_COMMENTS,
      payload: {
        id,
        comments: res.data.comments,
      },
    });
    return {
      commentsLength: res.data.commentsLength,
      hasMore: res.data.hasMore,
    };
  } catch (e) {
    dispatch({
      type: IMAGE_ERROR,
      payload: { msg: e.message },
    });
  }
};
export const deleteComment = (id, commentId) => async (dispatch) => {
  try {
    const res = await axios.delete(
      `/api/imageposts/comment/${id}/${commentId}`
    );
    dispatch({
      type: DELETE_COMMENT,
      payload: { id, commentId, items: res.data },
    });
    dispatch({
      type: ALL_MEDIA_OUTSIDE_COMMENT_REMOVE,
      payload: {
        type: "image",
        id,
        comment_id: commentId,
        items: res.data,
      },
    });
  } catch (e) {
    dispatch({
      type: IMAGE_ERROR,
      payload: { msg: e.message },
    });
  }
};
export const impulsify = (postId, ownedById, likerId) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ likerId });
    const res = await axios.put(
      `/api/imageposts/impulse/${postId}`,
      body,
      config
    );
    dispatch({
      type: IMPULSIFY_IMAGE,
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
        type: "image",
        impulsions: res.data.impulsions,
        endorsements: res.data.endorsements,
        judgements: res.data.judgements,
        id: postId,
      },
    });
  } catch (e) {
    dispatch({
      type: IMAGE_ERROR,
      payload: { msg: e.message },
    });
  }
};
export const like = (postId, ownedById, likerId) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ likerId });
    const res = await axios.put(`/api/imageposts/like/${postId}`, body, config);
    dispatch({
      type: LIKE_IMAGE,
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
        type: "image",
        impulsions: res.data.impulsions,
        endorsements: res.data.endorsements,
        judgements: res.data.judgements,
        id: postId,
      },
    });
  } catch (e) {
    dispatch({
      type: IMAGE_ERROR,
      payload: { msg: e.message },
    });
  }
};
export const dislike = (postId, ownedById, likerId) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ likerId });
    const res = await axios.put(
      `/api/imageposts/dislike/${postId}`,
      body,
      config
    );
    dispatch({
      type: DISLIKE_IMAGE,
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
        type: "image",
        impulsions: res.data.impulsions,
        endorsements: res.data.endorsements,
        judgements: res.data.judgements,
        id: postId,
      },
    });
  } catch (e) {
    dispatch({
      type: IMAGE_ERROR,
      payload: { msg: e.message },
    });
  }
};
export const imagePostReplyToComment = (id, comment_id, content) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(
      `/api/imageposts/comment/${id}/${comment_id}/reply`,
      JSON.stringify({ content }),
      config
    );
    dispatch({
      type: IMAGE_POST_ADD_REPLY,
      payload: {
        id,
        comment_id,
        items: res.data,
      },
    });
    dispatch({
      type: ALL_MEDIA_OUTSIDE_SPAWN_REPLY,
      payload: {
        type: "image",
        id,
        comment_id,
        item: res.data,
      },
    });
  } catch (e) {
    console.warn(e.message);
    dispatch({ type: IMAGE_ERROR, payload: e.message });
  }
};
export const deleteImageReply = (id, comment_id, reply_id) => async (
  dispatch
) => {
  try {
    await axios.delete(
      `/api/imageposts/comment/${id}/${comment_id}/${reply_id}`
    );
    const payload = {
      id,
      comment_id,
      reply_id,
    };
    dispatch({
      type: DELETE_REPLY,
      payload,
    });
    dispatch({
      type: ALL_MEDIA_OUTSIDE_REPLY_REMOVE,
      payload: {
        type: "image",
        ...payload,
      },
    });
  } catch (e) {
    console.warn(e.message);
    dispatch({ type: IMAGE_ERROR, payload: e.message });
  }
};
export const getRepliesToComment = (id, comment_id, page, limit) => async (
  dispatch
) => {
  try {
    const res = await axios.get(
      `/api/imageposts/comment/${id}/${comment_id}/reply?reply_page=${page}&reply_limit=${limit}`
    );
    dispatch({
      type: IMAGE_POST_GET_REPLIES,
      payload: {
        id,
        commentId: comment_id,
        replies: res.data.replies,
      },
    });
    return {
      repliesLength: res.data.repliesLength,
      hasMore: res.data.hasMore,
    };
  } catch (e) {}
};

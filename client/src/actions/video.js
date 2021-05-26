import {
  GET_VIDEOS,
  INCREMENT_VIEWS,
  CREATE_VIDEO,
  VIDEO_DELETE_COMMENT,
  GET_VIDEO,
  LIKE_VIDEO,
  DISLIKE_VIDEO,
  IMPULSIFY_VIDEO,
  VIDEO_ERROR,
  VIDEO_COMMENT,
  VIDEO_ADD_REPLY,
  VIDEO_EDIT_REPLY,
  VIDEO_DELETE_REPLY,
  VIDEO_EDIT_COMMENT,
  VIDEO_GET_COMMENTS,
  VIDEO_SEARCH,
  // SAVE_VIDEO,
  // DISMISS_VIDEO,
  IMPULSIFY_VIDEO_COMMENT,
  DISLIKE_VIDEO_COMMENT,
  LIKE_VIDEO_COMMENT,
  IMPULSIFY_VIDEO_REPLY,
  LIKE_VIDEO_REPLY,
  DISLIKE_VIDEO_REPLY
} from "./types";
import axios from "axios";

export const addView = (id) => async dispatch => {
  try {
    const res = await axios.get(`/api/videoposts/views/${id}`)
    dispatch({
      type: INCREMENT_VIEWS,
      payload: {
        id,
        views: res.data
      }
    })
  } catch (e) {
    dispatch({
      type: VIDEO_ERROR,
      payload: { msg: e.message },
    });
  }
};

// export const saveVideo = (id) => async (dispatch) => {}
// export const dismissVideo = (id) => async (dispatch) => {}
export const impulsifyComment = (id, commentId, likerId) => async (dispatch) => {
  const body = JSON.stringify({ likerId })
  const config = { headers: { "Content-Type": "application/json" } }
  try {
    const res = await axios.put(`/api/videoposts/${id}/${commentId}/impulse`, body, config)
    dispatch({
      type: IMPULSIFY_VIDEO_COMMENT,
      payload: {
        id,
        commentId,
        impulsions: res.data.impulsions,
        endorsements: res.data.endorsements,
        judgements: res.data.judgements
      }
    })
  } catch (e) {
    dispatch({
      type: VIDEO_ERROR,
      payload: { msg: e.message },
    });
  }
}
export const likeComment = (id, commentId, likerId) => async (dispatch) => {
  const body = JSON.stringify({ likerId })
  const config = { headers: { "Content-Type": "application/json" } }
  try {
    console.log("LIKECOMMENTVIDEO", { id, commentId, likerId });
    const res = await axios.put(`/api/videoposts/${id}/${commentId}/like`, body, config)
    dispatch({
      type: LIKE_VIDEO_COMMENT,
      payload: {
        id,
        commentId,
        impulsions: res.data.impulsions,
        endorsements: res.data.endorsements,
        judgements: res.data.judgements
      }
    })
  } catch (e) {
    dispatch({
      type: VIDEO_ERROR,
      payload: { msg: e.message },
    });
  }
}
export const dislikeComment = (id, commentId, likerId) => async (dispatch) => {
  const body = JSON.stringify({ likerId })
  const config = { headers: { "Content-Type": "application/json" } }
  try {
    const res = await axios.put(`/api/videoposts/${id}/${commentId}/dislike`, body, config)
    dispatch({
      type: DISLIKE_VIDEO_COMMENT,
      payload: {
        id,
        commentId,
        impulsions: res.data.impulsions,
        endorsements: res.data.endorsements,
        judgements: res.data.judgements
      }
    })
  } catch (e) {
    dispatch({
      type: VIDEO_ERROR,
      payload: { msg: e.message },
    });
  }
}
export const impulsifyReplyToComment = (id, commentId, replyId, likerId) => async (dispatch) => {
  const body = JSON.stringify({ likerId })
  const config = { headers: { "Content-Type": "application/json" } }
  try {
    const res = await axios.put(`/api/videoposts/${id}/${commentId}/${replyId}/impulse`, body, config)
    dispatch({
      type: IMPULSIFY_VIDEO_REPLY,
      payload: {
        id,
        commentId,
        replyId,
        impulsions: res.data.impulsions,
        endorsements: res.data.endorsements,
        judgements: res.data.judgements
      }
    })
  } catch (e) {
    dispatch({
      type: VIDEO_ERROR,
      payload: { msg: e.message },
    });
  }
}
export const likeReplyToComment = (id, commentId, replyId, likerId) => async (dispatch) => {
  const body = JSON.stringify({ likerId })
  const config = { headers: { "Content-Type": "application/json" } }
  try {
    const res = await axios.put(`/api/videoposts/${id}/${commentId}/${replyId}/like`, body, config)
    dispatch({
      type: LIKE_VIDEO_REPLY,
      payload: {
        id,
        commentId,
        replyId,
        impulsions: res.data.impulsions,
        endorsements: res.data.endorsements,
        judgements: res.data.judgements
      }
    })
  } catch (e) {
    dispatch({
      type: VIDEO_ERROR,
      payload: { msg: e.message },
    });
  }
}
export const dislikeReplyToComment = (id, commentId, replyId, likerId) => async (dispatch) => {
  const body = JSON.stringify({ likerId })
  const config = { headers: { "Content-Type": "application/json" } }
  try {
    const res = await axios.put(`/api/videoposts/${id}/${commentId}/${replyId}/dislike`, body, config)
    dispatch({
      type: DISLIKE_VIDEO_REPLY,
      payload: {
        id,
        commentId,
        replyId,
        impulsions: res.data.impulsions,
        endorsements: res.data.endorsements,
        judgements: res.data.judgements
      }
    })
  } catch (e) {
    dispatch({
      type: VIDEO_ERROR,
      payload: { msg: e.message },
    });
  }
}

export const getVideo = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/videoposts/video/${id}`);
    dispatch({
      type: GET_VIDEO,
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: VIDEO_ERROR,
      payload: { msg: e.message },
    });
  }
};
export const getUsersVideo = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/videoposts/${id}`);
    dispatch({
      type: GET_VIDEOS,
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: VIDEO_ERROR,
      payload: { msg: e.message },
    });
  }
};
export const getAllVideos = () => async (dispatch) => {
  try {
    const res = await axios.get(`/api/videoposts`);
    dispatch({
      type: GET_VIDEOS,
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: VIDEO_ERROR,
      payload: { msg: e.message },
    });
  }
};
export const createVideo = (
  base64EncodedVideo,
  name,
  description,
  meta,
  category
) => async (dispatch) => {
  try {
    const body = JSON.stringify({
      data: base64EncodedVideo,
      name,
      description,
      meta,
      category,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post("/api/videoposts/", body, config);
    dispatch({
      type: CREATE_VIDEO,
      payload: res.data,
    });
    dispatch(getAllVideos());
  } catch (e) {
    dispatch({
      type: VIDEO_ERROR,
      payload: { msg: e.message },
    });
  }
};
export const impulsifyVideo = (postId, likerId) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ likerId });
    const res = await axios.put(
      `/api/videoposts/impulse/${postId}`,
      body,
      config
    );
    dispatch({
      type: IMPULSIFY_VIDEO,
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: VIDEO_ERROR,
      payload: { msg: e.message },
    });
  }
};
export const likeVideo = (postId, likerId) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ likerId });
    const res = await axios.put(`/api/videoposts/like/${postId}`, body, config);
    dispatch({
      type: LIKE_VIDEO,
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: VIDEO_ERROR,
      payload: { msg: e.message },
    });
  }
};
export const dislikeVideo = (postId, likerId) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ likerId });
    const res = await axios.put(
      `/api/videoposts/dislike/${postId}`,
      body,
      config
    );
    dispatch({
      type: DISLIKE_VIDEO,
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: VIDEO_ERROR,
      payload: { msg: e.message },
    });
  }
};
export const commentVideo = (id, text) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ text });
    const res = await axios.post(`/api/videoposts/comment/${id}`, body, config);
    dispatch({
      type: VIDEO_COMMENT,
      payload: res.data,
    });
    dispatch(getVideo(id));
  } catch (e) {
    dispatch({
      type: VIDEO_ERROR,
      payload: { msg: e.message },
    });
  }
};
export const videoDeleteComment = (id, comment_id) => async (dispatch) => {
  try {
    await axios.delete(`/api/videoposts/comment/${id}/${comment_id}`);

    dispatch({
      type: VIDEO_DELETE_COMMENT,
      payload: comment_id,
    });
    dispatch(videoGetComments(id));
  } catch (e) {
    console.warn(e.message);

    dispatch({ type: VIDEO_ERROR });
  }
};
export const videoGetComments = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/videoposts/comment/${id}`);

    dispatch({
      type: VIDEO_GET_COMMENTS,
      payload: res.data,
    });
  } catch (e) {
    console.warn(e.message);

    dispatch({ type: VIDEO_ERROR });
  }
};
export const videoEditComment = (id, comment_id, content) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.put(
      `/api/videoposts/comment/${id}/${comment_id}`,
      JSON.stringify({ content }),
      config
    );
    await console.log(res.data);
    dispatch({
      type: VIDEO_EDIT_COMMENT,
      payload: res.data,
    });
    dispatch(videoGetComments(id));
  } catch (e) {
    console.warn(e.message);
    dispatch({ type: VIDEO_ERROR });
  }
};
export const videoReplyToComment = (id, comment_id, content) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(
      `/api/videoposts/comment/${id}/${comment_id}/reply`,
      JSON.stringify({ content }),
      config
    );
    dispatch({
      type: VIDEO_ADD_REPLY,
      payload: res.data,
    });
    dispatch(videoGetComments(id));
  } catch (e) {
    console.warn(e.message);
    dispatch({ type: VIDEO_ERROR });
  }
};
export const videoDeleteReplyToComment = (id, comment_id, reply_id) => async (
  dispatch
) => {
  try {
    await axios.delete(
      `/api/videoposts/comment/${id}/${comment_id}/${reply_id}`
    );
    const payload = {
      comment_id,
      reply_id,
    };
    dispatch({
      type: VIDEO_DELETE_REPLY,
      payload,
    });
    dispatch(videoGetComments(id));
  } catch (e) {
    console.warn(e.message);
    dispatch({ type: VIDEO_ERROR });
  }
};
export const videoEditReplyToComment = (
  id,
  comment_id,
  reply_id,
  replyText
) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.put(
      `/api/videoposts/comment/${id}/${comment_id}/${reply_id}`,
      JSON.stringify({ content: replyText }),
      config
    );
    dispatch({
      type: VIDEO_EDIT_REPLY,
      payload: res.data,
    });
    dispatch(videoGetComments(id));
  } catch (e) {
    console.warn(e.message);
    dispatch({ type: VIDEO_ERROR });
  }
};
export const searchVideos = (val, pathname) => (dispatch) => {
  if (val.length < 2) {
    if (pathname === "/videos-all") {
      dispatch(getAllVideos());
    } else if (pathname === "/videos-mine") {
      dispatch(getUsersVideo("mine"));
    }
  } else {
    dispatch({
      type: VIDEO_SEARCH,
      payload: val,
    });
  }
};

// export const deleteVideo = (postId, commentId) => async dispatch => {
//   try {
//     await axios.delete(`/api/videoposts/comment/${postId}/${commentId}`)
//     dispatch({
//       type: VIDEO_DELETE_COMMENT,
//       payload: commentId
//     })
//     dispatch(getVideo(postId))
//   } catch (e) {
//     dispatch({
//       type: VIDEO_ERROR,
//       payload: { msg: e.message }
//     })
//   }
// };

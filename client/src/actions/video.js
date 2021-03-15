import {
  GET_VIDEOS,
  CREATE_VIDEO,
  VIDEO_DELETE_COMMENT,
  GET_VIDEO,
  VIDEO_ERROR,
  VIDEO_COMMENT,
  VIDEO_ADD_REPLY,
  VIDEO_EDIT_REPLY,
  VIDEO_DELETE_REPLY,
  VIDEO_EDIT_COMMENT,
  VIDEO_GET_COMMENTS,
  VIDEO_SEARCH
} from './types';
import axios from 'axios'

export const getVideo = (id) => async dispatch => {
  try {
    const res = await axios.get(`/api/videoposts/video/${id}`)
    dispatch({
      type: GET_VIDEO,
      payload: res.data
    })
  } catch (e) {
    dispatch({
      type: VIDEO_ERROR,
      payload: { msg: e.message }
    })
  }
};

export const getUsersVideo = (id) => async dispatch => {
  try {
    const res = await axios.get(`/api/videoposts/${id}`)
    dispatch({
      type: GET_VIDEOS,
      payload: res.data
    })
  } catch (e) {
    dispatch({
      type: VIDEO_ERROR,
      payload: { msg: e.message }
    })
  }
};

export const getAllVideos = () => async dispatch => {
  try {
    const res = await axios.get(`/api/videoposts`)
    dispatch({
      type: GET_VIDEOS,
      payload: res.data
    })
  } catch (e) {
    dispatch({
      type: VIDEO_ERROR,
      payload: { msg: e.message }
    })
  }
};

export const createVideo = (base64EncodedVideo, name, description, meta, category) => async dispatch => {
  try {
    const body = JSON.stringify({ data: base64EncodedVideo, name, description, meta, category })
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    }
    const res = await axios.post('/api/videoposts/', body, config)
    dispatch({
      type: CREATE_VIDEO,
      payload: res.data
    })
    dispatch(getAllVideos())
  } catch (e) {
    dispatch({
      type: VIDEO_ERROR,
      payload: { msg: e.message }
    })
  }
};

export const impulsifyVideo = (postId, likerId) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    }
    const body = JSON.stringify({ likerId })
    await axios.put(`/api/videoposts/impulse/${postId}`, body, config)
    const res = await axios.get(`/api/videoposts/${postId}`)
    dispatch({
      type: GET_VIDEO,
      payload: res.data
    })
  } catch (e) {
    dispatch({
      type: VIDEO_ERROR,
      payload: { msg: e.message }
    })
  }
};

export const likeVideo = (postId, likerId) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    }
    const body = JSON.stringify({ likerId })
    await axios.put(`/api/videoposts/like/${postId}`, body, config)
    const res = await axios.get(`/api/videoposts/${postId}`)
    dispatch({
      type: GET_VIDEO,
      payload: res.data
    })
  } catch (e) {
    dispatch({
      type: VIDEO_ERROR,
      payload: { msg: e.message }
    })
  }
};

export const dislikeVideo = (postId, likerId) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    }
    const body = JSON.stringify({ likerId })
    await axios.put(`/api/videoposts/dislike/${postId}`, body, config)
    const res = await axios.get(`/api/videoposts/${postId}`)
    dispatch({
      type: GET_VIDEO,
      payload: res.data
    })
  } catch (e) {
    dispatch({
      type: VIDEO_ERROR,
      payload: { msg: e.message }
    })
  }
};

export const commentVideo = (id, text) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    }
    const body = JSON.stringify({ text })
    const res = await axios.post(`/api/videoposts/comment/${id}`, body, config)
    dispatch({
      type: VIDEO_COMMENT,
      payload: res.data
    })
    dispatch(getVideo(id))
  } catch (e) {
    dispatch({
      type: VIDEO_ERROR,
      payload: { msg: e.message }
    })
  }
};

export const videoDeleteComment = (id, comment_id) => async dispatch => {
  try {
    await axios.delete(`/api/videoposts/comment/${id}/${comment_id}`)

    dispatch({
      type: VIDEO_DELETE_COMMENT,
      payload: comment_id
    })
    dispatch(videoGetComments(id))
  } catch (e) {
    console.warn(e.message)

    dispatch({ type: VIDEO_ERROR })
  }
}

export const videoGetComments = (id) => async dispatch => {
  try {
    const res = await axios.get(`/api/videoposts/comment/${id}`)

    dispatch({
      type: VIDEO_GET_COMMENTS,
      payload: res.data
    })
  } catch (e) {
    console.warn(e.message)

    dispatch({ type: VIDEO_ERROR })
  }
};

export const videoEditComment = (id, comment_id, content) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  try {
    const res = await axios.put(`/api/videoposts/comment/${id}/${comment_id}`, JSON.stringify({ content }), config)
    await console.log(res.data);
    dispatch({
      type: VIDEO_EDIT_COMMENT,
      payload: res.data
    })
    dispatch(videoGetComments(id))
  } catch (e) {
    console.warn(e.message)
    dispatch({ type: VIDEO_ERROR })
  }
};

export const videoReplyToComment = (id, comment_id, content) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  try {
    const res = await axios.post(`/api/videoposts/comment/${id}/${comment_id}/reply`, JSON.stringify({ content }), config)
    dispatch({
      type: VIDEO_ADD_REPLY,
      payload: res.data
    })
    dispatch(videoGetComments(id))
  } catch (e) {
    console.warn(e.message)
    dispatch({ type: VIDEO_ERROR })
  }
};

export const videoDeleteReplyToComment = (id, comment_id, reply_id) => async dispatch => {
  try {
    await axios.delete(`/api/videoposts/comment/${id}/${comment_id}/${reply_id}`)
    const payload = {
      comment_id,
      reply_id
    }
    dispatch({
      type: VIDEO_DELETE_REPLY,
      payload
    })
    dispatch(videoGetComments(id))
  } catch (e) {
    console.warn(e.message)
    dispatch({ type: VIDEO_ERROR })
  }
};

export const videoEditReplyToComment = (id, comment_id, reply_id, replyText) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  try {
    const res = await axios.put(`/api/videoposts/comment/${id}/${comment_id}/${reply_id}`, JSON.stringify({ content: replyText }), config)
    dispatch({
      type: VIDEO_EDIT_REPLY,
      payload: res.data
    })
    dispatch(videoGetComments(id))
  } catch (e) {
    console.warn(e.message)
    dispatch({ type: VIDEO_ERROR })
  }
};

export const searchVideos = (val, pathname) => dispatch => {
  if (val.length < 2) {
    if (pathname === "/videos-all") {
      dispatch(getAllVideos())
    } else if (pathname === "/videos-mine") {
      dispatch(getUsersVideo("mine"))
    }
  } else {
    dispatch({
      type: VIDEO_SEARCH,
      payload: val
    })
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

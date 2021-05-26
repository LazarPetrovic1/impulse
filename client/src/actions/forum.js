import axios from 'axios'
import {
  CREATE_FORUM_POST,
  GET_ALL_FORUM_POSTS,
  GET_FORUM_POST_BY_ID,
  DELETE_FORUM_POST_SUCCESS,
  EDIT_FORUM_POST,
  FORUM_POST_ADD_COMMENT,
  FORUM_POST_DELETE_COMMENT,
  FORUM_POST_EDIT_COMMENT,
  FORUM_POST_GET_COMMENTS,
  FORUM_POST_ADD_REPLY,
  FORUM_POST_DELETE_REPLY,
  FORUM_POST_EDIT_REPLY,
  FORUM_POST_DISMISS,
  FORUM_ERROR,
  SAVE_FORUM_POST,
  IMPULSIFY_FORUM_POST,
  LIKE_FORUM_POST,
  DISLIKE_FORUM_POST,
  IMPULSIFY_FORUM_POST_COMMENT,
  LIKE_FORUM_POST_COMMENT,
  DISLIKE_FORUM_POST_COMMENT,
  IMPULSIFY_FORUM_POST_COMMENT_REPLY,
  LIKE_FORUM_POST_COMMENT_REPLY,
  DISLIKE_FORUM_POST_COMMENT_REPLY
} from './types'
import { setAlert } from './alert';

// Create forum post
export const createForumPost = ({ title, body }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  try {
    const res = await axios.post(
      '/api/forumposts',
      JSON.stringify({
        title,
        body
      }),
      config
    )

    dispatch({
      type: CREATE_FORUM_POST,
      payload: res.data
    })
  } catch (e) {
    console.warn(`${e.message}`)

    dispatch({
      type: FORUM_ERROR,
      payload: e.message
    })
  }
}

// Get all forum posts
export const getAllForumPosts = () => async dispatch => {
  try {
    const res = await axios.get('/api/forumposts')

    dispatch({
      type: GET_ALL_FORUM_POSTS,
      payload: res.data
    })
  } catch (e) {
    console.warn(e.message)

    dispatch({
      type: FORUM_ERROR,
      payload: e.message
    })
  }
}

// Get forum post by id
export const getForumPostById = (id) => async dispatch => {
  try {
    const res = await axios.get(`/api/forumposts/${id}`)

    dispatch({
      type: GET_FORUM_POST_BY_ID,
      payload: res.data
    })
  } catch (e) {
    console.warn(e.message)

    dispatch({
      type: FORUM_ERROR,
      payload: e.message
    })
  }
}

// Delete a forum post
export const deleteForumPost = (id) => async dispatch => {
  try {
    await axios.delete(`/api/forumposts/${id}`)

    dispatch({
      type: DELETE_FORUM_POST_SUCCESS,
      payload: id
    })
    dispatch(getAllForumPosts())
    dispatch(setAlert("Forum post removed successfully", "success"))
  } catch (e) {
    console.warn(e.message)

    dispatch({
      type: FORUM_ERROR,
      payload: e.message
    })
  }
}

// Edit a forum post
export const editForumPost = (body, id) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  try {
    const res = await axios.put(`/api/forumposts/${id}`, JSON.stringify({ body }), config)

    dispatch({
      type: EDIT_FORUM_POST,
      payload: res.data
    })
  } catch (e) {
    console.warn(e.message)

    dispatch({
      type: FORUM_ERROR,
      payload: e.message
    })
  }
}

export const saveForumPost = (id) => async dispatch => {
  try {
    const res = await axios.put(`/api/forumposts/save/${id}`)
    dispatch({
      type: SAVE_FORUM_POST,
      payload: res.data
    })
    dispatch(getAllForumPosts())
  } catch (e) {
    console.warn(e.message)
    dispatch({
      type: FORUM_ERROR,
      payload: e.message
    })
  }
};

// Dismiss a forum post
export const forumPostDismiss = (id, dismissedPosts) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  try {
    const res = await axios.put(
      `/api/forumposts/${id}/dismiss`,
      JSON.stringify({ dismissedPosts }),
      config
    )

    dispatch({
      type: FORUM_POST_DISMISS,
      payload: res.data
    })
  } catch (e) {
    dispatch({ type: FORUM_ERROR, payload: e.message })
  }
}

// Comment on a post
export const forumPostAddComment = ({ content }, id) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  try {
    const res = await axios.post(`/api/forumposts/comment/${id}`, JSON.stringify({ content }), config)

    dispatch({
      type: FORUM_POST_ADD_COMMENT,
      payload: res.data
    })
  } catch (e) {
    console.warn(e.message)

    dispatch({
      type: FORUM_ERROR,
      payload: e.message
    })
  }
}

// Delete comment
export const forumPostDeleteComment = (id, comment_id) => async dispatch => {
  try {
    await axios.delete(`/api/forumposts/comment/${id}/${comment_id}`)

    dispatch({
      type: FORUM_POST_DELETE_COMMENT,
      payload: comment_id
    })
    dispatch(forumPostGetComments(comment_id))
  } catch (e) {
    console.warn(e.message)

    dispatch({ type: FORUM_ERROR, payload: e.message })
  }
}

// Get all comments of a post
export const forumPostGetComments = (id) => async dispatch => {
  try {
    const res = await axios.get(`/api/forumposts/comment/${id}`)

    dispatch({
      type: FORUM_POST_GET_COMMENTS,
      payload: res.data
    })
  } catch (e) {
    console.warn(e.message)

    dispatch({ type: FORUM_ERROR, payload: e.message })
  }
};

// Edit a forum comment
export const forumPostEditComment = (id, comment_id, content) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  try {
    const res = await axios.put(`/api/forumposts/comment/${id}/${comment_id}`, JSON.stringify({ content }), config)
    await console.log(res.data);
    dispatch({
      type: FORUM_POST_EDIT_COMMENT,
      payload: res.data
    })
    dispatch(forumPostGetComments(id))
  } catch (e) {
    console.warn(e.message)
    dispatch({ type: FORUM_ERROR, payload: e.message })
  }
};

export const forumPostReplyToComment = (id, comment_id, content) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  try {
    const res = await axios.post(`/api/forumposts/comment/${id}/${comment_id}/reply`, JSON.stringify({ content }), config)
    dispatch({
      type: FORUM_POST_ADD_REPLY,
      payload: {
        comment_id,
        item: res.data
      }
    })
  } catch (e) {
    console.warn(e.message)
    dispatch({ type: FORUM_ERROR, payload: e.message })
  }
};

export const forumPostDeleteReplyToComment = (id, comment_id, reply_id) => async dispatch => {
  try {
    await axios.delete(`/api/forumposts/comment/${id}/${comment_id}/${reply_id}`)
    const payload = {
      comment_id,
      reply_id
    }
    dispatch({
      type: FORUM_POST_DELETE_REPLY,
      payload
    })
  } catch (e) {
    console.warn(e.message)
    dispatch({ type: FORUM_ERROR, payload: e.message })
  }
};

export const forumPostEditReplyToComment = (id, comment_id, reply_id, replyText) => async dispatch => {
  const config = { headers: { 'Content-Type': 'application/json' } }
  try {
    const res = await axios.put(`/api/forumposts/comment/${id}/${comment_id}/${reply_id}`, JSON.stringify({ content: replyText }), config)
    await console.log(res.data);
    dispatch({
      type: FORUM_POST_EDIT_REPLY,
      payload: {
        comment_id,
        reply_id,
        item: res.data
      }
    })
  } catch (e) {
    console.warn(e.message)
    dispatch({ type: FORUM_ERROR, payload: e.message })
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
    const res = await axios.put(`/api/forumposts/${postId}/impulse`, body, config);
    dispatch({
      type: IMPULSIFY_FORUM_POST,
      payload: {
        impulsions: res.data.impulsions,
        endorsements: res.data.endorsements,
        judgements: res.data.judgements,
        id: postId,
      },
    });
  } catch (e) {
    dispatch({
      type: FORUM_ERROR,
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
    const res = await axios.put(`/api/forumposts/${postId}/like`, body, config);
    dispatch({
      type: LIKE_FORUM_POST,
      payload: {
        impulsions: res.data.impulsions,
        endorsements: res.data.endorsements,
        judgements: res.data.judgements,
        id: postId,
      },
    });
  } catch (e) {
    dispatch({
      type: FORUM_ERROR,
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
    const res = await axios.put(`/api/forumposts/${postId}/dislike`, body, config);
    dispatch({
      type: DISLIKE_FORUM_POST,
      payload: {
        impulsions: res.data.impulsions,
        endorsements: res.data.endorsements,
        judgements: res.data.judgements,
        id: postId,
      },
    });
  } catch (e) {
    dispatch({
      type: FORUM_ERROR,
      payload: { msg: e.message },
    });
  }
};

export const impulsifyForumPostComment = (id, commentId, likerId) => async (dispatch) => {
  const body = JSON.stringify({ likerId })
  const config = { headers: { "Content-Type": "application/json" } }
  try {
    const res = await axios.put(`/api/forumposts/${id}/${commentId}/impulse`, body, config)
    dispatch({
      type: IMPULSIFY_FORUM_POST_COMMENT,
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
      type: FORUM_ERROR,
      payload: { msg: e.message },
    });
  }
}
export const likeForumPostComment = (id, commentId, likerId) => async (dispatch) => {
  const body = JSON.stringify({ likerId })
  const config = { headers: { "Content-Type": "application/json" } }
  try {
    const res = await axios.put(`/api/forumposts/${id}/${commentId}/like`, body, config)
    await console.log("REZDEJTA", res.data);
    dispatch({
      type: LIKE_FORUM_POST_COMMENT,
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
      type: FORUM_ERROR,
      payload: { msg: e.message },
    });
  }
}
export const dislikeForumPostComment = (id, commentId, likerId) => async (dispatch) => {
  const body = JSON.stringify({ likerId })
  const config = { headers: { "Content-Type": "application/json" } }
  try {
    const res = await axios.put(`/api/forumposts/${id}/${commentId}/dislike`, body, config)
    dispatch({
      type: DISLIKE_FORUM_POST_COMMENT,
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
      type: FORUM_ERROR,
      payload: { msg: e.message },
    });
  }
}

export const impulsifyReplyToForumPostComment = (id, commentId, replyId, likerId) => async (dispatch) => {
  const body = JSON.stringify({ likerId })
  const config = { headers: { "Content-Type": "application/json" } }
  try {
    const res = await axios.put(`/api/forumposts/${id}/${commentId}/${replyId}/impulse`, body, config)
    dispatch({
      type: IMPULSIFY_FORUM_POST_COMMENT_REPLY,
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
      type: FORUM_ERROR,
      payload: { msg: e.message },
    });
  }
}
export const likeReplyToForumPostComment = (id, commentId, replyId, likerId) => async (dispatch) => {
  const body = JSON.stringify({ likerId })
  const config = { headers: { "Content-Type": "application/json" } }
  try {
    const res = await axios.put(`/api/forumposts/${id}/${commentId}/${replyId}/like`, body, config)
    dispatch({
      type: LIKE_FORUM_POST_COMMENT_REPLY,
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
      type: FORUM_ERROR,
      payload: { msg: e.message },
    });
  }
}
export const dislikeReplyToForumPostComment = (id, commentId, replyId, likerId) => async (dispatch) => {
  const body = JSON.stringify({ likerId })
  const config = { headers: { "Content-Type": "application/json" } }
  try {
    const res = await axios.put(`/api/forumposts/${id}/${commentId}/${replyId}/dislike`, body, config)
    dispatch({
      type: DISLIKE_FORUM_POST_COMMENT_REPLY,
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
      type: FORUM_ERROR,
      payload: { msg: e.message },
    });
  }
}

import axios from 'axios'
import {
  CREATE_FORUM_POST,
  GET_ALL_FORUM_POSTS,
  GET_FORUM_POST_BY_ID,
  DELETE_FORUM_POST_SUCCESS,
  EDIT_FORUM_POST,
  FORUM_POST_ADD_COMMENT,
  FORUM_POST_DELETE_COMMENT,
  FORUM_POST_DISMISS,
  FORUM_ERROR
} from './types'

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
    console.log(`%c ${e}`, 'color: white; font-weight: bold') // Console warning

    dispatch({
      type: FORUM_ERROR
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
      type: FORUM_ERROR
    })
  }
}

// Get forum post by id
export const getForumPostById = id => async dispatch => {
  try {
    const res = await axios.get(`/api/forumposts/${id}`)

    dispatch({
      type: GET_FORUM_POST_BY_ID,
      payload: res.data
    })
  } catch (e) {
    console.warn(e.message)

    dispatch({
      type: FORUM_ERROR
    })
  }
}

// Delete a forum post
export const deleteForumPost = id => async dispatch => {
  try {
    await axios.delete(`/api/forumposts/${id}`)

    dispatch({
      type: DELETE_FORUM_POST_SUCCESS
    })
  } catch (e) {
    console.warn(e.message)

    dispatch({
      type: FORUM_ERROR
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
    const res = await axios.put(
      `/api/forumposts/${id}`,
      JSON.stringify({ body }),
      config
    )

    dispatch({
      type: EDIT_FORUM_POST,
      payload: res.data
    })
  } catch (e) {
    console.warn(e.message)

    dispatch({
      type: FORUM_ERROR
    })
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
    const res = await axios.post(
      `/api/forumposts/comment/${id}`,
      JSON.stringify({ content }),
      config
    )

    dispatch({
      type: FORUM_POST_ADD_COMMENT,
      payload: res.data
    })
  } catch (e) {
    console.warn(e.message)

    dispatch({
      type: FORUM_ERROR
    })
  }
}

// Delete comment
export const forumPostDeleteComment = (id, comment_id) => async dispatch => {
  try {
    await axios.delete(`/api/forumposts/${id}/${comment_id}`)

    dispatch({
      type: FORUM_POST_DELETE_COMMENT
    })
  } catch (e) {
    console.warn(e.message)

    dispatch({ type: FORUM_ERROR })
  }
}

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
    dispatch({ type: FORUM_ERROR })
  }
}

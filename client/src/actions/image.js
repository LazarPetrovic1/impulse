import axios from 'axios'
import {
  CREATE_IMAGE,
  GET_IMAGES,
  // eslint-disable-next-line
  DELETE_IMAGE,
  IMAGE_ERROR,
  WIPE_IMAGES,
  LIKE_IMAGE,
  DISLIKE_IMAGE,
  IMPULSIFY_IMAGE
} from './types'

export const wipeImages = () => async dispatch => dispatch({ type: WIPE_IMAGES })

export const getImages = (id, page, limit) => async dispatch => {
  try {
    const res = await axios.get(`/api/imageposts/${id}?page=${page}&limit=${limit}`)
    dispatch({
      type: GET_IMAGES,
      payload: res.data.results
    })
    return res.data.next.hasMore
  } catch (e) {
    dispatch({
      type: IMAGE_ERROR,
      payload: { msg: e.message }
    })
  }
}

export const createImage = (base64EncodedImage, content) => async dispatch => {
  try {
    const body = JSON.stringify({ data: base64EncodedImage, content })
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    }
    const res = await axios.post('/api/imageposts/', body, config)
    dispatch({
      type: CREATE_IMAGE,
      payload: res.data
    })
  } catch (e) {
    dispatch({
      type: IMAGE_ERROR,
      payload: { msg: e.message }
    })
  }
}

export const addComment = ({ id, text, ownedById }) => async dispatch => {
  try {
    const body = JSON.stringify({ text })
    const config = { headers: { "Content-Type": "application/json" } }
    await axios.post(`/api/imageposts/comment/${id}`, body, config)
    const res = await axios.get(`/api/imageposts/${ownedById}`)
    dispatch({
      type: GET_IMAGES,
      payload: res.data
    })
  } catch (e) {
    dispatch({
      type: IMAGE_ERROR,
      payload: { msg: e.message }
    })
  }
}

export const impulsify = (postId, ownedById, likerId) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    }
    const body = JSON.stringify({ likerId })
    const res = await axios.put(`/api/imageposts/impulse/${postId}`, body, config)
    dispatch({
      type: IMPULSIFY_IMAGE,
      payload: { impulsions: res.data, id: postId }
    })
  } catch (e) {
    dispatch({
      type: IMAGE_ERROR,
      payload: { msg: e.message }
    })
  }
};

export const like = (postId, ownedById, likerId) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    }
    const body = JSON.stringify({ likerId })
    const res = await axios.put(`/api/imageposts/like/${postId}`, body, config)
    dispatch({
      type: LIKE_IMAGE,
      payload: { endorsements: res.data, id: postId }
    })
  } catch (e) {
    dispatch({
      type: IMAGE_ERROR,
      payload: { msg: e.message }
    })
  }
};

export const dislike = (postId, ownedById, likerId) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    }
    const body = JSON.stringify({ likerId })
    const res = await axios.put(`/api/imageposts/dislike/${postId}`, body, config)
    dispatch({
      type: DISLIKE_IMAGE,
      payload: { judgements: res.data, id: postId }
    })
  } catch (e) {
    dispatch({
      type: IMAGE_ERROR,
      payload: { msg: e.message }
    })
  }
};

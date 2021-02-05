import axios from 'axios'
import {
  CREATE_IMAGE,
  GET_IMAGES,
  // eslint-disable-next-line
  DELETE_IMAGE,
  IMAGE_ERROR,
} from './types'

export const getImages = (id) => async dispatch => {
  try {
    const res = await axios.get(`/api/imageposts/${id}`)
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

export const createImage = (base64EncodedImage, content) => async (dispatch, getState) => {
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
    const res = await axios.get(`api/imageposts/${ownedById}`)
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

export const like = (postId, ownedById) => async dispatch => {
  try {
    await axios.put(`/api/imageposts/like/${postId}`)
    const res = await axios.get(`api/imageposts/${ownedById}`)
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
};

export const dislike = (postId, ownedById) => async dispatch => {
  try {
    await axios.put(`/api/imageposts/dislike/${postId}`)
    const res = await axios.get(`api/imageposts/${ownedById}`)
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
};

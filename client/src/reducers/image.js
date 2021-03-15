import {
  CREATE_IMAGE,
  GET_IMAGES,
  DELETE_IMAGE,
  IMAGE_ERROR,
  WIPE_IMAGES,
  LIKE_IMAGE,
  DISLIKE_IMAGE,
  IMPULSIFY_IMAGE
} from '../actions/types';

const initialState = {
  images: [],
  image: null,
  error: null,
  loading: true
}

export default (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case WIPE_IMAGES:
      return initialState
    case CREATE_IMAGE:
      return {
        ...state,
        loading: false,
        images: [...state.images, payload]
      }
    case GET_IMAGES:
      return {
        ...state,
        loading: false,
        images: [...state.images, ...payload]
      }
    case DELETE_IMAGE:
      return {
        ...state,
        loading: false,
        images: state.images.filter(img => img._id !== payload)
      }
    case LIKE_IMAGE:
      return {
        ...state,
        loading: false,
        images: state.images.map(img => img._id === payload.id ? {
          ...img,
          endorsements: payload.endorsements
        } : img)
      }
    case DISLIKE_IMAGE:
      return {
        ...state,
        loading: false,
        images: state.images.map(img => img._id === payload.id ? {
          ...img,
          judgements: payload.judgements
        } : img)
      }
    case IMPULSIFY_IMAGE:
      return {
        ...state,
        loading: false,
        images: state.images.map(img => img._id === payload.id ? {
          ...img,
          impulsions: payload.impulsions
        } : img)
      }
    case IMAGE_ERROR:
      return {
        ...state,
        loading: false,
        error: payload
      }
    default:
      return state
  }
};

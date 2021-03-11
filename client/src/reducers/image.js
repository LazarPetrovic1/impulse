import {
  CREATE_IMAGE,
  GET_IMAGES,
  DELETE_IMAGE,
  IMAGE_ERROR,
  WIPE_IMAGES
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

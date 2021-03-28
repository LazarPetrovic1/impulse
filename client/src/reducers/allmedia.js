import {
  GET_ALL_MY_MEDIA,
  SET_BULK_MEDIA,
  ALL_MEDIA_ERROR,
  WIPE_ALL_MEDIA
} from "../actions/types";

const initialState = {
  media: [],
  loading: true,
  error: null
}

export default (state = initialState, action) => {
  const {
    type,
    payload
  } = action
  switch (type) {
    case GET_ALL_MY_MEDIA:
      return {
        ...state,
        media: state.media.length < 1 ? payload :  [...state.media, ...payload],
        loading: false
      }
    case WIPE_ALL_MEDIA:
      return {
        ...state,
        media: []
      }
    case SET_BULK_MEDIA:
      return {
        ...state,
        media: [...state.media, ...payload]
      }
    case ALL_MEDIA_ERROR:
      return {
        ...state,
        error: payload,
          loading: false
      }
    default:
      return state
  }
};

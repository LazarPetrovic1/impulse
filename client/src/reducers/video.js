import {
  GET_VIDEOS,
  GET_VIDEO,
  // CREATE_VIDEO,
  VIDEO_DELETE_COMMENT,
  VIDEO_ERROR,
  VIDEO_COMMENT,
  VIDEO_ADD_REPLY,
  VIDEO_EDIT_REPLY,
  VIDEO_DELETE_REPLY,
  VIDEO_EDIT_COMMENT,
  VIDEO_GET_COMMENTS
} from '../actions/types';

const initialState = {
  videos: [],
  video: null,
  error: null,
  loading: true
}

export default (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case GET_VIDEOS:
      return {
        ...state,
        loading: false,
        videos: payload
      }
    case GET_VIDEO:
      return {
        ...state,
        loading: false,
        video: payload
      }
    case VIDEO_GET_COMMENTS:
    case VIDEO_COMMENT:
      return {
        ...state,
        loading: false,
        video: {
          ...state.video,
          comments: payload
        }
      }
    case VIDEO_DELETE_COMMENT:
      return {
        ...state,
        loading: false,
        video: {
          ...state.video,
          comments: state.video.comments.filter(comm => comm._id !== payload)
        }
      }
    case VIDEO_EDIT_COMMENT:
    case VIDEO_ADD_REPLY:
    case VIDEO_EDIT_REPLY:
      return {
        ...state,
        loading: false,
        video: {
          ...state.video,
          comments: state.video.comments.map(comm =>
            comm._id === payload.id ? { ...payload } : comm
          )
        }
      }
    case VIDEO_DELETE_REPLY:
      return {
        ...state,
        video: {
          ...state.video,
          comments: state.video.comments.map(
            comm => comm._id === payload.comment_id ? {
              ...comm,
              replies: comm.replies.filter(rep => rep._id !== payload.reply_id)
            } : comm
          )
        }
      }
    case VIDEO_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      }
    default:
      return state
  }
};

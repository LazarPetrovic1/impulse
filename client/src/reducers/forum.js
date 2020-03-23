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
} from '../actions/types'

const initialState = {
  posts: [],
  loading: true,
  error: null,
  post: null
}

export default (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case CREATE_FORUM_POST:
      return {
        ...state,
        loading: false,
        posts: [...state.posts, payload]
      }
    case GET_ALL_FORUM_POSTS:
      return {
        ...state,
        loading: false,
        posts: payload
      }
    case GET_FORUM_POST_BY_ID:
      return {
        ...state,
        loading: false,
        // post: state.posts.filter(post => post._id.toString() === payload.id.toString()),
        post: payload
      }
    case DELETE_FORUM_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        post: null,
        posts: null
      }
    case EDIT_FORUM_POST:
      return {
        ...state,
        loading: false,
        posts: state.posts.map(post =>
          post._id === payload.id ? { ...payload } : post
        )
      }
    case FORUM_POST_ADD_COMMENT:
      return {
        ...state,
        loading: false,
        post: { ...state.post, comments: payload }
      }
    case FORUM_POST_DELETE_COMMENT:
      return {
        ...state,
        loading: false,
        post: {
          ...state.post,
          comments: state.post.comments.filter(
            comment => comment._id !== payload
          )
        }
      }
    case FORUM_POST_DISMISS:
      return {
        ...state,
        loading: false,
        post: {
          ...state.post,
          isDismissed: payload.isDismissed
        }
      }
    case FORUM_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      }
    default:
      return state
  }
}

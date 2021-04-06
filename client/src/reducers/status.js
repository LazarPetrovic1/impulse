import {
  CREATE_STATUS,
  GET_ALL_STATUSES,
  GET_MY_STATUSES,
  GET_PERSONS_STATUSES,
  DELETE_STATUS,
  EDIT_STATUS,
  ADD_COMMENT_TO_STATUS,
  GET_COMMENTS_OF_STATUS,
  EDIT_COMMENT_OF_STATUS,
  DELETE_COMMENT_OF_STATUS,
  REPLY_TO_COMMENT_OF_STATUS,
  EDIT_REPLY_TO_COMMENT_OF_STATUS,
  GET_ALL_REPLIES_TO_COMMENT_OF_STATUS,
  DELETE_REPLY_TO_COMMENT_OF_STATUS,
  STATUS_ERROR,
} from "../actions/types";

const initialState = {
  statuses: [],
  // status: null,
  error: null,
  loading: false,
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case CREATE_STATUS:
      return {
        ...state,
        loading: false,
        statuses: [...state.statuses, payload],
      };
    case GET_PERSONS_STATUSES:
    case GET_MY_STATUSES:
    case GET_ALL_STATUSES:
      return {
        ...state,
        loading: false,
        statuses: payload,
      };
    case DELETE_STATUS:
      return {
        ...state,
        loading: false,
        statuses: state.statuses.filter((stat) => stat._id !== payload),
      };
    case ADD_COMMENT_TO_STATUS:
    case EDIT_STATUS:
      return {
        ...state,
        loading: false,
        statuses: state.statuses.map((stat) =>
          stat._id === payload._id ? payload : stat
        ),
      };
    case GET_COMMENTS_OF_STATUS:
      return {
        ...state,
        loading: false,
        statuses: state.statuses.map((stat) =>
          stat._id === payload[0] ? { ...stat, comments: payload[1] } : stat
        ),
      };
    case EDIT_COMMENT_OF_STATUS:
      return {
        ...state,
        loading: false,
        statuses: state.statuses.map((stat) =>
          stat._id === payload[0]
            ? {
                ...stat,
                comments: stat.comments.map((comm) =>
                  comm._id === payload[1] ? comm : payload[2]
                ),
              }
            : stat
        ),
      };
    case DELETE_COMMENT_OF_STATUS:
      return {
        ...state,
        loading: false,
        statuses: state.statuses.map((stat) =>
          stat._id === payload[0]
            ? {
                ...stat,
                comments: stat.comments.filter(
                  (comm) => comm._id !== payload[1]
                ),
              }
            : stat
        ),
      };
    case REPLY_TO_COMMENT_OF_STATUS:
      return {
        ...state,
        loading: false,
        statuses: state.statuses.map((stat) =>
          stat._id === payload[0]
            ? {
                ...stat,
                comments: stat.comments.map((comm) =>
                  comm._id === payload[1] ? payload[2] : comm
                ),
              }
            : stat
        ),
      };
    case EDIT_REPLY_TO_COMMENT_OF_STATUS:
      return {
        ...state,
        loading: false,
        statuses: state.statuses.map((stat) =>
          stat._id === payload[0]
            ? {
                ...stat,
                comments: stat.comments.map((comm) =>
                  comm._id === payload[1] ? payload[2] : comm
                ),
              }
            : stat
        ),
      };
    case GET_ALL_REPLIES_TO_COMMENT_OF_STATUS:
      return {
        ...state,
        loading: false,
        statuses: state.statuses.map((stat) =>
          stat._id === payload[0]
            ? {
                ...stat,
                comments: stat.comments.map((comm) =>
                  comm._id === payload[1]
                    ? { ...comm, replies: payload[2] }
                    : comm
                ),
              }
            : stat
        ),
      };
    case DELETE_REPLY_TO_COMMENT_OF_STATUS:
      return {
        ...state,
        loading: false,
        statuses: state.statuses.map((stat) =>
          stat._id === payload[0]
            ? {
                ...stat,
                comments: stat.comments.filter(
                  (comm) => comm._id !== payload[1]
                ),
              }
            : stat
        ),
      };
    case STATUS_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

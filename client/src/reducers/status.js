import {
  CREATE_STATUS,
  GET_ALL_STATUSES,
  GET_MY_STATUSES,
  GET_PERSONS_STATUSES,
  DELETE_STATUS,
  EDIT_STATUS,
  LIKE_STATUS,
  DISLIKE_STATUS,
  IMPULSIFY_STATUS,
  ADD_COMMENT_TO_STATUS,
  GET_COMMENTS_OF_STATUS,
  EDIT_COMMENT_OF_STATUS,
  DELETE_COMMENT_OF_STATUS,
  REPLY_TO_COMMENT_OF_STATUS,
  EDIT_REPLY_TO_COMMENT_OF_STATUS,
  GET_ALL_REPLIES_TO_COMMENT_OF_STATUS,
  DELETE_REPLY_TO_COMMENT_OF_STATUS,
  STATUS_ERROR,
  IMPULSIFY_STATUS_COMMENT,
  DISLIKE_STATUS_COMMENT,
  LIKE_STATUS_COMMENT,
  IMPULSIFY_STATUS_REPLY,
  LIKE_STATUS_REPLY,
  DISLIKE_STATUS_REPLY,
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
    case LIKE_STATUS:
    case DISLIKE_STATUS:
    case IMPULSIFY_STATUS:
      return {
        ...state,
        loading: false,
        statuses: state.statuses.map((stat) =>
          stat._id === payload.id
            ? {
                ...stat,
                endorsements: payload.endorsements,
                judgements: payload.judgements,
                impulsions: payload.impulsions,
              }
            : stat
        ),
      };
    case IMPULSIFY_STATUS_COMMENT:
    case DISLIKE_STATUS_COMMENT:
    case LIKE_STATUS_COMMENT:
      return {
        ...state,
        loading: false,
        statuses: state.statuses.map((stat) =>
          stat._id === payload.id
            ? {
                ...stat,
                comments: stat.comments.map(comm => comm._id === payload.commentId ? {
                  ...comm,
                  endorsements: payload.endorsements,
                  judgements: payload.judgements,
                  impulsions: payload.impulsions,
                } : comm)
              }
            : stat
        ),
      };
    case IMPULSIFY_STATUS_REPLY:
    case LIKE_STATUS_REPLY:
    case DISLIKE_STATUS_REPLY:
      return {
        ...state,
        loading: false,
        statuses: state.statuses.map((stat) =>
          stat._id === payload.id
            ? {
                ...stat,
                comments: stat.comments.map(comm => comm._id === payload.commentId ? {
                  ...comm,
                  replies: comm.replies.map(rep => rep._id === payload.replyId ? {
                    ...rep,
                    endorsements: payload.endorsements,
                    judgements: payload.judgements,
                    impulsions: payload.impulsions,
                  } : rep)
                } : comm)
              }
            : stat
        ),
      }
    case ADD_COMMENT_TO_STATUS:
      return {
        ...state,
        loading: false,
        statuses: state.statuses.map((stat) =>
          stat._id === payload.id
            ? { ...stat, comments: payload.items }
            : stat
        ),
      };
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
      // return {
      //   ...state,
      //   loading: false,
      //   statuses: state.statuses.map((stat) =>
      //     stat._id === payload[0]
      //       ? {
      //           ...stat,
      //           comments: stat.comments.map((comm) =>
      //             comm._id === payload[1] ? comm : payload[2]
      //           ),
      //         }
      //       : stat
      //   ),
      // };
      return {
        ...state,
        loading: false,
        statuses: state.statuses.map((stat) => stat._id === payload.id ? {
          ...stat,
          comments: stat.comments.map(comm => comm._id === payload.comment_id ? payload.item : comm)
        } : stat),
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
          stat._id === payload.id
            ? {
                ...stat,
                comments: stat.comments.map(
                  (comm) => comm._id === payload.comment_id ? {
                    ...comm,
                    replies: comm.replies.filter(rep => rep._id !== payload.reply_id)
                  } : comm
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

import {
  GET_VIDEOS,
  GET_VIDEO,
  // CREATE_VIDEO,
  VIDEO_DELETE_COMMENT,
  INCREMENT_VIEWS,
  VIDEO_ERROR,
  VIDEO_COMMENT,
  VIDEO_ADD_REPLY,
  VIDEO_EDIT_REPLY,
  VIDEO_DELETE_REPLY,
  LIKE_VIDEO,
  DISLIKE_VIDEO,
  IMPULSIFY_VIDEO,
  VIDEO_EDIT_COMMENT,
  VIDEO_GET_COMMENTS,
  VIDEO_SEARCH,
  // SAVE_VIDEO,
  // DISMISS_VIDEO,
  IMPULSIFY_VIDEO_COMMENT,
  DISLIKE_VIDEO_COMMENT,
  LIKE_VIDEO_COMMENT,
  IMPULSIFY_VIDEO_REPLY,
  LIKE_VIDEO_REPLY,
  DISLIKE_VIDEO_REPLY,
  GET_FULL_VIDEOS,
} from "../actions/types";

const initialState = {
  videos: [],
  video: null,
  error: null,
  loading: true,
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case INCREMENT_VIEWS:
      return {
        ...state,
        loading: false,
        videos: state.videos.map((vid) =>
          vid._id === payload.id
            ? {
                ...vid,
                views: payload.views,
              }
            : vid
        ),
        video: {
          ...state.video,
          views: payload.views,
        },
      };
    case GET_FULL_VIDEOS:
      return {
        ...state,
        loading: false,
        videos: payload,
      };
    case GET_VIDEOS:
      return {
        ...state,
        loading: false,
        videos: [...state.videos, ...payload],
      };
    case GET_VIDEO:
      return {
        ...state,
        loading: false,
        video: payload,
      };
    case VIDEO_GET_COMMENTS:
    case VIDEO_COMMENT:
      return {
        ...state,
        loading: false,
        video: {
          ...state.video,
          comments: payload,
        },
      };
    case LIKE_VIDEO:
    case DISLIKE_VIDEO:
    case IMPULSIFY_VIDEO:
      return {
        ...state,
        loading: false,
        video: {
          ...state.video,
          impulsions: payload.impulsions,
          endorsements: payload.endorsements,
          judgements: payload.judgements,
        },
      };
    case IMPULSIFY_VIDEO_COMMENT:
    case DISLIKE_VIDEO_COMMENT:
    case LIKE_VIDEO_COMMENT:
      return {
        ...state,
        loading: false,
        video: {
          ...state.video,
          comments: state.video.comments.map((comm) =>
            comm._id === payload.commentId
              ? {
                  ...comm,
                  impulsions: payload.impulsions,
                  endorsements: payload.endorsements,
                  judgements: payload.judgements,
                }
              : comm
          ),
        },
      };
    case IMPULSIFY_VIDEO_REPLY:
    case LIKE_VIDEO_REPLY:
    case DISLIKE_VIDEO_REPLY:
      return {
        ...state,
        loading: false,
        video: {
          ...state.video,
          comments: state.video.comments.map((comm) =>
            comm._id === payload.commentId
              ? {
                  ...comm,
                  replies: comm.replies.map((rep) =>
                    rep._id === payload.replyId
                      ? {
                          ...rep,
                          impulsions: payload.impulsions,
                          endorsements: payload.endorsements,
                          judgements: payload.judgements,
                        }
                      : rep
                  ),
                }
              : comm
          ),
        },
      };
    case VIDEO_DELETE_COMMENT:
      return {
        ...state,
        loading: false,
        video: {
          ...state.video,
          comments: state.video.comments.filter((comm) => comm._id !== payload),
        },
      };
    case VIDEO_EDIT_COMMENT:
    case VIDEO_ADD_REPLY:
    case VIDEO_EDIT_REPLY:
      return {
        ...state,
        loading: false,
        video: {
          ...state.video,
          comments: state.video.comments.map((comm) =>
            comm._id === payload.id ? { ...payload } : comm
          ),
        },
      };
    case VIDEO_DELETE_REPLY:
      return {
        ...state,
        video: {
          ...state.video,
          comments: state.video.comments.map((comm) =>
            comm._id === payload.comment_id
              ? {
                  ...comm,
                  replies: comm.replies.filter(
                    (rep) => rep._id !== payload.reply_id
                  ),
                }
              : comm
          ),
        },
      };
    case VIDEO_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case VIDEO_SEARCH:
      return {
        ...state,
        loading: false,
        videos: state.videos.filter((vid) => vid.name.includes(payload)),
      };
    default:
      return state;
  }
};

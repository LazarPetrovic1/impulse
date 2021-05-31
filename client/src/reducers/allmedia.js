import {
  GET_ALL_MY_MEDIA,
  SET_BULK_MEDIA,
  ALL_MEDIA_ERROR,
  WIPE_ALL_MEDIA,
  ALL_MEDIA_OUTSIDE_SPAWN,
  ALL_MEDIA_REMOVE,
  ALL_MEDIA_EDIT,
  ALL_MEDIA_OUTSIDE_STATCHANGE,
  ALL_MEDIA_OUTSIDE_SPAWN_COMMENT,
  ALL_MEDIA_OUTSIDE_COMMENT_REMOVE,
  ALL_MEDIA_OUTSIDE_COMMENT_EDIT,
  ALL_MEDIA_OUTSIDE_COMMENT_STATCHANGE,
  ALL_MEDIA_OUTSIDE_SPAWN_REPLY,
  ALL_MEDIA_OUTSIDE_REPLY_STATCHANGE,
  ALL_MEDIA_OUTSIDE_REPLY_REMOVE,
  ALL_MEDIA_OUTSIDE_REPLY_EDIT,
} from "../actions/types";

const initialState = {
  media: [],
  loading: true,
  error: null,
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_ALL_MY_MEDIA:
      return {
        ...state,
        media: state.media.length < 1 ? payload : [...state.media, ...payload],
        loading: false,
      };
    case WIPE_ALL_MEDIA:
      return {
        ...state,
        media: [],
      };
    case SET_BULK_MEDIA:
      return {
        ...state,
        media: [...state.media, ...payload],
      };
    case ALL_MEDIA_OUTSIDE_SPAWN:
      return {
        ...state,
        loading: false,
        media: [...state.media, payload.item],
      };
    case ALL_MEDIA_REMOVE:
      return {
        ...state,
        loading: false,
        media: state.media.filter((med) => med._id !== payload.id),
      };
    case ALL_MEDIA_EDIT:
      return {
        ...state,
        loading: false,
        media: state.media.map((med) =>
          med._id === payload.id ? payload.item : med
        ),
      };
    case ALL_MEDIA_OUTSIDE_STATCHANGE:
      return {
        ...state,
        loading: false,
        media: state.media.map((med) =>
          med._id === payload.id
            ? {
                ...med,
                impulsions: payload.impulsions,
                endorsements: payload.endorsements,
                judgements: payload.judgements,
              }
            : med
        ),
      };
    case ALL_MEDIA_OUTSIDE_SPAWN_COMMENT:
      return {
        ...state,
        loading: false,
        media: state.media.map((med) =>
          med._id === payload.id
            ? {
                ...med,
                comments: payload.item,
              }
            : med
        ),
      };
    case ALL_MEDIA_OUTSIDE_COMMENT_REMOVE:
      return {
        ...state,
        loading: false,
        media: state.media.map((med) =>
          med._id === payload.id
            ? {
                ...med,
                comments: med.comments.filter(
                  (comm) => comm._id !== payload.comment_id
                ),
              }
            : med
        ),
      };
    case ALL_MEDIA_OUTSIDE_COMMENT_EDIT:
      return {
        ...state,
        loading: false,
        media: state.media.map((med) =>
          med._id === payload.id
            ? {
                ...med,
                comments: med.comments.map((comm) =>
                  comm._id === payload.comment_id ? payload.item : comm
                ),
              }
            : med
        ),
      };
    case ALL_MEDIA_OUTSIDE_COMMENT_STATCHANGE:
      return {
        ...state,
        loading: false,
        media: state.media.map((med) =>
          med._id === payload.id
            ? {
                ...med,
                comments: med.comments.map((comm) =>
                  comm._id === payload.comment_id
                    ? {
                        ...comm,
                        impulsions: payload.impulsions,
                        endorsements: payload.endorsements,
                        judgements: payload.judgements,
                      }
                    : comm
                ),
              }
            : med
        ),
      };
    case ALL_MEDIA_OUTSIDE_SPAWN_REPLY:
      return {
        ...state,
        loading: false,
        media: state.media.map((med) =>
          med._id === payload.id
            ? {
                ...med,
                comments: med.comments.map((comm) =>
                  comm._id === payload.comment_id
                    ? {
                        ...comm,
                        replies: [...comm.replies, payload.item],
                      }
                    : comm
                ),
              }
            : med
        ),
      };
    case ALL_MEDIA_OUTSIDE_REPLY_STATCHANGE:
      return {
        ...state,
        loading: false,
        media: state.media.map((med) =>
          med._id === payload.id
            ? {
                ...med,
                comments: med.comments.map((comm) =>
                  comm._id === payload.comment_id
                    ? {
                        ...comm,
                        replies: comm.replies.map((rep) =>
                          rep._id === payload.reply_id
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
              }
            : med
        ),
      };
    case ALL_MEDIA_OUTSIDE_REPLY_REMOVE:
      return {
        ...state,
        loading: false,
        media: state.media.map((med) =>
          med._id === payload.id
            ? {
                ...med,
                comments: med.comments.map((comm) =>
                  comm._id === payload.comment_id
                    ? {
                        ...comm,
                        replies: comm.replies.filter(
                          (rep) => rep._id !== payload.reply_id
                        ),
                      }
                    : comm
                ),
              }
            : med
        ),
      };
    case ALL_MEDIA_OUTSIDE_REPLY_EDIT:
      return {
        ...state,
        loading: false,
        media: state.media.map((med) =>
          med._id === payload.id
            ? {
                ...med,
                comments: med.comments.map((comm) =>
                  comm._id === payload.comment_id
                    ? {
                        ...comm,
                        replies: comm.replies.map((rep) =>
                          rep._id === payload.reply_id ? payload.item : rep
                        ),
                      }
                    : comm
                ),
              }
            : med
        ),
      };
    case ALL_MEDIA_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
};

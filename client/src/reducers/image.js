import {
  CREATE_IMAGE,
  GET_IMAGES,
  DELETE_IMAGE,
  IMAGE_ERROR,
  WIPE_IMAGES,
  LIKE_IMAGE,
  DISLIKE_IMAGE,
  IMPULSIFY_IMAGE,
  // SAVE_IMAGE,
  IMPULSIFY_IMAGE_COMMENT,
  DISLIKE_IMAGE_COMMENT,
  LIKE_IMAGE_COMMENT,
  IMPULSIFY_IMAGE_REPLY,
  LIKE_IMAGE_REPLY,
  DISLIKE_IMAGE_REPLY
} from "../actions/types";

const initialState = {
  images: [],
  image: null,
  error: null,
  loading: true,
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case WIPE_IMAGES:
      return initialState;
    case CREATE_IMAGE:
      return {
        ...state,
        loading: false,
        images: [...state.images, payload],
      };
    case GET_IMAGES:
      return {
        ...state,
        loading: false,
        images: [...state.images, ...payload],
      };
    case DELETE_IMAGE:
      return {
        ...state,
        loading: false,
        images: state.images.filter((img) => img._id !== payload),
      };
    case LIKE_IMAGE:
    case DISLIKE_IMAGE:
    case IMPULSIFY_IMAGE:
      return {
        ...state,
        loading: false,
        images: state.images.map((img) =>
          img._id === payload.id
            ? {
                ...img,
                endorsements: payload.endorsements,
                judgements: payload.judgements,
                impulsions: payload.impulsions,
              }
            : img
        ),
      };
    case IMPULSIFY_IMAGE_COMMENT:
    case DISLIKE_IMAGE_COMMENT:
    case LIKE_IMAGE_COMMENT:
      return {
        ...state,
        images: state.images.map(img => img._id === payload.id ? {
          ...img, comments: img.comments.map(comm => comm._id === payload.commentId ? {
            ...comm,
            endorsements: payload.endorsements,
            judgements: payload.judgements,
            impulsions: payload.impulsions,
          } : comm)
        } : img)
      }
    case IMPULSIFY_IMAGE_REPLY:
    case LIKE_IMAGE_REPLY:
    case DISLIKE_IMAGE_REPLY:
      return {
        ...state,
        images: state.images.map(img => img._id === payload.id ? {
          ...img, comments: img.comments.map(comm => comm._id === payload.commentId ? {
            ...comm,
            replies: comm.replies.map(rep => rep._id === payload.replyId ? {
              ...rep,
              endorsements: payload.endorsements,
              judgements: payload.judgements,
              impulsions: payload.impulsions,
            } : rep)
          } : comm)
        } : img)
      }
    case IMAGE_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

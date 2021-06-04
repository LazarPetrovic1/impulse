import {
  CREATE_FORUM_POST,
  GET_ALL_FORUM_POSTS,
  GET_FORUM_POST_BY_ID,
  DELETE_FORUM_POST_SUCCESS,
  EDIT_FORUM_POST,
  SAVE_FORUM_POST,
  FORUM_POST_ADD_COMMENT,
  FORUM_POST_DELETE_COMMENT,
  FORUM_POST_DISMISS,
  FORUM_ERROR,
  FORUM_SEARCH,
  FORUM_POST_GET_COMMENTS,
  FORUM_POST_ADD_REPLY,
  FORUM_POST_EDIT_COMMENT,
  FORUM_POST_DELETE_REPLY,
  FORUM_POST_EDIT_REPLY,
  IMPULSIFY_FORUM_POST,
  LIKE_FORUM_POST,
  DISLIKE_FORUM_POST,
  IMPULSIFY_FORUM_POST_COMMENT,
  LIKE_FORUM_POST_COMMENT,
  DISLIKE_FORUM_POST_COMMENT,
  IMPULSIFY_FORUM_POST_COMMENT_REPLY,
  LIKE_FORUM_POST_COMMENT_REPLY,
  DISLIKE_FORUM_POST_COMMENT_REPLY,
} from "../actions/types";

const initialState = {
  posts: [],
  loading: true,
  error: null,
  post: null,
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case CREATE_FORUM_POST:
      return {
        ...state,
        loading: false,
        posts: [...state.posts, payload],
      };
    case SAVE_FORUM_POST:
      return {
        ...state,
        loading: false,
        posts: state.posts.filter((post) =>
          post._id === payload._id ? payload : post
        ),
      };
    case GET_ALL_FORUM_POSTS:
      return {
        ...state,
        loading: false,
        posts: payload,
      };
    case GET_FORUM_POST_BY_ID:
      return {
        ...state,
        loading: false,
        // post: state.posts.filter(post => post._id.toString() === payload.id.toString()),
        post: payload,
      };
    case DELETE_FORUM_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        post: null,
        posts: state.posts.filter((post) => post.id !== payload),
      };
    case EDIT_FORUM_POST:
      return {
        ...state,
        loading: false,
        posts: state.posts.map((post) =>
          post._id === payload.id ? { ...payload } : post
        ),
      };
    case IMPULSIFY_FORUM_POST:
    case LIKE_FORUM_POST:
    case DISLIKE_FORUM_POST:
      return {
        ...state,
        loading: false,
        post: {
          ...state.post,
          impulsions: payload.impulsions,
          judgements: payload.judgements,
          endorsements: payload.endorsements,
        },
        posts: state.posts.map((p) =>
          p._id === payload.id
            ? {
                ...p,
                impulsions: payload.impulsions,
                judgements: payload.judgements,
                endorsements: payload.endorsements,
              }
            : p
        ),
      };
    case FORUM_POST_ADD_COMMENT:
      return {
        ...state,
        loading: false,
        post: { ...state.post, comments: payload },
      };
    case FORUM_POST_DELETE_COMMENT:
      return {
        ...state,
        loading: false,
        post: {
          ...state.post,
          comments: state.post.comments.filter(
            (comment) => comment._id !== payload
          ),
        },
      };
    case FORUM_POST_DISMISS:
      return {
        ...state,
        loading: false,
        post: {
          ...state.post,
          isDismissed: payload.isDismissed,
        },
      };
    case FORUM_POST_GET_COMMENTS:
      return {
        ...state,
        loading: false,
        post: {
          ...state.post,
          comments: payload,
        },
      };
    case IMPULSIFY_FORUM_POST_COMMENT:
    case LIKE_FORUM_POST_COMMENT:
    case DISLIKE_FORUM_POST_COMMENT:
      return {
        ...state,
        loading: false,
        post: {
          ...state.post,
          comments: state.post.comments.map((comm) =>
            comm._id === payload.commentId
              ? {
                  ...comm,
                  impulsions: payload.impulsions,
                  judgements: payload.judgements,
                  endorsements: payload.endorsements,
                }
              : comm
          ),
        },
        posts: state.posts.map((p) =>
          p._id === payload.id
            ? {
                ...p,
                comments: p.comments.map((comm) =>
                  comm._id === payload.commentId
                    ? {
                        ...comm,
                        impulsions: payload.impulsions,
                        judgements: payload.judgements,
                        endorsements: payload.endorsements,
                      }
                    : comm
                ),
              }
            : p
        ),
      };
    case IMPULSIFY_FORUM_POST_COMMENT_REPLY:
    case LIKE_FORUM_POST_COMMENT_REPLY:
    case DISLIKE_FORUM_POST_COMMENT_REPLY:
      return {
        ...state,
        loading: false,
        post: {
          ...state.post,
          comments: state.post.comments.map((comm) =>
            comm._id === payload.commentId
              ? {
                  ...comm,
                  replies: comm.replies.map((rep) =>
                    rep._id === payload.replyId
                      ? {
                          ...rep,
                          impulsions: payload.impulsions,
                          judgements: payload.judgements,
                          endorsements: payload.endorsements,
                        }
                      : rep
                  ),
                }
              : comm
          ),
        },
        posts: state.posts.map((p) =>
          p._id === payload.id
            ? {
                ...p,
                comments: p.comments.map((comm) =>
                  comm._id === payload.commentId
                    ? {
                        ...comm,
                        replies: comm.replies.map((rep) =>
                          rep._id === payload.replyId
                            ? {
                                ...rep,
                                impulsions: payload.impulsions,
                                judgements: payload.judgements,
                                endorsements: payload.endorsements,
                              }
                            : rep
                        ),
                      }
                    : comm
                ),
              }
            : p
        ),
      };
    case FORUM_POST_EDIT_REPLY:
      return {
        ...state,
        loading: false,
        post: {
          ...state.post,
          comments: state.post.comments.map((comm) =>
            comm._id === payload.comment_id
              ? {
                  ...comm,
                  replies: comm.replies.map((rep) =>
                    rep._id === payload.reply_id ? payload.item : rep
                  ),
                }
              : comm
          ),
        },
      };
    case FORUM_POST_ADD_REPLY:
      return {
        ...state,
        loading: false,
        post: {
          ...state.post,
          comments: state.post.comments.map((comm) =>
            comm._id === payload.comment_id
              ? {
                  ...comm,
                  replies: [...comm.replies, payload.item],
                }
              : comm
          ),
        },
      };
    case FORUM_POST_EDIT_COMMENT:
      return {
        ...state,
        loading: false,
        post: {
          ...state.post,
          comments: state.post.comments.map((comm) =>
            comm._id === payload.id ? { ...payload } : comm
          ),
        },
      };
    case FORUM_POST_DELETE_REPLY:
      return {
        ...state,
        post: {
          ...state.post,
          comments: state.post.comments.map((comm) =>
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
    case FORUM_SEARCH:
      return {
        ...state,
        loading: false,
        posts: state.posts.filter(
          (p) =>
            p.title
              .toLowerCase()
              .includes(payload.toLowerCase()) /*|| p.body.includes(payload)*/
        ),
      };
    case FORUM_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
};

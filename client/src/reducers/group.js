import {
  // GET_GROUPS,
  ME_IN_GROUPS,
  GET_GROUP,
  CREATE_GROUP,
  DELETE_GROUP,
  DELETE_GROUP_POST,
  GROUP_ERROR,
  CREATE_GROUP_POST,
  GET_GROUP_POSTS,
  IMPULSE_POST_IN_GROUP,
  LIKE_POST_IN_GROUP,
  DISLIKE_POST_IN_GROUP,
  COMMENT_GROUP_POST,
  GET_COMMENTS_OF_GROUP_POST,
  UPDATE_GROUP_POST_COMMENT,
  DELETE_GROUP_POST_COMMENT,
  REPLY_TO_GROUP_POST_COMMENT,
  GET_REPLIES_TO_COMMENT_OF_GROUP_POST,
  UPDATE_GROUP_POST_REPLY,
  DELETE_GROUP_POST_REPLY,
  IMPULSIFY_GROUP_POST_COMMENT,
  DISLIKE_GROUP_POST_COMMENT,
  LIKE_GROUP_POST_COMMENT,
  IMPULSIFY_GROUP_POST_REPLY,
  LIKE_GROUP_POST_REPLY,
  DISLIKE_GROUP_POST_REPLY,
} from "../actions/types";

const initialState = {
  groups: [],
  group: null,
  loading: true,
  error: null,
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    // case GET_GROUPS:
    case ME_IN_GROUPS:
      return {
        ...state,
        groups: payload,
        loading: false,
      };
    case GET_GROUP:
      return {
        ...state,
        group: payload,
        loading: false,
      };
    case CREATE_GROUP:
      return {
        ...state,
        groups: [...state.groups, payload],
        group: payload,
        loading: false,
      };
    case IMPULSE_POST_IN_GROUP:
    case LIKE_POST_IN_GROUP:
    case DISLIKE_POST_IN_GROUP:
      return {
        ...state,
        loading: false,
        group: {
          ...state.group,
          posts: state.group.posts.map((post) =>
            post._id === payload.postId
              ? {
                  ...post,
                  impulsions: payload.impulsions,
                  endorsements: payload.endorsements,
                  judgements: payload.judgements,
                }
              : post
          ),
        },
      };
    case IMPULSIFY_GROUP_POST_COMMENT:
    case DISLIKE_GROUP_POST_COMMENT:
    case LIKE_GROUP_POST_COMMENT:
      return {
        ...state,
        loading: false,
        group: {
          ...state.group,
          posts: state.group.posts.map((post) =>
            post._id === payload.postId
              ? {
                  ...post,
                  comments: post.comments.map((comm) =>
                    comm._id === payload.commentId
                      ? {
                          ...comm,
                          impulsions: payload.impulsions,
                          endorsements: payload.endorsements,
                          judgements: payload.judgements,
                        }
                      : comm
                  ),
                }
              : post
          ),
        },
      };
    case IMPULSIFY_GROUP_POST_REPLY:
    case LIKE_GROUP_POST_REPLY:
    case DISLIKE_GROUP_POST_REPLY:
      return {
        ...state,
        loading: false,
        group: {
          ...state.group,
          posts: state.group.posts.map((post) =>
            post._id === payload.postId
              ? {
                  ...post,
                  comments: post.comments.map((comm) =>
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
                }
              : post
          ),
        },
      };
    case DELETE_GROUP:
      return {
        ...state,
        groups: state.groups.filter((gr) => gr._id !== payload),
        group: state.group._id === payload ? null : state.group,
        loading: false,
      };
    case DELETE_GROUP_POST:
      return {
        ...state,
        group: {
          ...state.group,
          posts: state.group.posts.filter((p) => p._id !== payload),
        },
        loading: false,
      };
    case CREATE_GROUP_POST:
      return {
        ...state,
        loading: false,
        group: {
          ...state.group,
          posts: [payload, ...state.group.posts],
        },
      };
    case GET_GROUP_POSTS:
      return {
        ...state,
        loading: false,
        group: {
          ...state.group,
          posts: [...state.group.posts, ...payload],
        },
      };
    case COMMENT_GROUP_POST:
      return {
        ...state,
        loading: false,
        group: {
          ...state.group,
          posts: state.group.posts.map((post) =>
            post._id === payload.postId
              ? {
                  ...post,
                  comments: payload.comments,
                }
              : post
          ),
        },
      };
    case GET_COMMENTS_OF_GROUP_POST:
      return {
        ...state,
        loading: false,
        group: {
          ...state.group,
          posts: state.group.posts.map((post) =>
            post._id === payload.postId
              ? {
                  ...post,
                  comments: [...post.comments, ...payload.comments],
                }
              : post
          ),
        },
      };
    case REPLY_TO_GROUP_POST_COMMENT:
    case UPDATE_GROUP_POST_COMMENT:
      return {
        ...state,
        loading: false,
        group: {
          ...state.group,
          posts: state.group.posts.map((post) =>
            post._id === payload.postId
              ? {
                  ...post,
                  comments: post.comments.map((comm) =>
                    comm._id === payload.commentId ? payload.comment : comm
                  ),
                }
              : post
          ),
        },
      };
    case GET_REPLIES_TO_COMMENT_OF_GROUP_POST:
      return {
        ...state,
        loading: false,
        group: {
          ...state.group,
          posts: state.group.posts.map((post) =>
            post._id === payload.postId
              ? {
                  ...post,
                  comments: post.comments.map((comm) =>
                    comm._id === payload.commentId
                      ? {
                          ...comm,
                          replies: [...comm.replies, ...payload.replies],
                        }
                      : comm
                  ),
                }
              : post
          ),
        },
      };
    case UPDATE_GROUP_POST_REPLY:
      return {
        ...state,
        loading: false,
        group: {
          ...state.group,
          posts: state.group.posts.map((post) =>
            post._id === payload.postId
              ? {
                  ...post,
                  comments: post.comments.map((comm) =>
                    comm._id === payload.commentId
                      ? {
                          ...comm,
                          replies: comm.replies.map((rep) =>
                            rep._id === payload.replyId ? payload.reply : rep
                          ),
                        }
                      : comm
                  ),
                }
              : post
          ),
        },
      };
    case DELETE_GROUP_POST_REPLY:
      return {
        ...state,
        loading: false,
        group: {
          ...state.group,
          posts: state.group.posts.map((post) =>
            post._id === payload.postId
              ? {
                  ...post,
                  comments: post.comments.map((comm) =>
                    comm._id === payload.commentId
                      ? {
                          ...comm,
                          replies: comm.replies.filter(
                            (rep) => rep._id !== payload.replyId
                          ),
                        }
                      : comm
                  ),
                }
              : post
          ),
        },
      };
    case DELETE_GROUP_POST_COMMENT:
      return {
        ...state,
        loading: false,
        group: {
          ...state.group,
          posts: state.group.posts.map((post) =>
            post._id === payload.postId
              ? {
                  ...post,
                  comments: post.comments.filter(
                    (comm) => comm._id !== payload.commentId
                  ),
                }
              : post
          ),
        },
      };
    case GROUP_ERROR:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
};

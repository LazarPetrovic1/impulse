import {
  // GET_GROUPS,
  ME_IN_GROUPS,
  GET_GROUP,
  CREATE_GROUP,
  DELETE_GROUP,
  DELETE_GROUP_POST,
  GROUP_ERROR,
  CREATE_GROUP_POST,
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
    case GROUP_ERROR:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
};

// Alerts
export const SET_ALERT = "SET_ALERT";
export const REMOVE_ALERT = "REMOVE_ALERT";
// Auth
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAIL = "REGISTER_FAIL";
export const AUTH_ERROR = "AUTH_ERROR";
export const USER_LOADED = "USER_LOADED";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const LOGOUT = "LOGOUT";
export const CLEAR_PROFILE = "CLEAR_PROFILE;";
export const ADD_PROFILE_IMAGE = "ADD_PROFILE_IMAGE";
export const PREMIUM_USER = "PREMIUM_USER";
export const BLOCK_PERSON = "BLOCK_PERSON";
export const UNBLOCK_PERSON = "UNBLOCK_PERSON";
export const UNFRIEND_PERSON = "UNFRIEND_PERSON";
export const SEND_FRIEND_REQUEST = "SEND_FRIEND_REQUEST";
export const CHANGE_PASSWORD = "CHANGE_PASSWORD";
// Profile
export const GET_PROFILE = "GET_PROFILE";
export const PROFILE_ERROR = "PROFILE_ERROR";
export const UPDATE_PROFILE = "UPDATE_PROFILE";
export const GET_PROFILES = "GET_PROFILES";
export const GET_REPOS = "GET_REPOS";
export const DELETE_ACCOUNT = "DELETE_ACCOUNT";
// Forum
export const CREATE_FORUM_POST = "CREATE_FORUM_POST";
export const FORUM_SEARCH = "FORUM_SEARCH";
export const GET_ALL_FORUM_POSTS = "GET_ALL_FORUM_POSTS";
export const GET_FORUM_POST_BY_ID = "GET_FORUM_POST_BY_ID";
export const DELETE_FORUM_POST_SUCCESS = "DELETE_FORUM_POST_SUCCESS";
export const DELETE_FORUM_POST_FAILURE = "DELETE_FORUM_POST_FAILURE";
export const EDIT_FORUM_POST = "EDIT_FORUM_POST";
export const SAVE_FORUM_POST = "SAVE_FORUM_POST";
export const IMPULSIFY_FORUM_POST = "IMPULSIFY_FORUM_POST";
export const LIKE_FORUM_POST = "LIKE_FORUM_POST";
export const DISLIKE_FORUM_POST = "DISLIKE_FORUM_POST";
export const FORUM_POST_ADD_COMMENT = "FORUM_POST_ADD_COMMENT";
export const FORUM_POST_EDIT_COMMENT = "FORUM_POST_EDIT_COMMENT";
export const FORUM_POST_GET_COMMENTS = "FORUM_POST_GET_COMMENTS";
export const FORUM_POST_DELETE_COMMENT = "FORUM_POST_DELETE_COMMENT";
export const IMPULSIFY_FORUM_POST_COMMENT = "IMPULSIFY_FORUM_POST_COMMENT";
export const LIKE_FORUM_POST_COMMENT = "LIKE_FORUM_POST_COMMENT";
export const DISLIKE_FORUM_POST_COMMENT = "DISLIKE_FORUM_POST_COMMENT";
export const FORUM_POST_ADD_REPLY = "FORUM_POST_ADD_REPLY";
export const FORUM_POST_GET_REPLIES = "FORUM_POST_GET_REPLIES";
export const FORUM_POST_GET_REPLY = "FORUM_POST_GET_REPLY";
export const FORUM_POST_EDIT_REPLY = "FORUM_POST_EDIT_REPLY";
export const FORUM_POST_DELETE_REPLY = "FORUM_POST_DELETE_REPLY";
export const IMPULSIFY_FORUM_POST_COMMENT_REPLY =
  "IMPULSIFY_FORUM_POST_COMMENT_REPLY";
export const LIKE_FORUM_POST_COMMENT_REPLY = "LIKE_FORUM_POST_COMMENT_REPLY";
export const DISLIKE_FORUM_POST_COMMENT_REPLY =
  "DISLIKE_FORUM_POST_COMMENT_REPLY";
export const FORUM_POST_DISMISS = "FORUM_POST_DISMISS";
export const FORUM_ERROR = "FORUM_ERROR";
// Images
export const CREATE_IMAGE = "CREATE_IMAGE";
export const LIKE_IMAGE = "LIKE_IMAGE";
export const DISLIKE_IMAGE = "DISLIKE_IMAGE";
export const IMPULSIFY_IMAGE = "IMPULSIFY_IMAGE";
export const GET_IMAGES = "GET_IMAGES";
export const DELETE_IMAGE = "DELETE_IMAGE";
export const IMAGE_ERROR = "IMAGE_ERROR";
export const ADD_COMMENT = "ADD_COMMENT";
export const GET_IMAGE_COMMENTS = "GET_IMAGE_COMMENTS";
export const DELETE_COMMENT = "DELETE_COMMENT";
export const WIPE_IMAGES = "WIPE_IMAGES";
export const SAVE_IMAGE = "SAVE_IMAGE";
export const IMPULSIFY_IMAGE_COMMENT = "IMPULSIFY_IMAGE_COMMENT";
export const DISLIKE_IMAGE_COMMENT = "DISLIKE_IMAGE_COMMENT";
export const LIKE_IMAGE_COMMENT = "LIKE_IMAGE_COMMENT";
export const IMPULSIFY_IMAGE_REPLY = "IMPULSIFY_IMAGE_REPLY";
export const LIKE_IMAGE_REPLY = "LIKE_IMAGE_REPLY";
export const DISLIKE_IMAGE_REPLY = "DISLIKE_IMAGE_REPLY";
export const IMAGE_POST_ADD_REPLY = "IMAGE_POST_ADD_REPLY";
export const IMAGE_POST_GET_REPLIES = "IMAGE_POST_GET_REPLIES";
export const EDIT_IMAGE_COMMENT = "EDIT_IMAGE_COMMENT";
export const EDIT_IMAGE_COMMENT_REPLY = "EDIT_IMAGE_COMMENT_REPLY";
export const DELETE_REPLY = "DELETE_REPLY";
// Videos
export const CREATE_VIDEO = "CREATE_VIDEO";
export const GET_VIDEOS = "GET_VIDEOS";
export const GET_FULL_VIDEOS = "GET_FULL_VIDEOS";
export const GET_VIDEO = "GET_VIDEO";
export const LIKE_VIDEO = "LIKE_VIDEO";
export const DISLIKE_VIDEO = "DISLIKE_VIDEO";
export const IMPULSIFY_VIDEO = "IMPULSIFY_VIDEO";
export const DELETE_VIDEO = "DELETE_VIDEO";
export const VIDEO_COMMENT = "VIDEO_COMMENT";
export const VIDEO_EDIT_COMMENT = "VIDEO_EDIT_COMMENT";
export const VIDEO_DELETE_COMMENT = "VIDEO_DELETE_COMMENT";
export const VIDEO_GET_COMMENTS = "VIDEO_GET_COMMENTS";
export const VIDEO_ADD_REPLY = "VIDEO_ADD_REPLY";
export const VIDEO_GET_REPLIES = "VIDEO_GET_REPLIES";
export const VIDEO_GET_REPLY = "VIDEO_GET_REPLY";
export const VIDEO_EDIT_REPLY = "VIDEO_EDIT_REPLY";
export const VIDEO_DELETE_REPLY = "VIDEO_DELETE_REPLY";
export const VIDEO_SEARCH = "VIDEO_SEARCH";
export const VIDEO_ERROR = "VIDEO_ERROR";
export const SAVE_VIDEO = "SAVE_VIDEO";
export const DISMISS_VIDEO = "DISMISS_VIDEO";
export const IMPULSIFY_VIDEO_COMMENT = "IMPULSIFY_VIDEO_COMMENT";
export const DISLIKE_VIDEO_COMMENT = "DISLIKE_VIDEO_COMMENT";
export const LIKE_VIDEO_COMMENT = "LIKE_VIDEO_COMMENT";
export const IMPULSIFY_VIDEO_REPLY = "IMPULSIFY_VIDEO_REPLY";
export const LIKE_VIDEO_REPLY = "LIKE_VIDEO_REPLY";
export const DISLIKE_VIDEO_REPLY = "DISLIKE_VIDEO_REPLY";
export const INCREMENT_VIEWS = "INCREMENT_VIEWS";
export const CLEAR_VIDEOS = "CLEAR_VIDEOS";
// All media
export const ALL_MEDIA_OUTSIDE_SPAWN = "ALL_MEDIA_OUTSIDE_SPAWN"; // CREATE
export const GET_ALL_MY_MEDIA = "GET_ALL_MY_MEDIA"; // GET MY MEDIA (*)
export const SET_BULK_MEDIA = "SET_BULK_MEDIA";
export const WIPE_ALL_MEDIA = "WIPE_ALL_MEDIA"; // REMOVE * MEDIA
export const ALL_MEDIA_REMOVE = "ALL_MEDIA_REMOVE"; // REMOVE ITEM
export const ALL_MEDIA_EDIT = "ALL_MEDIA_EDIT"; // EDIT ITEM
export const ALL_MEDIA_OUTSIDE_STATCHANGE = "ALL_MEDIA_OUTSIDE_STATCHANGE"; // LIKE | DISS | IMP
export const ALL_MEDIA_OUTSIDE_SPAWN_COMMENT =
  "ALL_MEDIA_OUTSIDE_SPAWN_COMMENT"; // COMMENT ADD
export const ALL_MEDIA_OUTSIDE_COMMENT_REMOVE =
  "ALL_MEDIA_OUTSIDE_COMMENT_REMOVE"; // COMMENT DELETE
export const ALL_MEDIA_OUTSIDE_COMMENT_EDIT = "ALL_MEDIA_OUTSIDE_COMMENT_EDIT"; // COMMENT EDIT
export const ALL_MEDIA_OUTSIDE_SPAWN_REPLY = "ALL_MEDIA_OUTSIDE_SPAWN_REPLY"; // REPLY ADD
export const ALL_MEDIA_OUTSIDE_SPAWN_REPLY_VIDEO =
  "ALL_MEDIA_OUTSIDE_SPAWN_REPLY_VIDEO"; // REPLY ADD
export const ALL_MEDIA_OUTSIDE_REPLY_REMOVE = "ALL_MEDIA_OUTSIDE_REPLY_REMOVE"; // REPLY DELETE
export const ALL_MEDIA_OUTSIDE_REPLY_EDIT = "ALL_MEDIA_OUTSIDE_REPLY_EDIT"; // REPLY EDIT
export const ALL_MEDIA_OUTSIDE_COMMENT_STATCHANGE =
  "ALL_MEDIA_OUTSIDE_COMMENT_STATCHANGE"; // LIKE | DISS | IMP > COMMENT
export const ALL_MEDIA_OUTSIDE_REPLY_STATCHANGE =
  "ALL_MEDIA_OUTSIDE_REPLY_STATCHANGE"; // LIKE | DISS | IMP > REPLY
export const ALL_MEDIA_ERROR = "ALL_MEDIA_ERROR"; // ERROR
// Notifications
export const GET_NOTIFS = "GET_NOTIFS";
export const GET_NOTIF = "GET_NOTIF";
export const NOTIF_ERROR = "NOTIF_ERROR";
export const POST_NOTIF = "POST_NOTIF";
// Groups
export const GET_GROUPS = "GET_GROUPS";
export const ME_IN_GROUPS = "ME_IN_GROUPS";
export const GET_GROUP = "GET_GROUP";
export const CREATE_GROUP = "CREATE_GROUP";
export const CREATE_GROUP_POST = "CREATE_GROUP_POST";
export const GET_GROUP_POSTS = "GET_GROUP_POSTS";
export const DELETE_GROUP_POST = "DELETE_GROUP_POST";
export const DELETE_GROUP = "DELETE_GROUP";
export const IMPULSE_POST_IN_GROUP = "IMPULSE_POST_IN_GROUP";
export const LIKE_POST_IN_GROUP = "LIKE_POST_IN_GROUP";
export const DISLIKE_POST_IN_GROUP = "DISLIKE_POST_IN_GROUP";
export const COMMENT_GROUP_POST = "COMMENT_GROUP_POST";
export const GET_COMMENTS_OF_GROUP_POST = "GET_COMMENTS_OF_GROUP_POST";
export const UPDATE_GROUP_POST_COMMENT = "UPDATE_GROUP_POST_COMMENT";
export const DELETE_GROUP_POST_COMMENT = "DELETE_GROUP_POST_COMMENT";
export const REPLY_TO_GROUP_POST_COMMENT = "REPLY_TO_GROUP_POST_COMMENT";
export const GET_REPLIES_TO_COMMENT_OF_GROUP_POST =
  "GET_REPLIES_TO_COMMENT_OF_GROUP_POST";
export const UPDATE_GROUP_POST_REPLY = "UPDATE_GROUP_POST_REPLY";
export const DELETE_GROUP_POST_REPLY = "DELETE_GROUP_POST_REPLY";
export const GROUP_ERROR = "GROUP_ERROR";
export const IMPULSIFY_GROUP_POST_COMMENT = "IMPULSIFY_GROUP_POST_COMMENT";
export const DISLIKE_GROUP_POST_COMMENT = "DISLIKE_GROUP_POST_COMMENT";
export const LIKE_GROUP_POST_COMMENT = "LIKE_GROUP_POST_COMMENT";
export const IMPULSIFY_GROUP_POST_REPLY = "IMPULSIFY_GROUP_POST_REPLY";
export const LIKE_GROUP_POST_REPLY = "LIKE_GROUP_POST_REPLY";
export const DISLIKE_GROUP_POST_REPLY = "DISLIKE_GROUP_POST_REPLY";
// Status
export const CREATE_STATUS = "CREATE_STATUS";
export const GET_ALL_STATUSES = "GET_ALL_STATUSES";
export const GET_MY_STATUSES = "GET_MY_STATUSES";
export const GET_PERSONS_STATUSES = "GET_PERSONS_STATUSES";
export const DELETE_STATUS = "DELETE_STATUS";
export const EDIT_STATUS = "EDIT_STATUS";
export const LIKE_STATUS = "LIKE_STATUS";
export const DISLIKE_STATUS = "DISLIKE_STATUS";
export const IMPULSIFY_STATUS = "IMPULSIFY_STATUS";
export const ADD_COMMENT_TO_STATUS = "ADD_COMMENT_TO_STATUS";
export const GET_COMMENTS_OF_STATUS = "GET_COMMENTS_OF_STATUS";
export const EDIT_COMMENT_OF_STATUS = "EDIT_COMMENT_OF_STATUS";
export const DELETE_COMMENT_OF_STATUS = "DELETE_COMMENT_OF_STATUS";
export const REPLY_TO_COMMENT_OF_STATUS = "REPLY_TO_COMMENT_OF_STATUS";
export const EDIT_REPLY_TO_COMMENT_OF_STATUS =
  "EDIT_REPLY_TO_COMMENT_OF_STATUS";
export const GET_ALL_REPLIES_TO_COMMENT_OF_STATUS =
  "GET_ALL_REPLIES_TO_COMMENT_OF_STATUS";
export const DELETE_REPLY_TO_COMMENT_OF_STATUS =
  "DELETE_REPLY_TO_COMMENT_OF_STATUS";
export const STATUS_ERROR = "STATUS_ERROR";
export const SAVE_STATUS = "SAVE_STATUS";
export const DISMISS_STATUS = "DISMISS_STATUS";
export const IMPULSIFY_STATUS_COMMENT = "IMPULSIFY_STATUS_COMMENT";
export const DISLIKE_STATUS_COMMENT = "DISLIKE_STATUS_COMMENT";
export const LIKE_STATUS_COMMENT = "LIKE_STATUS_COMMENT";
export const IMPULSIFY_STATUS_REPLY = "IMPULSIFY_STATUS_REPLY";
export const LIKE_STATUS_REPLY = "LIKE_STATUS_REPLY";
export const DISLIKE_STATUS_REPLY = "DISLIKE_STATUS_REPLY";

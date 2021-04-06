import axios from "axios";
import {
  GET_ALL_MY_MEDIA,
  SET_BULK_MEDIA,
  ALL_MEDIA_ERROR,
  WIPE_ALL_MEDIA,
} from "./types";

export const getAllUsersMedia = (id, page, limit) => async (dispatch) => {
  try {
    const res = await axios.get(
      `/api/allmedia/${id}?page=${page}&limit=${limit}`
    );
    const newData = await res.data.results;
    // .sort((a, b) => new Date(b.date) - new Date(a.date))
    dispatch({
      type: GET_ALL_MY_MEDIA,
      payload: newData,
    });
    return res.data.next.hasMore;
  } catch (e) {
    dispatch({
      type: ALL_MEDIA_ERROR,
      payload: e.message,
    });
    console.warn("Error, dude");
  }
};

export const wipeAllMedia = () => (dispatch) =>
  dispatch({ type: WIPE_ALL_MEDIA });

export const setBulkMedia = (payload) => (dispatch) =>
  dispatch({
    type: SET_BULK_MEDIA,
    payload,
  });

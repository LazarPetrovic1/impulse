import axios from "axios";

export const getUsersNotifs = async () => {
  try {
    const res = await axios.get(`/api/notifs`);
    return res.data.notifs;
  } catch (e) {
    console.warn(e.message);
  }
};

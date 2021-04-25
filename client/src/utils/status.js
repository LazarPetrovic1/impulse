import axios from "axios";

export const getStatusById = async (id) => {
  try {
    const res = await axios.get(`/api/status/status/${id}`);
    return res.data;
  } catch (e) {
    console.warn(e.message);
  }
};

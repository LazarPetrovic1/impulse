import axios from "axios";

export const getImageById = async (id) => {
  try {
    const res = await axios.get(`/api/imageposts/image/${id}`);
    return res.data;
  } catch (e) {
    console.warn(e.message);
  }
};

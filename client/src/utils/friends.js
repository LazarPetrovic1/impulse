import axios from "axios";

export const getFriendsMediaInBulk = async (friends, page, limit) => {
  const body = JSON.stringify({ friends });
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(
      `/api/allmedia/bulk?page=${page}&limit=${limit}`,
      body,
      config
    );
    return res.data;
  } catch (e) {
    console.warn(e.message);
  }
};

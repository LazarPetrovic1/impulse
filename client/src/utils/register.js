import axios from "axios";

export const checkfirststep = async (firstName, lastName, email) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({
    firstName,
    lastName,
    email,
  });
  try {
    const res = await axios.post("/api/checkregister/stepone", body, config);
    return res.data;
  } catch (e) {
    console.warn(e.message);
  }
};

export const checksecondstep = async (username, password) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({
    username,
    password,
  });
  try {
    const res = await axios.post("/api/checkregister/steptwo", body, config);
    return res.data;
  } catch (e) {
    console.warn(e.message);
  }
};

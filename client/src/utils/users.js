import axios from 'axios'

export const getUserById = async (id) => {
  try {
    const res = await axios.get(`/api/users/postedby/${id}`)
    return res.data
  } catch (e) {
    console.warn("Error, buddy", e.message);
  }
}

export const getUserByUsername = async (username) => {
  try {
    const res = await axios.get(`/api/users/uname/${username}`)
    return res.data
  } catch (e) {
    console.warn("Error, buddy", e.message);
  }
}

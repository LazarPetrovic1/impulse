import axios from 'axios'
// forum
const seeAllWhoImpulsedForumPost = async (id) => {
  try {
    const res = await axios.get(`/api/forumposts/${id}/impulse`)
    return res.data
  } catch (e) {
    console.warn(e.message);
  }
}
const seeAllWhoLikedForumPost = async (id) => {
  try {
    const res = await axios.get(`/api/forumposts/${id}/like`)
    return res.data
  } catch (e) {
    console.warn(e.message);
  }
}
const seeAllWhoDislikedForumPost = async (id) => {
  try {
    const res = await axios.get(`/api/forumposts/${id}/dislike`)
    return res.data
  } catch (e) {
    console.warn(e.message);
  }
}
// image
const seeAllWhoImpulsedImage = async (id) => {
  try {
    const res = await axios.get(`/api/imageposts/${id}/impulse`)
    return res.data
  } catch (e) {
    console.warn(e.message);
  }
}
const seeAllWhoLikedImage = async (id) => {
  try {
    const res = await axios.get(`/api/imageposts/${id}/like`)
    return res.data
  } catch (e) {
    console.warn(e.message);
  }
}
const seeAllWhoDislikedImage = async (id) => {
  try {
    const res = await axios.get(`/api/imageposts/${id}/dislike`)
    return res.data
  } catch (e) {
    console.warn(e.message);
  }
}
// group
const seeAllWhoImpulsedGroupPost = async (id, postId) => {
  try {
    const res = await axios.get(`/api/group/${id}/${postId}/impulse`)
    return res.data
  } catch (e) {
    console.warn(e.message);
  }
}
const seeAllWhoLikedGroupPost = async (id, postId) => {
  try {
    const res = await axios.get(`/api/group/${id}/${postId}/like`)
    return res.data
  } catch (e) {
    console.warn(e.message);
  }
}
const seeAllWhoDislikedGroupPost = async (id, postId) => {
  try {
    const res = await axios.get(`/api/group/${id}/${postId}/dislike`)
    return res.data
  } catch (e) {
    console.warn(e.message);
  }
}
// video
const seeAllWhoImpulsedVideo = async (id) => {
  try {
    const res = await axios.get(`/api/videoposts/${id}/impulse`)
    return res.data
  } catch (e) {
    console.warn(e.message);
  }
}
const seeAllWhoLikedVideo = async (id) => {
  try {
    const res = await axios.get(`/api/videoposts/${id}/like`)
    return res.data
  } catch (e) {
    console.warn(e.message);
  }
}
const seeAllWhoDislikedVideo = async (id) => {
  try {
    const res = await axios.get(`/api/videoposts/${id}/dislike`)
    return res.data
  } catch (e) {
    console.warn(e.message);
  }
}
// status
const seeAllWhoImpulsedStatus = async (id) => {
  try {
    const res = await axios.get(`/api/status/${id}/impulse`)
    return res.data
  } catch (e) {
    console.warn(e.message);
  }
}
const seeAllWhoLikedStatus = async (id) => {
  try {
    const res = await axios.get(`/api/status/${id}/like`)
    return res.data
  } catch (e) {
    console.warn(e.message);
  }
}
const seeAllWhoDislikedStatus = async (id) => {
  try {
    const res = await axios.get(`/api/status/${id}/dislike`)
    return res.data
  } catch (e) {
    console.warn(e.message);
  }
}

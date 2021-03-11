const getLastX = (arr, limit) => arr.slice(Math.max(arr.length - limit, 0))
const getFirstX = (arr, limit) => arr.slice(0, (arr.length - limit))
const dateSort = (a,b) => new Date(b.date) - new Date(a.date);

module.exports = { getLastX, getFirstX, dateSort };

const getLastX = (arr, limit) => arr.slice(Math.max(arr.length - limit, 0));
const getFirstX = (arr, limit) => arr.slice(0, arr.length - limit);
const dateSort = (a, b) => new Date(b.date) - new Date(a.date);
const uniqueArray = (arr) =>
  arr.filter((thing, index) => {
    const _thing = JSON.stringify(thing);
    return (
      index ===
      arr.findIndex((obj) => {
        return JSON.stringify(obj) === _thing;
      })
    );
  });
module.exports = { getLastX, getFirstX, dateSort, uniqueArray };

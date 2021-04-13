export const dateSort = (a, b) => new Date(b.date) - new Date(a.date);
export const arrayEquals = (a, b) =>
  Array.isArray(a) &&
  Array.isArray(b) &&
  a.length === b.length &&
  a.every((val, index) => val === b[index]);
export const handleProfileOverview = (arr, value) => {
  const index = arr.indexOf(value);
  if (index > -1) return arr.filter((val) => val !== value);
  return [...arr, value];
};

export const uniqueArray = (arr) =>
  arr.filter((thing, index) => {
    const _thing = JSON.stringify(thing);
    return (
      index ===
      arr.findIndex((obj) => {
        return JSON.stringify(obj) === _thing;
      })
    );
  });

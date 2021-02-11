const checker = (arr, target) => target.every(v => arr.includes(v)) && arr.length === target.length

module.exports = { checker };

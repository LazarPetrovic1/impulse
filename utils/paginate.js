async function paginate(model, findQuery, page, limit) {
  page = parseInt(page)
  limit = parseInt(limit)
  const startIndex = (page - 1) * limit
  const endIndex = page * limit
  const results = {}
  // await console.log("MADUL", model);
  try {
    const bigQuery = await model.find(findQuery).sort({ date: -1 })
    const hasMoreValue = endIndex < bigQuery.length
    if (endIndex < bigQuery.length) results.next = { page: page + 1, limit, hasMore: true }
    if (!hasMoreValue) results.next = { hasMore: false }
    results.results = await model.find(findQuery).skip(startIndex).limit(limit).sort({ date: -1 })
    return results
  } catch (e) {
    return { message: e.message }
  }
}

module.exports = paginate;

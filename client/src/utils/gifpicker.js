const GIPHY_API_KEY = "BevgqFZ1f3GvfGY8LAzIFZ4QMp5EFDcB"

export const searchGif = async (value, rating) => {
  try {
    const data = await fetch(`http://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${value}&limit=20&offset=0&rating=${rating}&lang=en`, { mode: "cors" })
    const res = await data.json()
    await console.log(res.data);
    return res.data.map(item => ({
      embed_url: item.embed_url,
      bitly_url: item.bitly_url,
      url: item.url,
      title: item.title,
      width: item.images.original.width,
      height: item.images.original.height
    }))
  } catch (e) {
    console.warn(e.message);
  }
}

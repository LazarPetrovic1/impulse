const ImagePost = require("../../models/ImagePost");
const VideoPost = require("../../models/VideoPost");
const Status = require("../../models/Status");
// const { uniqueArr } = require('../../utils/arr');

async function getUsersMedia(req, res) {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  try {
    const imageposts = await ImagePost.find({ user: req.params.id }).sort({
      date: -1,
    });
    const videoposts = await VideoPost.find({ user: req.params.id }).sort({
      date: -1,
    });
    const statusposts = await Status.find({ user: req.params.id }).sort({
      date: -1,
    });
    if (
      imageposts.length > 0 &&
      videoposts.length > 0 &&
      statusposts.length > 0
    ) {
      const posts = [...statusposts, ...imageposts, ...videoposts].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      const results = {};
      const hasMoreValue =
        endIndex <= posts.length && startIndex < posts.length;
      console.log({
        hasMoreValue,
        len: posts.length,
        endIndex,
      });
      if (hasMoreValue && startIndex < posts.length)
        results.next = {
          page: page + 1,
          limit,
          hasMore: true,
        };
      if (!hasMoreValue)
        results.next = {
          hasMore: false,
        };
      await console.log("*", {
        hasMoreValue,
        len: posts.length,
        startIndex,
        endIndex,
      });
      results.results = await posts.slice(startIndex, endIndex);
      res.json(results);
    } else {
      res.json({ msg: "Not found" });
    }
  } catch (e) {
    console.error(e.message);
    res.status(500).json({
      msg: "Internal server error.",
    });
  }
}

async function getMyMedia(req, res) {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const results = {};
  try {
    const imageposts = await ImagePost.find({
      user: req.user.id,
    }).sort({
      date: -1,
    });
    const videoposts = await VideoPost.find({
      user: req.user.id,
    }).sort({
      date: -1,
    });
    const statusposts = await Status.find({
      user: req.user.id,
    }).sort({
      date: -1,
    });
    const posts = [...statusposts, ...imageposts, ...videoposts];
    const hasMoreValue = endIndex < posts.length;
    if (endIndex < posts.length)
      results.next = {
        page: page + 1,
        limit,
        hasMore: true,
      };
    if (!hasMoreValue)
      results.next = {
        hasMore: false,
      };
    results.results = await posts.slice(startIndex, endIndex);
    res.json(results);
  } catch (e) {
    console.error(e.message);
    res.status(500).json({
      msg: "Internal server error.",
    });
  }
}

async function getMediaInBulk(req, res) {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const results = {};
  let posts = [];
  try {
    const friends = req.body.friends;
    for (const friend of friends) {
      const imageposts = await ImagePost.find({
        user: friend.user,
      }).sort({
        date: -1,
      });
      const videoposts = await VideoPost.find({
        user: friend.user,
      }).sort({
        date: -1,
      });
      const statusposts = await Status.find({
        user: friend.user,
      }).sort({
        date: -1,
      });
      posts = [...imageposts, ...videoposts, ...statusposts];
    }
    const hasMoreValue = endIndex < posts.length;
    if (endIndex < posts.length)
      results.next = {
        page: page + 1,
        limit,
        hasMore: true,
      };
    if (!hasMoreValue)
      results.next = {
        hasMore: false,
      };
    const newPosts = await Array.from(new Set(posts)).sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    results.results = await Array.from(new Set(newPosts)).slice(
      startIndex,
      endIndex
    );
    res.json(results);
  } catch (e) {
    console.error(e.message);
    res.status(500).json({
      msg: "Internal server error.",
    });
  }
}

const allmedia = {
  getUsersMedia,
  getMediaInBulk,
  getMyMedia,
};

module.exports = allmedia;

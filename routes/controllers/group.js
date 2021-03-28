const Group = require("../../models/Group");
const cloudinary = require("../../utils/cloudinary");

async function getAllGroups(req, res) {
  try {
    const groups = await Group.find();
    res.json(groups);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Internal server error.");
  }
}

async function getGroup(req, res) {
  try {
    const group = await Group.findById(req.params.id);
    res.json(group);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Internal server error.");
  }
}

async function meInGroups(req, res) {
  try {
    const groups = await Group.find({ people: req.user.id });
    res.json(groups);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Internal server error.");
  }
}

async function createGroup(req, res) {
  try {
    const fileStr = await req.body.data;
    const uploadResponse = await cloudinary.uploader.upload(fileStr);
    const newGroup = new Group({
      people: req.body.people,
      pendingPeople: [],
      requiresAdmin: req.body.requiresAdmin,
      isSeen: req.body.isSeen,
      name: req.body.name,
      admin: req.user.id,
      groupImage: uploadResponse.url,
      about: req.body.about,
      posts: [],
      date: new Date(),
    });
    const group = await newGroup.save();
    res.json(group);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Internal server error.");
  }
}

async function postInGroup(req, res) {
  try {
    const group = await Group.findById(req.params.id);
    let meds = [];
    if (req.body.post.isMedia) {
      for (const item of req.body.post.media) {
        const fileStr = item.res;
        const uploadResponse = await cloudinary.uploader.upload(fileStr, {
          resource_type: req.body.post.media.type,
        });
        await meds.push({
          name: item.name,
          src: uploadResponse.url,
          type: item.type,
        });
      }
    }
    const post = {
      user: req.user.id,
      body: req.body.post.body,
      isMedia: req.body.post.isMedia,
      media: req.body.post.isMedia ? meds : {},
      comments: [],
      endorsements: [],
      judgements: [],
      impulsions: [],
      date: new Date(),
    };
    await group.posts.unshift(post);
    await group.save();
    res.json(post);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Internal server error.");
  }
}

async function deletePost(req, res) {
  try {
    const group = await Group.findById(req.params.id);
    group.posts = group.posts.filter(
      (p) => p.id.toString() !== req.params.postid.toString()
    );
    await group.save();
    res.json(group.posts);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Internal server error.");
  }
}

async function deleteGroup(req, res) {
  try {
    const group = await Group.findById(req.params.id);
    await group.remove();
    res.json({ msg: "Group deleted successfully" });
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Internal server error.");
  }
}

const group = {
  getAllGroups,
  getGroup,
  meInGroups,
  createGroup,
  postInGroup,
  deletePost,
  deleteGroup,
};

module.exports = group;

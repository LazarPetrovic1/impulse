const Profile = require('../../models/Profile');
const User = require('../../models/User');
const VideoPost = require('../../models/VideoPost');
const ForumPost = require('../../models/ForumPost');
const ImagePost = require('../../models/ImagePost');
const config = require('config')

async function getMyProfile(req, res) {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name'])
    if (!profile) return res.status(400).json({ msg: 'No profile found.' })
    res.json(profile)
  } catch (e) {
    console.error(e.message)
    res.status(500).send('Internal server error.')
  }
}

async function createProfile(req, res) {
  const {
    employment,
    website,
    status,
    youtube,
    twitter,
    facebook,
    linkedin,
    instagram
  } = req.body
  const profileFields = {}
  profileFields.user = req.user.id
  if (employment) profileFields.employment = employment
  if (website) profileFields.website = website
  if (status) profileFields.status = status
  profileFields.social = {}
  if (youtube) profileFields.social.youtube = youtube
  if (twitter) profileFields.social.twitter = twitter
  if (facebook) profileFields.social.facebook = facebook
  if (linkedin) profileFields.social.linkedin = linkedin
  if (instagram) profileFields.social.instagram = instagram
  try {
    let profile = await Profile.findOne({ user: req.user.id })
    if (profile) {
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      )
      return res.json(profile)
    }
    profile = new Profile(profileFields)
    await profile.save()
    res.json(profile)
  } catch (e) {
    console.error(e.message)
    res.status(500).send('Internal server error.')
  }
}

async function getProfiles(req, res) {
  try {
    const profiles = await Profile.find().populate('user', ['name'])
    res.json(profiles)
  } catch (e) {
    console.error(e.message)
    res.status(500).send('Internal server error.')
  }
}

async function getUsersProfile(req, res) {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate('user', ['name'])
    if (!profile) return res.status(400).json({ msg: 'Profile not found.' })
    res.json(profile)
  } catch (e) {
    console.error(e.message)
    if (e.kind == 'ObjectId') return res.status(400).json({ msg: 'Profile not found.' })
    res.status(500).send('Internal server error.')
  }
}

async function deleteProfile(req, res) {
  try {
    await VideoPost.deleteMany({ user: req.user.id })
    await ForumPost.deleteMany({ user: req.user.id })
    await ImagePost.deleteMany({ user: req.user.id })
    await Profile.findOneAndRemove({ user: req.user.id })
    await User.findOneAndRemove({ _id: req.user.id })
    res.json({ msg: 'User removed' })
  } catch (e) {
    console.error(e.message)
    res.status(500).send('Internal server error.')
  }
}

const profile = {
  getMyProfile,
  createProfile,
  getProfiles,
  getUsersProfile,
  deleteProfile
}

module.exports = profile;

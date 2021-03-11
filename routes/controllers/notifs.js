const User = require('../../models/User')
const Notif = require('../../models/Notif')
const { getText } = require('../../utils/notifutils');

async function getUsersNotifs(req, res) {
  try {
    const notifs = await Notif.find({ user: req.user.id })
    res.json({ notifs })
  } catch (e) {
    console.error(e.message)
    res.status(500).send('Internal server error')
  }
}

async function sendNotifToUser(req, res) {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).send("User not found")
    }
    const { type, username, name, language } = req.body
    const text = getText({ type, language, username, name })
    const notif = new Notif({
      user,
      text
    })
    await notif.save()
    return res.json({ notif, type })
  } catch (e) {
    console.error(e.message)
    res.status(500).send('Internal server error')
  }
}

const notifs = {
  sendNotifToUser,
  getUsersNotifs
}

module.exports = notifs;

const router = require('express').Router()
const auth = require('../../middleware/auth')
const notifs = require('../controllers/notifs')

router.post("/:id", auth, notifs.sendNotifToUser)

router.get('/', auth, notifs.getUsersNotifs)

module.exports = router;

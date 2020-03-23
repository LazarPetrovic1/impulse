const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const { check, validationResult } = require('express-validator')
const User = require('../../models/User')

// @route -- POST -- api/users
// @desc -- -- Register a user
// @access -- -- Public
router.post(
  '/',
  [
    check('firstName', 'Name is required.')
      .not()
      .isEmpty(),
    check('lastName', 'Name is required.')
      .not()
      .isEmpty(),
    check('email', 'E-mail is required.').isEmail(),
    check(
      'password',
      'Please enter a password with more than 6 characters.'
    ).isLength({ min: 6 }),
    check('sex', 'Please choose a gender.')
      .not()
      .isEmpty(),
    check('bio', 'Tell us a bit about yourself.')
      .not()
      .isEmpty(),
    check('dob', 'When were you born?')
      .not()
      .isEmpty(),
    check('username', 'You will need an alias.')
      .not()
      .isEmpty(),
    check('city', 'Where are you from?')
      .not()
      .isEmpty(),
    check('country', 'Where are you from?')
      .not()
      .isEmpty(),
    check('zip', 'Where are you from?')
      .not()
      .isEmpty(),
    check('phone', 'Your phone number is required.')
      .not()
      .isEmpty(),
    check('question', 'What is your backup?')
      .not()
      .isEmpty(),
    check('security', 'Security.')
      .not()
      .isEmpty(),
    check('imageTaken', 'Image taken?')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const {
      firstName,
      lastName,
      email,
      sex,
      bio,
      dob,
      username,
      password,
      city,
      country,
      zip,
      phone,
      question,
      security,
      imageTaken,
      dismissedPosts
    } = req.body

    try {
      let user = await User.findOne({ email })
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists.' }] })
      }

      user = new User({
        firstName,
        lastName,
        email,
        sex,
        bio,
        dob,
        username,
        password,
        city,
        country,
        zip,
        phone,
        question,
        security,
        imageTaken,
        dismissedPosts
      })

      const salt = await bcrypt.genSalt(10)
      user.password = await bcrypt.hash(password, salt)
      await user.save()

      // Return JWT
      const payload = {
        user: {
          id: user.id
        }
      }

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 36000000 },
        (err, token) => {
          if (err) throw err
          return res.json({ token })
        }
      )
    } catch (e) {
      console.error(e.message)
      res.status(500).send('Internal server error')
    }
  }
)

module.exports = router

const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const JWT_SECRET = 'thisIs$affan'
const fetchuser = require('../middleware/fetchuser')

//RPUTE 1:create user using:post"/api/auth/createuser".
router.post(
  '/createuser',
  [
    body('email', 'enter a valid email').isEmail(),
    body('name', 'enter a valid name').isLength({ min: 2 }),
    body('password').isLength({ min: 3 }),
  ],
  async (req, res) => {
    let success = false
    //if there are errors return bad request and the errors
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() })
    }
    //check whethe the user with same email already exist
    try {
      let user = await User.findOne({ email: req.body.email })

      if (user) {
        return res
          .status(400)
          .json({ success, error: 'Sorry user with this email already exist!' })
      }
      const salt = await bcrypt.genSalt(10)
      const secpassword = await bcrypt.hash(req.body.password, salt)
      user = await User.create({
        email: req.body.email,
        name: req.body.name,
        password: secpassword,
      })

      const data = {
        user: {
          id: user.id,
        },
      }
      const authTOken = jwt.sign(data, JWT_SECRET)
      console.log(authTOken)

      //return a authtoken
      success = true
      res.json({ success, authTOken })
    } catch (error) {
      console.error(error.message)
      res.status(500).send('some error occured')
    }
  },
)

// ROUTE 2: login user using:post"/api/auth/login".
router.post(
  '/login',
  [
    body('email', 'enter a valid email').isEmail(),
    body('password', 'password cannot be empty').exists(),
  ],
  async (req, res) => {
    let success = false

    //if there are errors return bad request and the errors
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    const { email, password } = req.body
    try {
      let user = await User.findOne({ email })
      if (!user) {
        success = false

        return res.status(400).json({ errors: 'login with correct email' })
      }
      const passwordcompare = await bcrypt.compare(password, user.password)
      if (!passwordcompare) {
        success = false
        return res
          .status(400)
          .json({ success, errors: 'login with correct credentials' })
      }
      const data = {
        user: {
          id: user.id,
        },
      }

      const authTOken = jwt.sign(data, JWT_SECRET)
      success = true
      res.json({ success, authTOken })
    } catch (error) {
      console.error(error.message)
      res.status(500).send('internal server error')
    }
  },
)

// ROUTE 3: create get logged in users details:post"/api/auth/getuser".
router.post('/getuser', fetchuser, async (req, res) => {
  try {
    const userId = req.user.id
    console.log(userId)
    const user = await User.findById(userId).select('-password')
    res.send(user)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('internal server error')
  }
})

module.exports = router

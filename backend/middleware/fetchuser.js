const jwt = require('jsonwebtoken')
const JWT_SECRET = 'thisIs$affan'

// const fetchuser = (res, req, next) => {
//   //get user from jwt token
//   const token = req.header('auth-token')
//   if (!token) {
//     res.status(401).send({ error: 'please enter valid token' })
//   }
//   try {
//     const data = jwt.verify(token, JWT_SECRET)
//     req.user = data.user
//     next()
//   } catch (error) {
//     res.status(401).send({ error: 'please enter valid token' })
//   }
// }
const fetchuser = (req, res, next) => {
  const token = req.header('auth-token')
  if (!token) {
    res.status(401).send({ error: 'ener a valid token' })
  }
  try {
    const data = jwt.verify(token, JWT_SECRET)
    req.user = data.user
    next()
  } catch (error) {
    res.status(401).send({ error: 'enter valid token' })
  }
}
module.exports = fetchuser

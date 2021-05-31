const app = require('../firebase')
/*
check if the current user is connected
thanks to the token send with the request
in the header (Authorization) in the front end

then only users who are actually logged in will
be able to receive our data
*/
const authenticateUser = async (req, res, next) => {
  try {
    await app
      .auth()
      .verifyIdToken(req.headers.authorization.replace('Bearer ', ''))
    next()
  } catch (error) {
    res.status(404).json({ error: 'User not allow' })
  }
}

module.exports = authenticateUser

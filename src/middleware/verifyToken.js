require('dotenv').config()
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const token = req.header('Authorization')
  if (!token) return res.sendStatus(401)

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET)
    req.user = verified
    next()
  } catch (err) {
    res.status(400).send('Invalid Token')
  }
}

// const verifyToken = (req, res, next) => {
//   // Get auth header value
//   const bearerHeader = req.headers['Authorization'];
//   // Check if bearer is undefined
//   if (typeof bearerHeader !== 'undefined') {
//     // Split at the space
//     const bearer = bearerHeader.split(' ');
//     // Get token from array
//     const bearerToken = bearer[1];
//     // Set the token
//     req.token = bearerToken;
//     // Next middleware
//     next();
//   } else {
//     // Forbidden
//     res.sendStatus(403);
//   }
// }

// module.exports = verifyToken
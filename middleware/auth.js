const jwt = require('express-jwt');
const jwks = require('jwks-rsa');

exports.jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://dev-lynix.eu.auth0.com/.well-known/jwks.json',
  }),
  audience: 'http://localhost:8000',
  issuer: 'https://dev-lynix.eu.auth0.com/',
  algorithms: ['RS256'],
});

// exports.jwtCheck = (req, res, next) => {
//   const token = req.get('Authorization').split(' ')[1];
//   //   if (token === 'undefined') {
//   //     notAuth();
//   //   }
//   let decodedToken;
//   try {
//     decodedToken = jwt.verify(token, key.jwtKey);
//   } catch (err) {
//     err.statusCode = 500;
//     throw err;
//   }
//   console.log(decodedToken);
//   //   if (!decodedToken) {
//   //     notAuth();
//   //   }
//   //   req.body.userId = decodedToken.userId;
//   next();
// };

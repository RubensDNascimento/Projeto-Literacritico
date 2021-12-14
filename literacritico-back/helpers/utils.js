
const jsonwebtoken = require('jsonwebtoken');
require("dotenv").config();

function issueJWT(user) {
    const _id = user._id;
    const eCritico =user.eCritico;
  
    const expiresIn = '1d';
  
    const payload = {
      sub: _id,
      iat: Date.now(),
      eCritico: eCritico
    };

    const signedToken = jsonwebtoken.sign(payload, process.env.SECRET, { expiresIn: expiresIn});
  
    return {
      token: "Bearer " + signedToken,
      expires: expiresIn
    }
  }
  
  module.exports.issueJWT = issueJWT;
const jwt = require("jsonwebtoken");
const config = require("../config");

function generateTokens(payload) {
  const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
    expiresIn: config.jwt.accessExpires,
  });
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: config.jwt.refreshExpires,
  });

  return { accessToken, refreshToken };
}

function verifyAccess(token) {
  try {
    return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
  } catch (err) {
    return null;
  }
}
function verifyRefresh(token) {
  try {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
  } catch (err) {
    return null;
  }
}

module.exports = {
  generateTokens,
  verifyAccess,
  verifyRefresh,
};

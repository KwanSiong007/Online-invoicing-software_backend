const { auth } = require("express-oauth2-jwt-bearer");
require("dotenv").config();

const authMiddleware = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  tokenSigningAlg: "RS256",
});

module.exports = authMiddleware;

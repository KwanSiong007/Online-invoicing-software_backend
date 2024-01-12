const { auth } = require("express-oauth2-jwt-bearer");
require("dotenv").config();

console.log("Auth0 Audience:", process.env.AUTH0_AUDIENCE);
console.log("Auth0 Issuer Base URL:", process.env.AUTH0_ISSUER_BASE_URL);

const authMiddleware = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  tokenSigningAlg: "RS256",
});

module.exports = authMiddleware;

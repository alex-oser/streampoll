const functions = require("firebase-functions");
const config = functions.config();

const TWITCH_API_BASE = "https://api.twitch.tv";
const TWITCH_OAUTH_BASE = "https://id.twitch.tv";

const { clientid: CLIENT_ID, clientsecret: CLIENT_SECRET } = config.twitch;

module.exports = {
  TWITCH_API_BASE,
  TWITCH_OAUTH_BASE,
  CLIENT_ID,
  CLIENT_SECRET
}

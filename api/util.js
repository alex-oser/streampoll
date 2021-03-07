const functions = require("firebase-functions");
const got = require("got");
const config = functions.config();

const { GCLOUD_PROJECT, FUNCTIONS_EMULATOR = false } = process.env;
const TWITCH_API_URL = "https://api.twitch.tv/helix/users";
const { clientid, clientsecret } = config.twitch;

let HOST;
if (FUNCTIONS_EMULATOR) {
  HOST = "http://localhost:5000";
} else if (GCLOUD_PROJECT === "streampoll-cf56b") {
  HOST = "https://streampoll.me"
} else if (GCLOUD_PROJECT === "streampoll-dev-b2f18") {
  HOST = "https://dev.streampoll.me"
}

const getTwitchAuthToken = async (code) => {
  const response = await got({
    url: "https://id.twitch.tv/oauth2/token",
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    form: {
      client_id: clientid,
      client_secret: clientsecret,
      code: code,
      grant_type: "authorization_code",
      redirect_uri: `${HOST}/api/auth/oauth/callback`,
    },
    responseType: "json",
  });
  
  return response.body;
};

/**
 * This is to fetch the profile infomration from the twitch api
 * @returns the twitch user data
 */
const getTwitchUserdata = async (token) => {
  const response = await got({
    url: TWITCH_API_URL,
    method: "GET",
    headers: {
      "Client-ID": clientid,
      Authorization: `Bearer ${token}`,
    },
    responseType: "json",
  });

  return response.body.data[0];
};

exports.getTwitchAuthToken = getTwitchAuthToken;
exports.getTwitchUserdata = getTwitchUserdata;

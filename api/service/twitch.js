const { default: got } = require("got/dist/source");
const {
  TWITCH_API_BASE,
  TWITCH_OAUTH_BASE,
  CLIENT_ID,
  CLIENT_SECRET,
} = require("../constants");

/**
 * Create an oauth token to do magic things
 */
const createOauthToken = async () => {
  const paramsMap = {
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    grant_type: "client_credentials",
  };

  const params = Object.keys(paramsMap)
    .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(paramsMap[k]))
    .join("&");

  const apiUrl = `${TWITCH_OAUTH_BASE}/oauth2/token?${params}`;
  const response = await got({
    url: apiUrl,
    method: "POST",
    responseType: "json",
  });

  return response.body.access_token;
};

/**
 *
 * @param {string} username username to lookup
 * @returns some usefull shoit aobueig iowjhgeog shoghoesafjosfojies josigjos huhsrhu
 */
const getTwitchUserinfo = async (username) => {
  const token = await createOauthToken();

  const apiUrl = `${TWITCH_API_BASE}/helix/users?login=${username}`;
  const response = await got({
    url: apiUrl,
    method: "GET",
    headers: {
      "client-id": CLIENT_ID,
      Authorization: `Bearer ${token}`,
    },
    responseType: "json",
    throwHttpErrors: false,
  });

  if (response.statusCode !== 200 || response.body.data.length <= 0) {
    throw new Error({ error: "soemtign went wong" });
  }

  return response.body;
};

// /**
//  *
//  * @param {string} username username to lookup
//  * @returns some usefull shoit aobueig iowjhgeog shoghoesafjosfojies josigjos huhsrhu
//  */
// const getTwitchUserinfo = async (username) => {
//   const token = await createOauthToken();
//   console.log("token", token);
//   const apiUrl = `${TWITCH_API_BASE}/helix/users?login=${username}`;
//   const response = await got({
//     url: apiUrl,
//     method: "GET",
//     headers: {
//       "client-id": CLIENT_ID,
//       "Authorization": `Bearer ${token}`
//     }
//   });

//   return response.body;

// };

module.exports = {
  createOauthToken,
  getTwitchUserinfo,
};

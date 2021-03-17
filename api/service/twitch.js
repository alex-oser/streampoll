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
    .map(
      (k) =>
        encodeURIComponent(k) + "=" + encodeURIComponent(paramsMap[k])
    )
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
 * @param {string} username - username to lookup
 * @return {object} some usefull info about a twich user
 */
const getTwitchUserInfo = async (username) => {
  const token = await createOauthToken();

  const apiUrl = `${TWITCH_API_BASE}/helix/users?login=${username}`;
  const response = await got({
    url: apiUrl,
    method: "GET",
    headers: {
      "client-id": CLIENT_ID,
      "Authorization": `Bearer ${token}`,
    },
    responseType: "json",
    throwHttpErrors: false,
  });

  if (response.statusCode !== 200 || response.body.data.length <= 0) {
    throw new Error({ error: "soemtign went wong" });
  }

  return response.body.data[0];
};

const getTwitchMods = async (username) => {
  const apiUrl = "https://gql.twitch.tv/gql";
  console.log("trying to get mods for", username);
  const response = await got({
    url: apiUrl,
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36",
      "Client-Id": "kimne78kx3ncx6brgo4mv6wki5h1ko",
    },
    method: "POST",
    responseType: "json",
    body: JSON.stringify([
      {
        operationName: "Mods",
        variables: { login: username },
        extensions: {
          persistedQuery: {
            version: 1,
            sha256Hash:
              "cb912a7e0789e0f8a4c85c25041a08324475831024d03d624172b59498caf085",
          },
        },
      },
    ]),
  });

  if (response.statusCode !== 200) {
    throw new Error({ error: "soemtign went wong" });
  }
  return response.body;
};

// /**
//  *
//  * @param {string} username username to lookup
//  * @returns some usefull shoit aobueig iowjhgeog shoghoesafjosfojies josigjos huhsrhu
//  */
// const getTwitchUserInfo = async (username) => {
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
  getTwitchUserInfo,
  getTwitchMods,
};

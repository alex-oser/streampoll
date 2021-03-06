const functions = require("firebase-functions");
const express = require("express");
const admin = require("firebase-admin");
const got = require("got");
const cookieSession = require('cookie-session')

admin.initializeApp();
const config = functions.config();

const app = express();
const router = express.Router();
const { clientid, clientsecret } = config.twitch;

app.use(cookieSession({
  name: 'session',
  keys: ["ayysamolamfoaejgirosjghoisrdjhgio"],

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

router.get("/me", async (req, res) => {
  res.send(req.session.profile);
});

// TODO: make post?
router.get("/logout", async (req, res) => {
  // call twitch destry session
  const token = req.session.profile.oauth.access_token;
  console.log('token', token)
  await got({
    url: `https://id.twitch.tv/oauth2/revoke?client_id=${clientid}&token=${token}`,
    method: 'POST'
  });

  // req.session.destroy
  res.send({});
});

router.get("/oauth/callback", async (req, res) => {
  const { code } = req.query;

  const response = await got({
    url: "https://id.twitch.tv/oauth2/token",
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    form: {
      client_id: clientid,
      client_secret: clientsecret,
      code,
      grant_type: "authorization_code",
      redirect_uri: "http://localhost:3000/api/oauth/callback",
    },
    responseType: "json",
  });
  
  const user = await got({
    url: "https://api.twitch.tv/helix/users",
    method: "GET",
    headers: {
      "Client-ID": clientid,
      Authorization: "Bearer " + response.body.access_token,
    },
    responseType: "json",
  });

  const profile = user.body.data[0];
  const uid = profile.id;
  const metadataRef = admin.database().ref("users/" + uid);
  metadataRef.set(profile);
  req.session.profile = { ...profile, oauth: response.body };

  res.redirect("/")
});



//pm install @callowcreation/basic-twitch-oauth
app.use("/api", router);

exports.api = functions.https.onRequest(app);

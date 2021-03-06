const functions = require("firebase-functions");
const express = require("express");
const admin = require("firebase-admin");
const got = require("got");
const session = require("express-session");
const cookieParser = require('cookie-parser')
const FirebaseStore = require('connect-session-firebase')(session);

admin.initializeApp();
const config = functions.config();
const database = admin.database();
const app = express();
const router = express.Router();
const { clientid, clientsecret } = config.twitch;

const HOST =
  process.env.NODE_ENV === "production"
    ? "https://dev.streampoll.me"
    : "http://localhost:5000";

app.use(session({
  store: new FirebaseStore({
    database
  }),
  secret: 'dgdgcat',
  resave: true,
  saveUninitialized: true,
  name: '__session',
}));

app.use(cookieParser())

router.get("/me", async (req, res) => {
  if (!req.session.auth) {
    return res.send({ error: 'no session' }, 401);
  }

  res.send(req.session.auth);
});

// TODO: make post?
router.get("/logout", async (req, res) => {
  const sessionId = req.cookies.__session;
  
  // nuke session on logout
  req.session.destroy();
  res.redirect("/");
});

router.get("/oauth/callback", async (req, res) => {
  const { code } = req.query;

  const response = await got({
    url: "https://id.twitch.tv/oauth2/token",
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    throwHttpErrors: false,
    form: {
      client_id: clientid,
      client_secret: clientsecret,
      code,
      grant_type: "authorization_code",
      redirect_uri: `${HOST}/api/oauth/callback`,
    },
    responseType: "json",
  });
  console.log('redirect', `${HOST}/api/oauth/callback`)

  console.log("raw res", response.body);

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

  req.session.auth = response.body;

  res.setHeader('Cache-Control', 'private');
  res.redirect("/");
});

app.use("/api", router);

exports.api = functions.https.onRequest(app);

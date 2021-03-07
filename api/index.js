const functions = require("firebase-functions");
const express = require("express");
const admin = require("firebase-admin");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const FirebaseStore = require("connect-session-firebase")(session);

admin.initializeApp();
const database = admin.database();
const app = express();
const router = express.Router();

const { getTwitchAuthToken, getTwitchUserdata } = require("./util");

app.use(
  session({
    store: new FirebaseStore({
      database,
    }),
    secret: "dgdgcat",
    resave: true,
    saveUninitialized: true,
    name: "__session",
  })
);

app.use(cookieParser());

router.get("/me", async (req, res) => {
  if (!req.session.auth) {
    return res.send({ error: "no session" }, 401);
  }
  res.send(req.session.auth);
});

// TODO: make post, as this can be exploited?
router.get("/logout", async (req, res) => {
  // the session id if we ever need it
  const sessionId = req.cookies.__session;

  // nuke session on logout
  req.session.destroy();
  res.redirect("/");
});

router.get("/oauth/callback", async (req, res) => {
  const { code } = req.query;

  const tokenData = await getTwitchAuthToken(code);
  const profile = await getTwitchUserdata(tokenData.access_token);

  // save the user profile in the db
  const metadataRef = admin.database().ref("users/" + profile.id);
  metadataRef.set(profile);

  // create the session
  req.session.auth = tokenData;

  // make sure we don't cache on the client
  res.setHeader("Cache-Control", "private");

  // send them back to the app homepage auth'd
  res.redirect("/");
});

app.use("/api", router);

exports.api = functions.https.onRequest(app);

const express = require("express");
const admin = require("firebase-admin");
const router = express.Router();
const database = admin.database();
const { getTwitchAuthToken, getTwitchUserdata } = require("./util");

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
  console.log('in oaiuth callback')
  const tokenData = await getTwitchAuthToken(code);
  console.log('tokenData', tokenData)
  const profile = await getTwitchUserdata(tokenData.access_token);

  // save the user profile in the db
  const metadataRef = database.ref("users/" + profile.id);
  metadataRef.set(profile);

  // create the session
  req.session.auth = {
    ...tokenData,
    id: profile.id
  };

  // make sure we don't cache on the client
  res.setHeader("Cache-Control", "private");

  // send them back to the app homepage auth'd
  res.redirect("/");
});

exports.route = router;
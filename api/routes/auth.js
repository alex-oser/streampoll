const express = require("express");
const admin = require("firebase-admin");
const router = express.Router();
const database = admin.database();
const { getTwitchAuthToken, getTwitchUserdata } = require("../util");

// TODO: make post, as this can be exploited?
router.get("/logout", async (req, res) => {
  // the session id if we ever need it
  const sessionId = req.cookies.__session;

  // nuke session on logout
  req.session.destroy();
  res.redirect("/");
});

// log user in via twitch authentication
router.get("/oauth/callback", async (req, res) => {
  const { code } = req.query;
  const tokenData = await getTwitchAuthToken(code);
  const profile = await getTwitchUserdata(tokenData.access_token);
  const userRef = database.ref("users/" + profile.id)
  const defaultSettings = {
    requireTwitchAuth: false,
    allowEmailNotifications: false,
    allowTwitchNotifications: false,
  }

  userRef.on("value", (snapshot) => {
    // if user already has an account
    if (snapshot.exists()) {
      userRef.update({ ...snapshot.val(), lastLogin: new Date()})
    // user is logging in for the first time
    } else {
      userRef.set({ 
        ...profile, 
        lastLogin: new Date(),
        settings: defaultSettings,
      });
    }
  }, (errorObject) => {
    console.log("The read failed: " + errorObject.code);
  });

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
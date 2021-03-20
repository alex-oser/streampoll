const express = require("express");
const admin = require("firebase-admin");
const router = express.Router();
const database = admin.database();
const { getTwitchAuthToken, getTwitchUserData } = require("../util");
const {
  getUserInfo,
} = require("../service/users");

// TODO: make post, as this can be exploited?
router.get("/logout", async (req, res) => {
  // nuke session on logout
  req.session.destroy();
  res.redirect("/");
});

// log user in via twitch authentication
router.get("/oauth/callback", async (req, res) => {
  const { code } = req.query;
  const tokenData = await getTwitchAuthToken(code);
  const profile = await getTwitchUserData(tokenData.access_token);
  const defaultSettings = {
    requireTwitchAuth: false,
    allowEmailNotifications: false,
    allowTwitchNotifications: false,
  };

  const snapshot = await getUserInfo(profile.id);
  if (snapshot.exists()) {
    const loginRef = database.ref(
      "users/" + profile.id + "/info/lastLogin"
    );
    loginRef.set(new Date().toString());
    // user is logging in for the first time
  } else {
    const userRef = database.ref(
      "users/" + profile.id
    );
    userRef.set({
      twitch: {
        ...profile,
      },
      info: {
        lastLogin: new Date().toString(),
        createdAt: new Date().toString(),
      },
      settings: defaultSettings,
    });
  }

  // create the session
  req.session.auth = {
    ...tokenData,
    id: profile.id,
  };

  // make sure we don't cache on the client
  res.setHeader("Cache-Control", "private");

  // send them back to the app homepage auth'd
  res.redirect("/");
});

exports.route = router;

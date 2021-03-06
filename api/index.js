const functions = require('firebase-functions');
const express = require('express');
const admin = require('firebase-admin');
const passport = require('passport');
const TwitchStrategy = require('passport-twitch-strategy').Strategy;

admin.initializeApp();

const database = admin.database();
const config = functions.config();

const app = express();
const router = express.Router();
const { clientid, clientsecret } = config.twitch;

const HOST = process.env.NODE_ENV === 'production' ? 'https://dev.streampoll.me' : 'http://localhost:5000';

// app.use(passport.initialize());

passport.use(new TwitchStrategy({
  clientID: clientid,
  clientSecret: clientsecret,
  callbackURL: `${HOST}/api/oauth/callback`,
  scope: 'user:read:email',
}, (accessToken, refreshToken, profile, done) => {
  console.log(accessToken, profile);
  const uid = profile.id;
  const metadataRef = admin.database().ref('users/' + uid);
  metadataRef.set(profile);
  done();
}));

router.get('/', (req, res) => res.send('hi') );
router.get('/login', passport.authenticate('twitch', { forceVerify: true }));
router.get('/oauth/callback', passport.authenticate('twitch', { failureRedirect: '/' }), (_req, res) => {
  // Successful authentication, redirect home.
  res.redirect('/');
});

app.use("/api", router);

exports.api = functions.https.onRequest(app);

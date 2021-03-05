const functions = require('firebase-functions');
const express = require('express');
const admin = require('firebase-admin');
const passport = require('passport');
const TwitchStrategy = require('passport-twitch-strategy').Strategy;

admin.initializeApp();

// const database = admin.database();
const config = functions.config();

const app = express();
const { clientid, clientsecret } = config.twitch;

const HOST = process.env.NODE_ENV === 'production' ? 'https://dev.streampoll.me' : 'http://localhost:5001/streampoll-dev-b2f18/us-central1';
console.log('function start', HOST);
console.log('api', clientid, clientsecret);

app.use(passport.initialize());

passport.use(new TwitchStrategy({
  clientID: clientid,
  clientSecret: clientsecret,
  callbackURL: `${HOST}/api/oauth/callback`,
  scope: 'user:read:email',
}, (accessToken, refreshToken, profile, done) => {
  console.log(accessToken, profile);
  done();
}));

app.get('/', (req, res) => res.send('hi') );
app.get('/login', passport.authenticate('twitch', { forceVerify: true }));
app.get('/oauth/callback', passport.authenticate('twitch', { failureRedirect: '/' }), (_req, res) => {
  // Successful authentication, redirect home.
  res.redirect('/');
});

exports.api = functions.https.onRequest(app);

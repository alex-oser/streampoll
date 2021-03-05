const functions = require('firebase-functions');
const express = require('express');
const admin = require('firebase-admin');
const passport = require('passport');
const TwitchStrategy = require('passport-twitch').Strategy;

admin.initializeApp();

// const database = admin.database();
const config = functions.config();

const app = express();
const { clientid, clientsecret } = config.twitch;

passport.use(new TwitchStrategy({
  clientID: clientid,
  clientSecret: clientsecret,
  callbackURL: 'https://127.0.0.1:3000/api/oauth/callback',
  scope: 'user_read',
},
function(accessToken, refreshToken, profile, done) {
  console.log(accessToken, profile);
}
));

app.get('/', (req, res) => {
  res.json({ hello: 'minecraft' });
});

app.get('/login', passport.authenticate('twitch'));

app.post('/api/oauth/callback', (req, res) => {
  res.json({ hello: 'minecraft' });
});

exports.api = functions.https.onRequest(app);

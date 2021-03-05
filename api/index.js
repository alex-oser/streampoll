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

const HOST = process.env.NODE_ENV === 'production' ? 'https://dev.streampoll.me' : 'https://localhost:3000';

passport.use(new TwitchStrategy({
  clientID: clientid,
  clientSecret: clientsecret,
  // TODO: fix hardcode
  callbackURL: `${HOST}/api/oauth/callback`,
  scope: 'user_read',
},
function(accessToken, refreshToken, profile, done) {
  console.log(accessToken, profile);
}
));

app.get('/', (req, res) => res.send('hi') );
app.get('/login', passport.authenticate('twitch'));
app.get('/oauth/callback', passport.authenticate('twitch', { failureRedirect: '/' }), (_req, res) => {
  // Successful authentication, redirect home.
  res.redirect('/');
});

exports.api = functions.https.onRequest(app);

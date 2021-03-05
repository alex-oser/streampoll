const functions = require('firebase-functions');
const express = require('express')
const admin = require('firebase-admin');
const passport = require("passport");
const twitchStrategy = require("passport-twitch").Strategy;
const fs = require('fs');
const https = require('https');

admin.initializeApp();

const database = admin.database();
const config = functions.config();

const privateKey = fs.readFileSync('ssl/localhost.key');
const certificate = fs.readFileSync('ssl/localhost.crt');

const credentials = { key: privateKey, cert: certificate };

const app = express();
const httpsServer = https.createServer(credentials, app);

const { clientid, clientsecret } = config.twitch;

passport.use(new twitchStrategy({
  clientID: clientid,
  clientSecret: clientsecret,
  callbackURL: "https://127.0.0.1:3000/api/oauth/callback",
  scope: "user_read"
},
function(accessToken, refreshToken, profile, done) {
  console.log(accessToken, profile);
}
));

app.get('/', (req, res) => {
  res.json({ hello: 'minecraft' });
});

app.get("/login", passport.authenticate("twitch"));

app.post('/api/oauth/callback', (req, res) => {
  res.json({ hello: 'minecraft' });
});

exports.api = functions.https.onRequest(app);

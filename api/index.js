const functions = require('firebase-functions');
const express = require('express')

const admin = require('firebase-admin');
admin.initializeApp();

const database = admin.database();
const config = functions.config();
const app = express();

app.get('/', (req, res) => {
  res.json({ hello: 'world' });
});

exports.api = functions.https.onRequest(app);

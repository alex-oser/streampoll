// TODO: make a job that runs every few hours to renew tokens
const functions = require('firebase-functions');

exports.schedule = functions.pubsub
  .schedule("every 1 minute")
  .onRun((context) => {
    console.log("This will be run every 30 seconds");
    return null;
  });

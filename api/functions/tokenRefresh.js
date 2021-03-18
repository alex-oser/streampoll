const functions = require("firebase-functions");

const tokenRefresh = functions.pubsub
  .schedule("every 60 minutes")
  .onRun((context) => {
    console.log("This will be run every 60 minutes");
    return null;
  });

module.exports = {
  tokenRefresh,
};


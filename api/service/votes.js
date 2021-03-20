const admin = require("firebase-admin");
const database = admin.database();

// Retrieves data for a user at the given path
const setVoteReference = (path) => {
  return database.ref(`votes/${path}`).set(true);
};

const getVoteReference = (path) => {
  return database.ref(`votes/${path}`).once("value");
};

module.exports = {
  setVoteReference,
  getVoteReference,
};

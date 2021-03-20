const admin = require("firebase-admin");
const database = admin.database();

// Retrieves data for a user at the given path
const getUserInfo = (path) => {
  return database.ref(`/users/${path}`).once("value");
};

module.exports = {
  getUserInfo,
};

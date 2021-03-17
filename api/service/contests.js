const admin = require("firebase-admin");
const database = admin.database();

const getContestById = (id) => {
  return database.ref(`/contests/${id}`).once("value");
};

const setContestDataById = (id, data) => {
  return database.ref(`/contests/${id}`).set(data);
};

module.exports = {
  getContestById,
  setContestDataById,
}
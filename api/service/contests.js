const admin = require("firebase-admin");
const database = admin.database();

const getContestById = (id) => {
  return database.ref(`/contests/${id}`).once("value");
};

const getContestEntryById = (contestId, entryId) => {
  return database
    .ref(`/entries/${contestId}/${entryId}`)
    .once("value");
};

const setContestDataById = (id, data) => {
  return database.ref(`/contests/${id}`).set(data);
};

const createEntry = (id, data) => {
  const entryRef = database.ref(`entries/${id}`).push(data);
  return entryRef.key;
};

const addEntryVote = (contestId, entryId, data) => {
  const ref = database.ref(`votes/${contestId}/${entryId}`).set(data);
  return ref.key;
};

const getEntriesByContestId = (contestId) => {
  return database
    .ref(`entries/${contestId}`)
    .once("value");
};

module.exports = {
  getContestById,
  setContestDataById,
  createEntry,
  addEntryVote,
  getContestEntryById,
  getEntriesByContestId,
};

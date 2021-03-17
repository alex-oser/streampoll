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

const createUserEntryReference = (userId, contestId, entryId) => {
  const userEntryRef = database.ref(
    `users/${userId}/entries/${contestId}/${entryId}`
  );

  userEntryRef.set(true);
};

const getUserContestEntries = (userId, contestId) => {
  return database
    .ref(`users/${userId}/entries/${contestId}`)
    .once("value");
};

const addEntryVote = (contestId, entryId, data) => {
  const ref = database.ref(`votes/${contestId}/${entryId}`).set(data);
  return ref.key;
};

const addUserEntryVoteReference = (config) => {
  const { userId, entryId, contestId } = config;
  return database
    .ref(`users/${userId}/votes/${contestId}/${entryId}`)
    .set(true);
};

const getUserInfo = (userId) => {
  return database
    .ref(`users/${userId}`)
    .once("value");
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
  createUserEntryReference,
  getUserContestEntries,
  addEntryVote,
  addUserEntryVoteReference,
  getContestEntryById,
  getUserInfo,
  getEntriesByContestId,
};

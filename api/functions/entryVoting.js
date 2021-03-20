const functions = require("firebase-functions");
const admin = require("firebase-admin");
const database = admin.database();

const addEntryVote = functions.database
  .ref("/votes/{contestId}/{entryId}")
  .onCreate((snapshot, context) => {
    const { entryId, contestId } = context.params;
    const countRef = database.ref(
      `/entries/${contestId}/${entryId}/voteCount`
    );
    countRef.transaction((count) => {
      return (count || 0) + 1;
    });
  });

const getVoteCount = (contestId, entryId) => {
  return database
    .ref(`/entries/${contestId}/${entryId}/voteCount`)
    .once("value");
};
const removeEntryVote = functions.database
  .ref("/votes/{contestId}/{entryId}")
  .onDelete((snapshot, context) => {
    const { entryId, contestId } = context.params;
    const countRef = database.ref(
      `/entries/${contestId}/${entryId}/voteCount`
    );
    countRef.transaction((count) => {
      if (count) {
        return count - 1;
      }
      return null;
    });
  });

module.exports = {
  addEntryVote,
  removeEntryVote,
};

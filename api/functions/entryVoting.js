const functions = require("firebase-functions");
const admin = require("firebase-admin");
const database = admin.database();

const addEntryVote = functions.database
  .ref("/users/{userId}/votes/{contestId}/{entryId}")
  .onCreate((snapshot, context) => {
    const { entryId, contestId } = context.params;
    const countRef = database.ref(
      `/entries/${contestId}/${entryId}/voteCount`
    );
    countRef.transaction((count) => {
      return (count || 0) + 1;
    });
  });

const removeEntryVote = functions.database
  .ref("/users/{userId}/votes/{contestId}/{entryId}")
  .onDelete((snapshot, context) => {
    const { entryId, contestId } = context.params;
    const countRef = database.ref(
      `/entries/${contestId}/${entryId}/voteCount`
    );
    countRef.transaction((count) => {
      return (count || 0) - 1;
    });
  });

module.exports = {
  addEntryVote,
  removeEntryVote,
};

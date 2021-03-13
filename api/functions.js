const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.entryCountFxn = functions.database
  .ref("/contests/{contestId}/entries")
  .onCreate((snapshot, context) => {
    // Grab the current value of what was written to the Realtime Database.
    // const Entry = snapshot.val();

    const entryCounterRef = admin
      .database()
      .ref(`contests/${contestId}/entryCount`);

    return entryCounterRef
      .transaction(counter => {
        return (counter || 0) + 1;
      })
  });
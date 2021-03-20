const admin = require("firebase-admin");
const database = admin.database();

// Executes a batch of commands to delete data
const deleteData = (updates) => {
  return database.ref().update(updates);
};

module.exports = {
  deleteData,
};

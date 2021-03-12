const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");
const database = admin.database();

router.get("/", async (req, res) => {
  if (!req.session.auth) {
    return res.send({ error: "no session" }, 401);
  }

  // get the user profile from the db
  const ref = database.ref("users/" + req.session.auth.id);
  ref.once("value").then(
    (snapshot) => {
      return res.send(snapshot.val());
    },
    (errorObject) => {
      console.log("The read failed: " + errorObject.code);
    }
  );
});

// Get all contests associated to a user
router.get("/contests", async (req, res) => {
  if (!req.session.auth) {
    return res.send({ error: "no session" }, 401);
  }

  const ref = database.ref(`users/${req.session.auth.id}/contests`);
  ref.once("value").then(
    (snapshot) => {
      var contests = [];
      if (snapshot.exists()) {
        // extract contestids from nested storage data structure
        Object.values(snapshot.val()).forEach((contest) => {
          contests.push(contest.contestid);
        });
      }
      // returns a list of strings with contest ids or an empty list
      return res.send(contests);
    },
    (errorObject) => {
      console.log("The read failed: " + errorObject.code);
    }
  );
});

// Get all entries associated to a user
router.get("/entries", async (req, res) => {
  if (!req.session.auth) {
    return res.send({ error: "no session" }, 401);
  }

  const ref = database.ref(`users/${req.session.auth.id}/entries`);
  ref.once("value").then(
    (snapshot) => {
      var entries = [];
      if (snapshot.exists()) {
        // extract contestids from nested storage data structure
        Object.values(snapshot.val()).forEach((entry) => {
          entries.push(entry);
        });
      }
      // returns a list of strings with contest ids or an empty list
      return res.send(entries);
    },
    (errorObject) => {
      console.log("The read failed: " + errorObject.code);
    }
  );
});

// update user settings
router.post("/settings", async (req, res) => {
  if (!req.session.auth) {
    return res.send({ error: "no session" }, 401);
  }
  const body = req.body;
  database.ref(`users/${req.session.auth.id}/settings`).set(body);
  res.send(body);
});

// get user settings
router.get("/settings", async (req, res) => {
  if (!req.session.auth) {
    return res.send({ error: "no session" }, 401);
  }
  settingsRef = database.ref(`users/${req.session.auth.id}/settings`);
  settingsRef.once("value").then(
    (snapshot) => {
      res.send(snapshot.val());
    },
    (errorObject) => {
      console.log("The read failed: " + errorObject.code);
    }
  );
});

exports.route = router;
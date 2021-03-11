const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");
const database = admin.database();
const uuid = require("uuid");

router.post("/create/poll", async (req, res) => {
  const body = req.body;

  // create poll
  res.send(body);
});

router.post("/create/contest", async (req, res) => {
  if (!req.session.auth) {
    return res.send({ error: "no session" }, 401);
  }

  const body = {
    ...req.body,
    createdBy: req.session.auth.id,
    createdAt: admin.database.ServerValue.TIMESTAMP,
    entries: []
  };
  const contestid = uuid.v4();

  database.ref(`contests/${contestid}`).set(body);
  database.ref(`users/${req.session.auth.id}/contests`).push({
    contestid,
  });

  // create contest
  res.send({
    message: "success",
    id: contestid,
  });
});

router.post("/enter/contest", async (req, res) => {
  if (!req.session.auth) {
    return res.send({ error: "no session" }, 401);
  }
  const contestid = req.body.contestid
  const title = req.body.title
  const description = req.body.description

  const entryBody = {
    title: title,
    description: description,
    createdBy: req.session.auth.id,
    createdAt: admin.database.ServerValue.TIMESTAMP,
  };
  // push entry data to contest and get unique key generated for entry
  const entryRef = database.ref(`contests/${contestid}/entries`).push(entryBody);
  // push contestid and entryid to user
  database.ref(`users/${req.session.auth.id}/entries`).push({
    contestid,
    entryid: entryRef.key
  });

  // create contest
  res.send({
    message: "success",
    id: contestid,
  });
});

router.post("/create/survey", async (req, res) => {
  const body = req.body;

  // create survey
  res.send(body);
});

router.get("/me", async (req, res) => {
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
router.get("/me/contests", async (req, res) => {
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
router.get("/me/entries", async (req, res) => {
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
router.post("/me/settings", async (req, res) => {
  if (!req.session.auth) {
    return res.send({ error: "no session" }, 401);
  }
  const body = req.body;
  database.ref(`users/${req.session.auth.id}/settings`).set(body);
  res.send(body);
});

// get user settings
router.get("/me/settings", async (req, res) => {
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

// Get details for a specific contest id
router.get("/contest/:id", async (req, res) => {
  const id = req.params.id;
  const ref = database.ref(`contests/${id}`);
  ref.once("value")
    .then((snapshot) => {
      // returns an object that contains the contest details
      res.send(snapshot.val());
    },
      (errorObject) => {
        console.log("The read failed: " + errorObject.code);
      }
    );
});

// Get details for a list of contests
router.post("/contests", async (req, res) => {
  const ids = req.body;
  var contests = [];
  var refs = [];
  ids.forEach((id) => {
    const ref = database.ref(`contests/${id}`);
    refs.push(
      ref.once("value")
        .then((snapshot) => {
          contests.push({ id, ...snapshot.val() });
        }, (errorObject) => {
          console.log("The read failed: " + errorObject.code);
        }
        )
    );
  });
  Promise.all(refs).then(() => {
    // returns a list of objects that contain the contest details
    res.send(JSON.stringify(contests));
  });
});

// Get details for a list of entries
// entries object type is [{contestid, entryid}, ]
router.post("/entries", async (req, res) => {
  const entries = req.body;
  var results = [];
  var refs = [];
  entries.forEach((entry) => {
    const result = {}
    const contestRef = database.ref(`contests/${entry.contestid}`);
    const entryRef = database.ref(`contests/${entry.contestid}/entries/${entry.entryid}`);
    // get title of the contest
    refs.push(
      contestRef.once("value")
        .then((snapshot) => {
          contestData = snapshot.val()
          result.contestTitle = contestData.title;
          const entryData = contestData.entries[entry.entryid]
          result.entryTitle = entryData.title;
          result.entryDescription = entryData.description
          result.entryCreatedAt = entryData.createdAt
          results.push(result)
        }, (errorObject) => {
          console.log("The read failed: " + errorObject.code);
        }
        )
    );
  });
  Promise.all(refs).then(() => {
    // returns a list of objects that contain the contest details
    res.send(JSON.stringify(results));
  });
});

exports.route = router;

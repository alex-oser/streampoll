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
      const data = snapshot.val();
      return res.send({
        username: data["display_name"],
        photoUrl: data["profile_image_url"],
        id: data["id"],
        email: data["email"],
        settings: data.settings,
      });
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
      const contests = snapshot.val()
      // returns a list of strings with contest ids or an empty list
      return res.send(Object.keys(contests));
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

  const entriesRef = database.ref(`users/${req.session.auth.id}/entries`);
  entriesRef.once("value")
  .then((snapshot) => {
    if (snapshot.exists()) {
      const entriesData = snapshot.val()
      const entriesMap = []
      Object.entries(entriesData).map(([contest, entries]) => {
        Object.keys(entries).map((entry) => {    
          entriesMap.push({ contestId: contest, entryId: entry })
        })
      })
      res.send(entriesMap);
    } else {
      res.send([]);
    }
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
      if (snapshot.exists()) {
        res.send(snapshot.val());
      } else {
        res.send([]);
      }
    },
    (errorObject) => {
      console.log("The read failed: " + errorObject.code);
    }
  );
});

exports.route = router;

const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");
const database = admin.database();
const {
  getUserInfo,
} = require("../service/users");


router.get("/", async (req, res) => {
  if (!req.session.auth) {
    return res.send({ error: "no session" }, 401);
  }

  const snapshot = await getUserInfo(`${req.session.auth.id}/twitch`);
  if (snapshot.exists()) {
    const data = snapshot.val();
    return res.send({
      username: data["display_name"],
      photoUrl: data["profile_image_url"],
      id: data["id"],
      email: data["email"],
      settings: data.settings,
    });
  } else {
    return res.status(401).send(`No such user ID: ${req.session.auth.id}`);
  }
});

// Get all contests associated to a user
router.get("/contests", async (req, res) => {
  if (!req.session.auth) {
    return res.send({ error: "no session" }, 401);
  }

  const contestsRef = await getUserInfo(`${req.session.auth.id}/contests`);
  if (!contestsRef.exists()) {
    return res.send([]);
  }
  const contestIds = contestsRef.val();
  return res.send(Object.keys(contestIds));
});

// Get all entries associated to a user
router.get("/entries", async (req, res) => {
  if (!req.session.auth) {
    return res.send({ error: "no session" }, 401);
  }

  const entriesRef = database.ref(
    `users/${req.session.auth.id}/entries`
  );
  entriesRef.once("value").then(
    (snapshot) => {
      if (snapshot.exists()) {
        const entriesData = snapshot.val();
        const entriesMap = [];
        Object.entries(entriesData).map(([contest, entries]) => {
          Object.keys(entries).map((entry) => {
            entriesMap.push({ contestId: contest, entryId: entry });
          });
        });
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
  const settingsRef = database.ref(
    `users/${req.session.auth.id}/settings`
  );
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

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

  const body = { ...req.body, createdAt: admin.database.ServerValue.TIMESTAMP };
  const contestid = uuid.v4();

  database.ref(`contests/${contestid}`).set(body);
  database.ref(`users/${req.session.auth.id}/contests`).push({
    contestid
  });

  // create contest
  res.send(body);
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
  ref.on("value", (snapshot) => {
    res.send(snapshot.val());
  }, (errorObject) => {
    console.log("The read failed: " + errorObject.code);
  });
});

// Get all contests associated to a user
router.get("/me/contests", async (req, res) => {
  if (!req.session.auth) {
    return res.send({ error: "no session" }, 401);
  }

  const ref = database.ref(`users/${req.session.auth.id}/contests`);
  ref.on("value", (snapshot) => {
    res.send(snapshot.val());
  }, (errorObject) => {
    console.log("The read failed: " + errorObject.code);
  });
});

// Get a specific contest id
router.get("/contest/:id", async (req, res) => {
  const id = req.params.id
  const ref = database.ref(`contests/${id}`);
  ref.on("value", (snapshot) => {
    res.send(snapshot.val());
  }, (errorObject) => {
    console.log("The read failed: " + errorObject.code);
  });
});


exports.route = router;
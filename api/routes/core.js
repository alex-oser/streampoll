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
  const body = req.body;
  const id = uuid.v4();

  database.ref(`contests/${id}`).set(body);

  // create contest
  res.send({
    message: "success"
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
  ref.on("value", (snapshot) => {
    res.send(snapshot.val());
  }, (errorObject) => {
    console.log("The read failed: " + errorObject.code);
  });
});

exports.route = router;
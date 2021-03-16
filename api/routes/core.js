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

router.post("/create/survey", async (req, res) => {
  const body = req.body;

  // create survey
  res.send(body);
});

exports.route = router;

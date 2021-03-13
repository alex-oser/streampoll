const express = require("express");
const router = express.Router();
const got = require("got");
const functions = require("firebase-functions");
const config = functions.config();
const { getTwitchUserinfo } = require("../service/twitch");

// /user/sodapoppin
router.get("/user/:name", async (req, res) => {
  try {
    const userInfo = await getTwitchUserinfo(req.params.name);
    const unwrappedData = userInfo.data[0]
    res.send(unwrappedData);
  } catch {
    res.send({ error: "no user found" });
  }
});

exports.route = router;

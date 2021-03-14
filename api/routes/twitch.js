const express = require("express");
const router = express.Router();
const got = require("got");
const functions = require("firebase-functions");
const config = functions.config();
const { getTwitchUserinfo } = require("../service/twitch");
const { getMods } = require("../service/chatbot");

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

/**
 * Get a list of mods in a channel by inserting a bot and running /mods
 */
router.get("/user/:name/mods", async (req, res) => {
  const modList = await getMods(req.params.name);

  res.send(modList);
});

exports.route = router;

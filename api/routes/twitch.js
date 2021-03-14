const express = require("express");
const router = express.Router();
const got = require("got");
const functions = require("firebase-functions");
const config = functions.config();
const { getTwitchUserInfo, getTwitchMods } = require("../service/twitch");

// /user/sodapoppin
router.get("/user/:name", async (req, res) => {
  try {
    const userInfo = await getTwitchUserInfo(req.params.name);
    const unwrappedData = userInfo.data[0]
    res.send(unwrappedData);
  } catch {
    res.send({ error: "no user found" });
  }
});

router.get("/user/:name/mods", async (req, res) => {
  try {
    const modsData = await getTwitchMods(req.params.name);
    const unwrappedData = modsData[0].data.user.mods.edges
    const mods = []
    unwrappedData.forEach((edge) => {
      mods.push(edge.node.login)
    })
    res.send(mods);
    
  } catch (error) {
    console.log(error)
    res.send({ error: "no user found" });
  }
})

exports.route = router;

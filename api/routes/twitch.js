const express = require("express");
const router = express.Router();
const {
  getTwitchUserInfo,
  getTwitchMods,
} = require("../service/twitch");
const { getMods } = require("../service/chatbot");

// /user/sodapoppin
router.get("/user/:name", async (req, res) => {
  try {
    const userInfo = await getTwitchUserInfo(req.params.name);
    res.send(userInfo);
  } catch {
    res.send({ error: "no user found" });
  }
});

router.get("/user/:name/mods", async (req, res) => {
  try {
    const modsData = await getTwitchMods(req.params.name);
    const unwrappedData = modsData[0].data.user.mods.edges;
    const mods = [];
    unwrappedData.forEach((edge) => {
      mods.push(edge.node.login);
    });
    res.send(mods);
  } catch (error) {
    console.log(error);
    res.send({ error: "no user found" });
  }
});

/**
 * Get a list of mods in a channel by inserting a bot and running /mods
 */
router.get("/user/:name/mods/chat", async (req, res) => {
  const modList = await getMods(req.params.name);

  res.send(modList);
});

exports.route = router;

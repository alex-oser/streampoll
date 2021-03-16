const express = require("express");
const router = express.Router();

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

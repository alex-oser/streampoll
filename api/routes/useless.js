const express = require("express");
const router = express.Router();
const got = require("got");
const functions = require("firebase-functions");
const config = functions.config();

router.get("/status", async (req, res) => {
  const response = await got({
    url: "https://api.github.com/repos/alex-oser/streampoll/actions/runs",
    headers: {
      "Authorization": `token ${config.github.pat}`,
      "User-Agent": "TotallyNotARobot",
    },
    responseType: "json",
  });

  const data = response.body.workflow_runs[0];
  // create poll
  res.send({
    status: data.status,
    conclusion: data.conclusion,
  });
});

exports.route = router;

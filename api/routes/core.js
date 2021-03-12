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

// // Get details for a specific entry id
// router.get("/edit/entry", async (req, res) => {
//   if (!req.session.auth) {
//     return res.send({ error: "no session" }, 401);
//   }
//   const params 
//   const id = req.params.id;
//   const ref = database.ref(`contests/${id}`);
//   ref.once("value")
//     .then((snapshot) => {
//       // returns an object that contains the contest details
//       res.send(snapshot.val());
//     },
//       (errorObject) => {
//         console.log("The read failed: " + errorObject.code);
//       }
//     );
// });

// Get details for a list of entries
/**
 * POST - 
 *  req.body = 
 *  res.body =
 */
router.post("/entry/list", async (req, res) => {
  const entries = req.body;
  const results = [];
  const refs = [];
  entries.forEach((entry) => {
    const result = {}
    const contestRef = database.ref(`contests/${entry.contestId}`);
    const entryRef = database.ref(`contests/${entry.contestId}/entries/${entry.entryId}`);
    // get title of the contest
    refs.push(
      contestRef.once("value")
        .then((snapshot) => {
          contestData = snapshot.val()
          result.contestTitle = contestData.title;
          result.contestId = entry.contestId;
          const entryData = contestData.entries[entry.entryId];
          result.entryId = entry.entryId;
          result.entryTitle = entryData.title;
          result.entryDescription = entryData.description
          result.entryCreatedAt = entryData.createdAt
          results.push(result)
        }, (errorObject) => {
          console.log("The read failed: " + errorObject.code);
        }
        )
    );
  });
  Promise.all(refs).then(() => {
    // returns a list of objects that contain the contest details
    res.send(JSON.stringify(results));
  });
});

exports.route = router;
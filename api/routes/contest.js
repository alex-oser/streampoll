const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");
const database = admin.database();
const {
  checkSchema,
  validationResult,
} = require("express-validator");
const {
  getContestById,
  setContestDataById,
  createEntry,
  getContestEntryById,
  getEntriesByContestId,
} = require("../service/contests");
const { deleteData } = require("../service/deletions");
const {
  getVoteReference,
  setVoteReference,
} = require("../service/votes");
const { getUserInfo, setUserInfo } = require("../service/users");
const { getTwitchUserInfo } = require("../service/twitch");
const UPDATE_CONTEST_SCHEMA = require("../schemas/updateContestSchema");
const CREATE_CONTEST_SCHEMA = require("../schemas/createContestSchema");

router.post(
  "/create",
  checkSchema(CREATE_CONTEST_SCHEMA),
  async (req, res) => {
    if (!req.session.auth) {
      return res.send({ error: "no session" }, 401);
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    for (const key of Object.keys(req.body)) {
      if (CREATE_CONTEST_SCHEMA[key] === undefined) {
        return res
          .status(400)
          .json({ error: `Bad key bro "${key}"` });
      }
    }

    // get twitch data
    const twitchData = await getTwitchUserInfo(req.body.host);
    console.log(twitchData);

    const body = {
      ...req.body,
      hostProfileImageUrl: twitchData.profile_image_url,
      createdBy: req.session.auth.id,
      createdAt: admin.database.ServerValue.TIMESTAMP,
    };

    const contestRef = database.ref("contests").push(body);
    const contestKey = contestRef.key;
    database
      .ref(`users/${req.session.auth.id}/contests/${contestKey}`)
      .set(true)
      .then(
        () => {
          // returns an object that contains the contest details
          res.send({
            message: "SUCCESS",
            id: contestKey,
          });
        },
        (errorObject) => {
          console.log("The read failed: " + errorObject.code);
        }
      );
  }
);

router.patch(
  "/:id",
  checkSchema(UPDATE_CONTEST_SCHEMA),
  // filterKeys,
  async (req, res) => {
    if (!req.session.auth) {
      return res.send({ error: "no session" }, 401);
    }

    const errors = validationResult(req);

    for (const key of Object.keys(req.body)) {
      if (UPDATE_CONTEST_SCHEMA[key] === undefined) {
        return res
          .status(400)
          .json({ error: `Bad key bro "${key}"` });
      }
    }

    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const { id } = req.params;
    const contest = await getContestById(id);
    const payload = req.body;

    const updatedContest = {
      ...contest.val(),
      ...payload,
    };

    await setContestDataById(id, updatedContest);

    res.send(updatedContest);
  }
);

// Create new contest entry
router.post("/:contestId/enter", async (req, res) => {
  if (!req.session.auth) {
    return res.send({ error: "no session" }, 401);
  }
  const contestId = req.params.contestId;

  // get the contest metadata
  const constest = await getContestById(contestId);

  // if multipleUploads is turned on then don't allow more than 1 uploads
  if (!constest.val().multipleUploads) {
    const entries = await getUserInfo(
      `${req.session.auth.id}/entries/${contestId}`
    );
    if (entries.exists() && Object.keys(entries.val()).length > 0) {
      return res.status(403).json({
        error: "multipleUploads is not enabled for this contest",
      });
    }
  }

  const usernameRef = await getUserInfo(
    `${req.session.auth.id}/twitch/display_name`
  );
  const entryBody = {
    ...req.body,
    createdBy: req.session.auth.id,
    createdByName: usernameRef.val(),
    createdAt: admin.database.ServerValue.TIMESTAMP,
  };

  const entryId = await createEntry(contestId, entryBody);
  // get a user's current contest entries
  await setUserInfo(
    `${req.session.auth.id}/entries/${contestId}/${entryId}`,
    true
  );

  res.send({
    message: "success",
    id: entryId,
  });
});

// Get details for a specific contest id
router.get("/:contestId", async (req, res) => {
  const contestId = req.params.contestId;
  const ref = database.ref(`contests/${contestId}`);
  ref.once("value").then(
    (snapshot) => {
      // returns an object that contains the contest details
      res.send(snapshot.val());
    },
    (errorObject) => {
      console.log("The read failed: " + errorObject.code);
    }
  );
});

// Get number of entries in a specific contest
router.get("/:contestId/entry/count", async (req, res) => {
  const { contestId } = req.params;
  const ref = database.ref(`entries/${contestId}/entryCount`);
  ref.once("value").then(
    (snapshot) => {
      if (snapshot.exists()) {
        // returns an object that contains the contest details
        res.send(`${snapshot.val()}`);
      } else {
        res.send("0");
      }
    },
    (errorObject) => {
      console.log("The read failed: " + errorObject.code);
    }
  );
});

// Get details for a specific entry id
router.get("/:contestId/entry/:entryId", async (req, res) => {
  const { contestId, entryId } = req.params;
  const ref = await getContestEntryById(contestId, entryId);
  const snapshot = ref.val();

  // get twitch data
  const userInfo = await getUserInfo(`${snapshot.createdBy}/twitch`);

  res.send({
    ...snapshot,
    username: userInfo.val().display_name,
  });
});

// edit a specific entry id
router.post("/:contestId/entry/:entryId", async (req, res) => {
  if (!req.session.auth) {
    return res.send({ error: "no session" }, 401);
  }

  const entryBody = {
    ...req.body,
    createdAt: admin.database.ServerValue.TIMESTAMP,
  };

  const { contestId, entryId } = req.params;
  const entryRef = database.ref(`entries/${contestId}/${entryId}`);
  entryRef.set(entryBody).then(
    () => {
      // returns an object that contains the contest details
      res.send("SUCCESS");
    },
    (errorObject) => {
      console.log("The write failed: " + errorObject.code);
    }
  );
});

// delete a contest
router.delete("/:contestId", async (req, res) => {
  if (!req.session.auth) {
    return res.send({ error: "no session" }, 401);
  }
  const { contestId } = req.params;
  const isOwnerRef = await getUserInfo(
    `${req.session.auth.id}/contests/${contestId}`
  );
  if (!isOwnerRef.exists()) {
    console.log(`users/${req.session.auth.id}/contests/${contestId}`);
    return res
      .status(403)
      .send("You are not the owner of this contest.");
  }

  const entries = await getEntriesByContestId(contestId);
  const entriesCleanup = {};
  if (entries.exists()) {
    Object.values(entries.val()).map((entry) => {
      entriesCleanup[
        `users/${entry.createdBy}/entries/${contestId}`
      ] = null;
    });
  }

  const votes = await getVoteReference(contestId);
  const votesCleanup = {};
  if (votes.exists()) {
    Object.values(votes.val()).map((entry) => {
      const userId = Object.keys(entry)[0];
      votesCleanup[`users/${userId}/votes/${contestId}`] = null;
    });
  }

  const deletions = {
    [`entries/${contestId}`]: null,
    [`votes/${contestId}`]: null,
    [`users/${req.session.auth.id}/contests/${contestId}`]: null,
    [`contests/${contestId}`]: null,
    ...entriesCleanup,
    ...votesCleanup,
  };
  await deleteData(deletions);

  return res.send("DELETED");
});

// delete a specific entry id
router.delete("/:contestId/entry/:entryId", async (req, res) => {
  if (!req.session.auth) {
    return res.send({ error: "no session" }, 401);
  }
  const { contestId, entryId } = req.params;
  const userRef = database.ref(
    `users/${req.session.auth.id}/entries/${contestId}/${entryId}`
  );
  userRef
    .once("value")
    .then((snapshot) => {
      if (!snapshot.exists()) {
        res.status(403).send("You are not the owner of this entry.");
      }
    })
    .then(() => {
      const updates = {
        [`users/${req.session.auth.id}/entries/${contestId}/${entryId}`]: null,
        [`entries/${contestId}/${entryId}`]: null,
      };
      const entryRef = database.ref();
      return entryRef.update(updates);
    })
    .then(
      () => {
        res.send("DELETED");
      },
      (errorObject) => {
        console.log("The write failed: " + errorObject.code);
      }
    );
});

// Get details for a list of contests
router.post("/list", async (req, res) => {
  const ids = req.body;
  const contests = [];
  const refs = [];
  ids.forEach((id) => {
    const ref = database.ref(`contests/${id}`);
    refs.push(
      ref.once("value").then(
        (snapshot) => {
          contests.push({ id, ...snapshot.val() });
        },
        (errorObject) => {
          console.log("The read failed: " + errorObject.code);
        }
      )
    );
  });
  Promise.all(refs).then(() => {
    // returns a list of objects that contain the contest details
    res.send(JSON.stringify(contests));
  });
});

router.post("/entry/list", async (req, res) => {
  const entries = req.body;
  const results = [];
  const refs = [];
  entries.forEach((entry) => {
    const contestRef = database.ref(`contests/${entry.contestId}`);
    const entryRef = database.ref(
      `entries/${entry.contestId}/${entry.entryId}`
    );
    const result = {};
    // get title of the contest
    refs.push(
      entryRef
        .once("value")
        .then((snapshot) => {
          const entryData = snapshot.val();
          entryData.id = entry.entryId;
          result.entry = entryData;
          return contestRef.once("value");
        })
        .then(
          (snapshot) => {
            const contestData = snapshot.val();
            contestData.id = entry.contestId;
            result.contest = contestData;
            results.push(result);
          },
          (errorObject) => {
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

router.post("/:contestId/:entryId/vote", async (req, res) => {
  const { contestId, entryId } = req.params;
  const userInfo = await getUserInfo(`${req.session.auth.id}/votes/${contestId}/${entryId}`);
  // If user has already voted, delete the vote (since only upvote is currently supported)
  const value = userInfo.exists() ? null : true;
  console.log("SETTING VOTES TO", value);
  await setUserInfo(
    `${req.session.auth.id}/votes/${contestId}/${entryId}`,
    value
  );
  await setVoteReference(
    `${contestId}/${entryId}/${req.session.auth.id}`,
    value
  );
  res.json(1);
});

router.get("/:contestId/votes/me", async (req, res) => {
  if (!req.session.auth) {
    return res.json({});
  }
  const contestId = req.params.contestId;
  const votes = await getUserInfo(`/${req.session.auth.id}/votes/${contestId}`);
  const results = votes.exists() ? votes.val() : {};
  return res.json(results);
});

router.get("/:contestId/entries", async (req, res) => {
  const ref = await getEntriesByContestId(req.params.contestId);

  const rawValue = ref.val();
  const formattedResponse = Object.entries(rawValue).map(
    ([k, v]) => ({
      ...v,
      entryId: k,
    })
  );

  res.json(formattedResponse);
});

exports.route = router;

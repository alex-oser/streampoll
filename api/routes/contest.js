const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");
const database = admin.database();
const uuid = require("uuid");
const {
  checkSchema,
  validationResult,
} = require("express-validator");

const createValidationSchema = {
  title: {
    in: ["body"],
    isLength: {
      errorMessage: "Title must be at least 3 chars",
      options: { min: 3, max: 60 },
    },
    exists: {
      errorMessage: "Title is required",
    },
  },
  description: {
    in: ["body"],
    isLength: {
      errorMessage: "Description must be at least 2000 chars",
      options: { min: 5, max: 2000 },
    },
    exists: {
      errorMessage: "Title is required",
    },
  },
};

router.post("/create",
  checkSchema(createValidationSchema),
  async (req, res) => {
    if (!req.session.auth) {
      return res.send({ error: "no session" }, 401);
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const body = {
      ...req.body,
      createdBy: req.session.auth.id,
      createdAt: admin.database.ServerValue.TIMESTAMP,
    };

    const contestRef = database.ref(`contests`).push(body);
    const contestKey = contestRef.key
    database.ref(`users/${req.session.auth.id}/contests/${contestKey}`)
    .set(true)
    .then(() => {
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

router.post("/enter", async (req, res) => {
  if (!req.session.auth) {
    return res.send({ error: "no session" }, 401);
  }
  const contestId = req.body.contestId;

  const entryBody = {
    ...req.body,
    createdBy: req.session.auth.id,
    createdAt: admin.database.ServerValue.TIMESTAMP,
  };
  // push entry data to contest and get unique key generated for entry
  const entryRef = database.ref(`entries/${contestId}`).push(entryBody);
  const entryKey = entryRef.key
  // get a user's current contest entries
  const userEntryRef = database.ref(`users/${req.session.auth.id}/entries/${contestId}/${entryKey}`);
  userEntryRef.set(true).then(() => {
    // returns an object that contains the contest details
    res.send({
      message: "success",
      id: entryKey,
    });
  },
  (errorObject) => {
    console.log("The read failed: " + errorObject.code);
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
  const ref = database.ref(
    `entries/${contestId}/entryCount`
  );
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
  const ref = database.ref(
    `entries/${contestId}/${entryId}`
  );
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
  const entryRef = database.ref(
    `entries/${contestId}/${entryId}`
  );
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

// delete a specific entry id
router.delete("/:contestId/entry/:entryId", async (req, res) => {
  if (!req.session.auth) {
    return res.send({ error: "no session" }, 401);
  }
  const { contestId, entryId } = req.params
  console.log(`ABOUT TO DELETE @ users/${req.session.auth.id}/${contestId}/${entryId}`)
  const updates = {
    [`users/${req.session.auth.id}/entries/${contestId}/${entryId}`]: null,
    [`entries/${contestId}/${entryId}`]: null
  }
  const entryRef = database.ref();
  entryRef.update(updates)
  .then(() => {
    console.log("just deleted that old record")
    res.send("DELETED")
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

exports.route = router;

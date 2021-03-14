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

router.post(
  "/create",
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
      entries: [],
    };
    const contestId = uuid.v4();

    database.ref(`contests/${contestId}`).set(body);
    database.ref(`users/${req.session.auth.id}/contests`).push({
      contestId,
    });

    // create contest
    res.send({
      message: "success",
      id: contestId,
    });
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
  const entryRef = database
    .ref(`contests/${contestId}/entries`)
    .push(entryBody);
  // push contestId and entryId to user
  database.ref(`users/${req.session.auth.id}/entries`).push({
    contestId,
    entryId: entryRef.key,
  });

  // create contest
  res.send({
    message: "success",
    id: contestId,
  });
});

// Get details for a specific contest id
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const ref = database.ref(`contests/${id}`);
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

// Get details for a specific entry id
router.get("/:contestId/entry/:entryId", async (req, res) => {
  const contestId = req.params.contestId;
  const entryId = req.params.entryId;
  const ref = database.ref(
    `contests/${contestId}/entries/${entryId}`
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
  const contestId = req.params.contestId;
  const entryId = req.params.entryId;
  const ref = database.ref(
    `contests/${contestId}/entries/${entryId}`
  );
  ref.set(entryBody).then(
    () => {
      // returns an object that contains the contest details
      res.send("SUCCESS");
    },
    (errorObject) => {
      console.log("The write failed: " + errorObject.code);
    }
  );
});

// Get details for a list of contests
router.post("/list", async (req, res) => {
  const ids = req.body;
  var contests = [];
  var refs = [];
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

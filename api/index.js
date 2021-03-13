const functions = require("firebase-functions");
const express = require("express");
const admin = require("firebase-admin");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const FirebaseStore = require("connect-session-firebase")(session);

admin.initializeApp();
const database = admin.database();

const auth = require("./routes/auth");
const me = require("./routes/me");
const core = require("./routes/core");
const useless = require("./routes/useless");
const twitch = require("./routes/twitch");
const contest = require("./routes/contest");
const app = express();

app.use(
  session({
    store: new FirebaseStore({
      database,
    }),
    secret: "dgdgcat",
    resave: true,
    cookie: { maxAge: 30 * 24 * 3600 * 1000 }, // cookie will last 30 days
    saveUninitialized: true,
    name: "__session",
  })
);

app.use(cookieParser());

app.use("/api", core.route);
app.use("/api/me", me.route);
app.use("/api/auth", auth.route);
app.use("/api/build", useless.route);
app.use("/api/contest", contest.route);
app.use("/api/twitch", twitch.route);

exports.api = functions.https.onRequest(app);

// Keeps track of the length of the 'entries' child list
exports.countEntries = functions.database
  .ref("/contests/{contestId}/entries/{entryId}")
  .onCreate((snapshot, context) => {
    const entriesRef = snapshot.ref.parent;
    const countRef = entriesRef.parent.child("entryCount");

    countRef
      .transaction((current) => {
        return (current || 0) + 1;
      })
      .then(() => {
        console.log("Counter updated.");
        return null;
      });
  });

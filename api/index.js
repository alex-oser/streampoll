const functions = require("firebase-functions");
const express = require("express");
const admin = require("firebase-admin");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const FirebaseStore = require("connect-session-firebase")(session);

admin.initializeApp();
const database = admin.database();

const auth = require("./routes/auth");
const core = require("./routes/core");
const useless = require("./routes/useless");
const twitch = require("./routes/twitch");
const app = express();

app.use(
  session({
    store: new FirebaseStore({
      database,
    }),
    secret: "dgdgcat",
    resave: true,
    saveUninitialized: true,
    name: "__session",
  })
);

app.use(cookieParser());

app.use("/api", core.route);
app.use("/api/auth", auth.route);
app.use("/api/build", useless.route);
app.use("/api/twitch", twitch.route);

exports.api = functions.https.onRequest(app);

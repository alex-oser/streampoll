const functions = require("firebase-functions");
const express = require("express");
const admin = require("firebase-admin");
const session = require("express-session");
const cookieParser = require("cookie-parser");
// const bodyParser = require("body-parser");
const FirebaseStore = require("connect-session-firebase")(session);

admin.initializeApp();
const database = admin.database();

const auth = require("./auth");
const core = require("./core");
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
// app.use(bodyParser());

app.use("/api/auth", auth.route);
app.use("/api", core.route);

exports.api = functions.https.onRequest(app);

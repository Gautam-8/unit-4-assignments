const express = require("express");

const app = express();

app.use(express.json());

const connect = require("./config/db");

const { register , login } = require ("./controllers/auth.controller");

const productcontroller = require("./controllers/product.controller");


app.post("/register" , register);
app.post( "/login", login);
app.use("/products" , productcontroller);


//google
const passport = require("./config/passport");

app.use(passport.initialize());


passport.serializeUser(function ({ user, token }, done) {
  done(null, { user, token });
});
passport.deserializeUser(function (user, done) {
  done(err, user);
});


app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/google/failure",
  }),
  function (req, res) {
    return res.status(201).json({ user: req.user.user, token: req.user.token });
  }
);

app.get("/auth/google/failure", function (req, res) {
  return res.send("Something went wrong");
});



app.listen(2345, async() => {

    await connect();

    console.log("listening on port 2345");

})
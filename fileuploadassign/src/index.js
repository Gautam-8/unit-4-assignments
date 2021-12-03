const express = require("express");

const app = express();

app.use(express.json());

const connect = require("./config/db");

const usersController = require("./controllers/user.controller");
app.use( "/users" , usersController);

const galleryController = require("./controllers/gallery.controller");
app.use("/gallery", galleryController);

app.listen(4455, async () => {

    await connect();

    console.log("listening on port 4455");

})
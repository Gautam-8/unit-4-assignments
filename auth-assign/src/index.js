const express = require("express");

const app = express();

app.use(express.json());

const connect = require("./config/db");

const { signup , login } = require("./controllers/auth.controller");
app.post("/signup" , signup);
app.post("/login" , login);

const itemcontroller = require("./controllers/item.controller");
app.use("/items" , itemcontroller);
 
app.listen( 5555 , async () => {

    await connect();
    console.log("listening on port 5555");
} )
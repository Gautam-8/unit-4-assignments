const express = require("express");

const app = express();

app.use(express.json());

const connect = require("./config/db");

const productscontroller = require("./controllers/products.controller");
app.use( "/products" , productscontroller);

app.listen(4444, async () => {

    await connect();

    console.log("listening on port 4444");

})
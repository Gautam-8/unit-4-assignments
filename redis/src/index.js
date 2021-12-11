const express = require("express");

const app = express();

const connect = require("./configs/db");

app.use(express.json());

const productController = require("./controllers/product.controller") ;
app.use("/products" , productController)

app.listen( 1234 ,async () => {
    
    await connect();
    console.log("Listening on port 1234");
})
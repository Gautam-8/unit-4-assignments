
const express = require("express");

const router = express.Router();

const Product =  require("../models/product.model");

const redis = require("../configs/redis");


router.post("" , async (req , res) => {
      
    const product = await Product.create(req.body);
    redis.set( `products.${product._id}` , JSON.stringify(product));

    const products = await Product.find().lean().exec();
    redis.set("products" , JSON.stringify(products))

    return res.send( { fromserver : product});
  
});

router.get("" , async (req,res) => {
     
    const items = await redis.get('products');
    if(items) return res.send( {fromcache : JSON.parse(items)} );

    const products = await Product.find().lean().exec();
    redis.set("products" , JSON.stringify(products));

    return res.send( { fromserver : products});
   
});

router.get("/:id" , async (req,res) => {
     
    const items = await redis.get(`products.${req.params.id}`);
    if(items) return res.send( {fromcache : JSON.parse(items)} );

    const product = await Product.findById(req.params.id).lean().exec();
    redis.set(`products.${req.params.id}` , JSON.stringify(product));

    return res.send( { fromserver : product});
   
});


router.patch("/:id" , async ( req, res) => {

    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {new : true}).lean().exec(); 
    redis.set(`products.${req.params.id}` , JSON.stringify(product))

    const products = await Product.find().lean().exec();
    redis.set("products" , JSON.stringify(products));

    return res.send( { fromserver : product});

});

router.delete("/:id" , async( req ,res ) => {

    const product = await Product.findByIdAndDelete( req.params.id ).lean().exec();
    redis.del(`products.${req.params.id}` , JSON.stringify(product));

    const products = await Product.find().lean().exec();
    redis.set("products" , JSON.stringify(products));

    return res.send( { fromserver : product});
    
});

router.delete("" , async( req ,res ) => {

    const products = await Product.deleteMany().lean().exec();
  
     redis.flushAll();

    return res.send( {fromserver : products});
    
});




module.exports = router;
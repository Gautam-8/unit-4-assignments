const express = require("express");

const router = express.Router();

const Product = require("../models/products.model");

const { body, validationResult} = require("express-validator");


router.post("", 

body("first_name")
.isLength( { min:4 , max:15 })
.withMessage("first_name should be 4 to 15 characters"),

body("last_name")
.isLength( { min:4 , max:15 })
.withMessage("last_name should be 4 to 15 characters"),

body("age")
.isLength( { max:2 })
.withMessage("Provide proper age")
.custom((value) => {
    
    const isNumber = /^[0-9]*$/.test(value); // true or false
    if (!isNumber || value <= 0 ) {
      throw new Error("Age cannot be 0 or negative");
    }
    return true;
  }),

  body("gender").custom( (value) => {

    const isgender = ["Male" ,"male" ,"Female" ,"female" ,"others","Others"];
   if( !isgender.includes(value)){
      throw new Error("provide proper gender");
    }
   return true; 
  }),

  body("pincode")
.isLength( {min:6, max:6} ).withMessage("Invalid pincode")
.isNumeric().withMessage("Pincode has to be Number"),

  body("email").custom(async (value) => {
    // value = a@a.com
    const isEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,20}$/.test(value);
    if (!isEmail) {
      throw new Error("Please enter a proper email address");
    }
    const productByEmail = await Product.findOne({ email: value }) .lean().exec();

    if (productByEmail) {
      throw new Error("Please try with a different email address");
    }
    return true;
  }),


async (req, res) => {

//console.log(body("first_name"));

  const errors = validationResult(req);

  if(!errors.isEmpty()){
    let newErrors = errors.array().map(({ msg, param,location}) =>{
      return{
        [param]:msg,
      }
    });
return res.status(400).json({ errors:newErrors});

  }

    try {
      const product = await Product.create(req.body);
  
      return res.status(201).send(product);
    } catch (e) {
      return res.status(500).json({ message: e.message, status: "Failed" });
    }
  });
  




module.exports = router;
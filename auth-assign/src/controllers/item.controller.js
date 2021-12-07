const express = require("express");

const Item = require("../models/item.model");

const authenticate = require("../middlewares/authenticate");

const router = express.Router();

router.post("/" , authenticate , async (req ,res) => {

    try{
        const user = req.user;

        const item = await Item.create({
           // title:req.body.title+`${user.user.name}`,
           title:req.body.title,
            body:req.body.body,
            user: user.user._id
        });

return res.status(201).json({ item });

    }catch(e){
        return res.status(500).json({ status: "failed", message: e.message });
    }
});

router.get("/", async (req, res) => {
    const item = await Item.find().populate("user").lean().exec();
  
    return res.send(item);
  });
  
  module.exports = router;


const express = require("express");

const router = express.Router();

const User = require("../models/user.model")

const upload = require("../middlewares/upload");

const fs = require("fs");

router.post( "/", upload.single("image_urls") ,async( req, res) => {

    try{

        const user = await User.create({
            first_name : req.body.first_name,
            last_name: req.body.last_name,
            image_urls:req.file.path
        });

        return res.send(user);

    }catch(e){
         return  res.status(500).json(e.message);
    }
});

router.patch( "/:id", upload.single("image_urls") ,async( req, res) => {

    try{

        const user = await User.findById(req.params.id);
        await fs.unlink( `${user.image_urls[0]}`,(err) =>{
            if(err) throw err;
        });

        const updateuser = await User.findByIdAndUpdate(req.params.id,{
            image_urls:req.file.path,
           
        });
           
        return res.send(updateuser);

    }catch(e){
         return  res.status(500).json(e.message);
    }
});

router.get( "/:id",async( req, res) => {

    try{

        const user = await User.findById(req.params.id)

        return res.send(user);

    }catch(e){
         return  res.status(500).json(e.message);
    }
});

router.delete( "/:id" , async( req, res) => {

    try{

        const user = await User.findById(req.params.id);
        await fs.unlink( `${user.image_urls[0]}`,(err) =>{
            if(err) throw err;
        });

        const updateuser = await User.findByIdAndDelete(req.params.id);
           
        return res.send(updateuser);

    }catch(e){
         return  res.status(500).json(e.message);
    }
});






module.exports = router;
const express = require("express");

const router = express.Router();

const Gallery = require("../models/gallery.model")

const upload = require("../middlewares/upload");

const fs = require("fs");


router.post( "", upload.any("image_urls") ,async( req, res) => {

    const filePaths = req.files.map( (file) => file.path ) ;
    try{

        const gallery = await Gallery.create({
            user_id:req.body.user_id,
            image_urls:filePaths,
        });

        return res.send(gallery);

    }catch(e){
         return  res.status(500).json(e.message);
    }
});


router.delete( "/:id" ,async( req, res) => {

   
    try{

        const gallery = await Gallery.findById(req.params.id);
        
        for(let i=0 ; i < 5 ;i++){

            fs.unlink( `${gallery.image_urls[i]}`,(err) =>{
                if(err) throw err;
            });

        }
       

      const gallery_close = await Gallery.findByIdAndDelete(req.params.id);

        return res.send(gallery_close);

    }catch(e){
         return  res.status(500).json(e.message);
    }
});


module.exports = router;
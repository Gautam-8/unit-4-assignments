const mongoose = require ("mongoose");

const gallerySchema = new mongoose.Schema ({

   user_id:{ type:mongoose.Schema.Types.ObjectId ,required:true},
    image_urls:[{ type:String , required:true}]

},
{
    versionKey:false,
    timestamps:true
});

module.exports = mongoose.model( "gallery" , gallerySchema);
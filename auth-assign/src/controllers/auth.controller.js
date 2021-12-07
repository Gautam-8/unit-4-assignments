require("dotenv").config();

const User = require("../models/user.model");

const jwt = require("jsonwebtoken");

const newToken = (user) => {
     return jwt.sign({ user : user }, process.env.JWT_ACCESS_KEY)
}
 
const signup = async (req, res) => {

    try{

let user = await User.findOne({email: req.body.email}).lean().exec();

if(user) return res.status(400).json({  
    status:"failed",
  message : "Please provide a different email address"
})

  user = await User.create(req.body);

const token = newToken(user);
return res.send( {user , token} );
        
    }
    
    catch(e){
        return res.status(500).json({status:'failed' , message:e.message})
    }
}



const login = async (req, res) => {

    try{

let user = await User.findOne({email: req.body.email});


if( !user ) 
return res.status(400).json({  
    status:"failed",
    message : "Please provide a correct email address and password"
})

const match = await user.checkPassword(req.body.password);

 if(!match) 
 return res.status(400).json({  
    status:"failed",
    message : "Please provide a correct email address and password"
})

const token = newToken(user);
return res.send( {user , token} );
        
    }
    
    catch(e){
        return res.status(500).json({status:'failed' , message:e.message})
    }
}


module.exports = { signup , login };
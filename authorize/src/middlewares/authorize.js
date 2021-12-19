module.exports = function(permittedRoles){

    return function (req, res ,next){

       user = req.user.user; 

       isAllowed = false;


        if(permittedRoles.includes(user.role)){
            isAllowed = true;
        }

       if(!isAllowed){

        return res.status(401).json({
            status: "failed",
            message: " You are not allowed to access this",
          });

       }

       next();
    }
}
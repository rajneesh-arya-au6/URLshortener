var User=require('../models/user')
function authenticate(req,res,next){
    if(req.session.userId){
        console.log(req.session.userId)
        User.findById(req.session.userId)
        .then(function(user){
            console.log(user)
            next()
        })
    
    .catch(function(err) {
        console.log(err.message);
        console.log("user not found by session")
      });
     
    }
   else{
    res.redirect("/login"); // if session is destroy then redirect to
    console.log("session expired")
   }
}
module.exports={authenticate}
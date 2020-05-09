require("../server")
const User = require("../models/user")
const bcrypt = require("bcryptjs")
const ShortUrl = require('../models/shortUrl')




let postLogin = async(req,res) => {
    let {email, password} = req.body
    if (!email || !password)
       return res.status(400).send("Incorrect credentials");
       await User.findOne({ email: email })
       .then(function (user) {
         
        user_obj = user;
        console.log(user_obj)
        console.log("password", password)
        console.log("user password", user_obj.password)
        const bool = bcrypt.compare(password, user_obj.password);
        req.session.userId=user._id
        console.log(req.session.userId)
        return bool
       })
       .then(function (isMatched) {
         console.log(isMatched)
         if (!isMatched) return res.send("Incorrect credentials p");
         res.redirect("/")
       })
       .catch(function (err) {
         res.status(500);
       });
 }


 let postRegister = async(req,res) => {
    // req.session.userId = null;
      var user = new User({ ...req.body });
      user
        .save()
        .then(function (user) {
          // req.session.userId = user._id;
          res.redirect("/login");
        })
        .catch(function (err) {
          console.log(err);
          if (err.name === "ValidationError")
            return res.status(400).send(`Validation Error: ${err.message}`);
        });
  }


  let urlShortener = async (req, res) => {
    const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl })
    if (shortUrl == null) return res.sendStatus(404)
  
    shortUrl.clicks++
    shortUrl.save()
  
    res.redirect(shortUrl.full)
  }

  let homepage = async (req, res) => {
    const shortUrls = await ShortUrl.find()
    res.render('index', { shortUrls: shortUrls })
  }


 module.exports = {postLogin, postRegister, urlShortener, homepage}
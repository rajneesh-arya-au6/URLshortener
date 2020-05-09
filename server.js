const express = require('express')
const mongoose = require('mongoose')
const ShortUrl = require('./models/shortUrl')
const session = require("express-session")
const app = express()
const User = require("./models/user")
const bcrypt = require("bcryptjs")
const {postLogin, postRegister ,urlShortener, homepage} = require("./controller.js/apiController")
const{authenticate} = require("./middleware/authentication")
const dotenv = require("dotenv");
dotenv.config();


mongoose.connect("mongodb+srv://mybirth4:9479694757@cluster0-ahakv.mongodb.net/test", {
  useNewUrlParser: true, useUnifiedTopology: true
})

app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: false }))

app.use(
  session({
    secret: "anything",
    resave: false,
    name: "todoSession",
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 30,
      httpOnly: true,
      secure: false,
      sameSite: "strict"
    }
  })
);

app.get('/', authenticate, homepage)

app.get("/login", async(req,res) => {
  res.render('login')
})

app.post("/login", postLogin)

app.get("/register",async(_,res) =>{
  res.render('register')
})

app.post("/register", postRegister)

app.post('/shortUrls',authenticate, async (req, res) => {
  await ShortUrl.create({ full: req.body.fullUrl })

  res.redirect('/')
})

app.get('/:shortUrl',authenticate, urlShortener)

app.listen(process.env.PORT || 5000,function(){
  console.log("server connected")
});
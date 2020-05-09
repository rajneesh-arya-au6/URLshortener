const mongoose = require('mongoose')
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
  }
})


userSchema.pre("save", function (next) {
    var user = this;
    // Check whether password field is modified
    if (user.isModified("password")) {
      bcrypt
        .hash(user.password, 10)
        .then(function(hashedPassword) {
          user.password = hashedPassword;
          next();
        })
        .catch(function(err) {
          next(err);
        });
    }
    else{
      next();
      }
  });





    
module.exports = mongoose.model('user', userSchema)
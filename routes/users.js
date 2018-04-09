const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../config/database')



// Register
router.post('/register', (req, res, next) => {
	//console.log("REGISTER")
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    status:req.body.status
  });

  User.addUser(newUser, (err, user) => {
    if(err){
      res.json({success: false, msg:'Failed to register user'});
    } else {
      res.json({success: true, msg:'User registered'});
    }
  });
});



router.post('/setstatus',(req,res,next)=>{

// console.log("COINS me aya");
// console.log(req.body.reward)
console.log("yehan aya")
let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    status: req.body.status
  });

User.setstatus(newUser,(err,user)=>{
  console.log("TALAL")
  //console.log(user)
  if(err){
      res.json({success: false, msg:'Failed to register user'});
    } else {
      res.json({success: true, msg:'User registered'});
    }


})

});


// Authenticate
router.post('/authenticate', (req, res, next) => {
   const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if(err) throw err;
    if(!user){
      //console.log("authmeaya")
      return res.json({success: false, msg: 'User not found'});
    }
    //console.log("authmeaya")
    //console.log(user)
    User.comparePassword(password, user.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch){
        //console.log(user.toObject())
        const token = jwt.sign(user.toObject(), config.secret, {
          expiresIn: 604800 // 1 week
        });
        

        res.json({
          success: true,
          token: 'Bearer '+token,
          user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
            status:user.status
          }
        });
      } else {
        return res.json({success: false, msg: 'Wrong password'});
      }
    });
  });
});
// Profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  res.json({user: req.user});
});


module.exports = router;

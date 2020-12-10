const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Signup = require('../models/signup')
const jwt = require('jsonwebtoken')
const signuprouter = express.Router()
const SECRET=require('../config')
const auth=require('../auth');
signuprouter.use(bodyParser.json())


let ascessToken="";


signuprouter.route('/')

.post((req,res,next)=>{

    const email=req.body.Email
    if(email.indexOf('@')<=-1)
    {
        err = new Error('ERROR WRONG EMAIL');
            err.status = 404;
            return next(err);
    }

    ascessToken=jwt.sign(req.body.Firstname,SECRET.secret)
    console.log(ascessToken)
    
  Signup.create(req.body)
    .then((user)=>{
        user.save()
        console.log("user created")
        res.statusCode=200
        
        res.send({key:ascessToken,pp:" "});
     },(err) => console.log(err))
    .catch((err) => console.log(err));


})




module.exports = signuprouter,ascessToken
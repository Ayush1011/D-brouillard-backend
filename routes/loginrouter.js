const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Signup = require('../models/signup')
const jwt = require('jsonwebtoken')
const loginrouter = express.Router()
const SECRET=require('../config')
const auth=require('../auth');
// used the userRouter in express
loginrouter.use(bodyParser.json())

let ascessToken="";


loginrouter.route('/')



.post((req,res,next) => {

    const query = { "Email": req.body.Email };
    

    // ascessToken=jwt.sign(req.body.Firstname,SECRET.secret)


    Signup.findOne(query)

    .then((user) => {
        if (user != null) {

            if(user.password!=req.body.password)
            {

               
            err = new Error('password worng');
            err.status = 404;
            return next(err);
            }
            else{
               
               ascessToken=jwt.sign(req.body.password,SECRET.secret)    
               console.log(ascessToken)
            res.send({key:ascessToken,pp:" "});
            res.statusCode = 200;
            
            }
        }
        else {
            err = new Error('user ' + req.params.id + ' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => console.log(err))
    .catch((err) => next(err));
})

module.exports = loginrouter



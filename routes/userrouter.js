const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('../models/user')
const Signup = require('../models/signup')
const jwt = require('jsonwebtoken')
const userRouter = express.Router()
const SECRET=require('../config')
const auth=require('../auth');
// used the userRouter in express
userRouter.use(bodyParser.json())//body parser as a midddlemen

let ascessToken="";
function authToken(req,res,next){

    const authHeader = req.headers['authorization'];
    console.log(ascessToken)
    
   
    jwt.verify(ascessToken,SECRET.secret,(err)=>{
        if(err){
            res.sendStatus(403)
            res.json("verify kar la")
            
        }
        else{
            next()
        }
    })
}

userRouter.route('/') //which api shall call this





.get((req,res,next) => {

    
    Signup.find({})
    .then((dishes) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dishes);
        
    }, (err) => next(err))
    .catch((err) => next(err));
})



.post((req, res, next) => {
   ascessToken=jwt.sign(req.body.name,SECRET.secret)
    console.log(ascessToken)
    res.json({ascessToken:ascessToken})
    User.create(req.body)
    .then((dish) => {
        console.log('Dish Created ', dish);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /dishes');
})
.delete((req, res, next) => {
    User.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});



userRouter.route('/:id')

.get((req,res,next) => {

    
    Signup.find({Email:req.params.id})
    .then((dishes) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dishes);
        
    }, (err) => next(err))
    .catch((err) => next(err));
})






module.exports = userRouter,ascessToken
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const SECRET=require('./config')

// used the userRouter in express
const acess=require('./routes/userrouter');

function authToken(req,res,next){

    const authHeader = req.header('Authorization');
    console.log(authHeader)
     const mainToken=authHeader.split(' ')[1]

    console.log(mainToken)
    if(authHeader==null)
    {
        return res.sendStatus(401)
    }
    jwt.verify(mainToken,SECRET.secret,(err)=>{
        if(err){
            res.send("verify kar la")

            res.sendStatus(403)
            
        }else{
            next()
        }
    })
}

module.exports=authToken
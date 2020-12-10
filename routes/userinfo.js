const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Userinfo = require('../models/signup')
const jwt = require('jsonwebtoken')
const userinforouter = express.Router()
const SECRET=require('../config')
const auth=require('../auth');

userinforouter.use(bodyParser.json())

let accesToken="";

userinforouter.route('/:id/:token')


.get((req,res,next) => {

    accesToken=req.params.token.trim()
    const query = { "Email": req.params.id };

        jwt.verify(accesToken,SECRET.secret,(err)=>{
            if(err){
                res.send("verify First")
    
                res.sendStatus(403)
                
            }else{
                Userinfo.find({ "Email": req.params.id } )
                
                .then((user)=>{
                    console.log(user)

                    if(user!=null){
                       
                    console.log(user[0])
                     res.json(user[0])

                    }else{
                        err = new Error('user ' + req.params.id + ' not found');
                        console.log(err)
                        err.status = 404;
                       
                        return next(err)
                    }

                })
            }
        }
    )

    
        
        
    

})

    
module.exports = userinforouter







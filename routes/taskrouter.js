const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Task = require('../models/task')
const jwt = require('jsonwebtoken')
const taskRouter = express.Router()
const SECRET=require('../config')
const auth=require('../auth');
taskRouter.use(bodyParser.json())




var accesToken=""





taskRouter.route('/:token')



.get((req,res,next) => {

    accesToken=req.params.token.trim()
   

    
    console.log(req.params.token)
    Task.find({IsDone:false})
    .then((user) => {
        
      


        jwt.verify(accesToken,SECRET.secret,(err)=>{
            if(err){
                res.send("verify First")
    
                res.sendStatus(403)
                
            }else{

                return res.status(200).json(user)
            }
        }
    )

     },(err) => console.log(err))
     .catch((err) => console.log(err))
     
        
        
    

})



.post((req, res, next) => {
    accesToken=req.params.token.trim()
    jwt.verify(accesToken,SECRET.secret,(err)=>{
        if(err){
            res.send("verify First")

            res.sendStatus(403)
            
        }else{
            Task.create(req.body)
            .then((user) => {
                console.log('user Created ', user);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(user);
            }, (err) => console.log(err))
            .catch((err) => next(err));
        }
    })
     
 })

 .delete((req, res, next) => {
    Task.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});




 taskRouter.route('/:id/:token')

 .post((req, res, next) => {

    accesToken=req.params.token.trim()

    
    jwt.verify(accesToken,SECRET.secret,(err)=>{

        if(err)
        {


            res.send("verify First")

            res.sendStatus(403)
            
        }
        
        else{

           


        Task.findById(req.params.id)
        .then((user) => {
        if (user != null ) {
            if (user.IsDone==false) {
                user.IsDone=true
            }
            if(user.Doneby==''){
                if(user.Email!=req.body.Email)
                {
                    user.Doneby=req.body.Email
                    user.save()
                .then((dish) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish);                
            }, (err) => next(err));
                }
                
                else{
                    res.send({key:""})
                    res.statusCode = 500;
                    console.log(err)
                    return next(err);
                }
               
            }
           
            
        }
        else {
        
            err = new Error('user ' + req.params.id + ' not found');
            res.statusCode = 404;
            console.log(err)
            return next(err);
        }
        
    }, (err) => next(err))
    .catch((err) => next(err));


        }
    })

    
})


.get((req,res,next)=>{
    accesToken=req.params.token.trim()
    const query = { "Email": req.params.id };
    jwt.verify(accesToken,SECRET.secret,(err)=>{
        if(err){
            res.send("verify First")

            res.sendStatus(403)
            
        }else{
            Task.find(query)
            .then((user) => {
                console.log('user Created ', user);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(user);
            }, (err) => console.log(err))
            .catch((err) => next(err));
        }
    })


})

.delete((req, res, next) => {

    accesToken=req.params.token.trim()

    
    jwt.verify(accesToken,SECRET.secret,(err)=>{

        if(err)
        {


            res.send("verify First")

            res.sendStatus(403)
            
        }
        
        else{

        Task.findByIdAndRemove(req.params.id)
        .then((user) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(user);
        
    }, (err) => next(err))
    .catch((err) => next(err));


        }
    })

    
})


taskRouter.route('/acc/:id/:token')


.get((req,res,next)=>{
    accesToken=req.params.token.trim()
    const query = { IsDone:true,Doneby: req.params.id};
    jwt.verify(accesToken,SECRET.secret,(err)=>{
        if(err){
            res.send("verify First")
            res.sendStatus(403)
            
        }else{
            Task.find(query)
            .then((user) => {
              
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(user);
                
            }, (err) => console.log(err))
            .catch((err) => next(err));
        }
    })


})



.put((req,res,next)=>{
    accesToken=req.params.token.trim()
    // const query = { "Email": req.params.id};
    jwt.verify(accesToken,SECRET.secret,(err)=>{
        if(err){
            res.send("verify First")

            res.sendStatus(403)
            
        }else{

                
            Task.findById(req.params.id)
            .then((user) => {
                
                    console.log(user)
                    user.Doneby=''
                    user.IsDone=false
                    user.save()
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(user);
                
                
            }, (err) => console.log(err))
            .catch((err) => next(err));
        }
    })


})




taskRouter.route('/yours/:id/:token')

.get((req,res,next)=>{
    accesToken=req.params.token.trim()
    const query = { IsDone:true,Email: req.params.id};
    jwt.verify(accesToken,SECRET.secret,(err)=>{
        if(err){
            res.send("verify First")
            res.sendStatus(403)
            
        }else{
            Task.find(query)
            .then((user) => {
              
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(user);
                
            }, (err) => console.log(err))
            .catch((err) => next(err));
        }
    })


})



 module.exports = taskRouter,accesToken;

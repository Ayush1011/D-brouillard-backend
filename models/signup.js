var mongoose = require('mongoose')

var schema =  mongoose.Schema



var Signup=new schema({

    Firstname:{
        type:String,
        required:true,
        default:'',
    },
    Email:{
        type:String,
        required:true,
        default:'',
    },
    contactNo:{
        type:Number,
        required:true,
        default:'',
    },
    password:{
        type:String,
        required:true,

    },
    



},{timestamps:true})


module.exports = mongoose.model('user',Signup);
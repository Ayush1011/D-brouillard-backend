var mongoose = require('mongoose')

var schema =  mongoose.Schema


var User=new schema({

    name:{
        type:String,
        required:true,
        default:'',
    },
    password:{
        type:String,
        required:true,

    }

},{timestamps:true})

module.exports = mongoose.model('User',User);
var mongoose = require('mongoose')

var Schema =  mongoose.Schema

var Task = new Schema({
    Email:{
        type:String,
        default:'',
    },
    TaskTitle:{
        type:String,
        required:true,
        default:'',
    },
    PostBy:{
        type:String,
        required:true,
        default:'',
    },
    TaskDis:{
        type:String,
        required:true,
        default:'',
    },
   
    Price:{
        type:String,
        default:100,

    },
    TaskPic:   {
        type: String,
        default: 'https://efii.co/assets/images/default-post-pic.png'
    },
    IsDone:{
        type:Boolean,
        default:false,

    },
    Doneby:{
        type:String,
        default:""

    },
    
  

},{
    timestamps:true
});


module.exports =  mongoose.model('Task', Task);
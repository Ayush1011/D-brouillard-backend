var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const { config } = require('process');
const cred=require('./config')
const mongoose = require('mongoose')

const userRout=require('./routes/userrouter');
const userRouter = require('./routes/userrouter');
const signuprouter = require('./routes/signupuser');
const loginrouter=require('./routes/loginrouter');
const taskrouter=require('./routes/taskrouter');
const taskRouter = require('./routes/taskrouter');
const userinforouter = require('./routes/userinfo');

var app = express();




const url=cred.mongorl
console.log(url)

const connect=mongoose.connect(url,{useUnifiedTopology:true},{ useNewUrlParser: true });
connect.then(()=>{
  console.log("Connected correctly to server");

},(err)=>{
  console.log(err)
})



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user',userRout);
app.use('/signup',signuprouter);
app.use('/login',loginrouter);
app.use('/tasks',taskRouter);
app.use('/userinfo',userinforouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

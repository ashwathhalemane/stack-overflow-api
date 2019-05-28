var express = require('express')
var app = express()

var routes = require('./routes')

var jsonParer = require('body-parser').json
var logger = require('morgan')

app.use(logger("dev"))
app.use(jsonParer())

app.use('/questions', routes)

app.use(function(req, res, next){
  var err = new Error("Not found")
  err.status = 404;
  next(err)
})

//error handler
app.use(function(err, req, res, next){
    res.status(err.status || 500)
    console.log(res)
    res.json({
      error:{
        message:err.message
      }
    })
})

const port = process.env.PORT || 3000

app.listen(port, function(){
  console.log(port)
});

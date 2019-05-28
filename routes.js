var express = require('express')
var router = express.Router()

//return all questions
router.get('/', function(req,res){
  res.json({response: "This is from /questions GET"})
})

router.post('/', function(req,res){
  res.json({
    response: "This is from /questions POST",
    body: req.body
  })

})

router.get('/:qID', function(req,res){
  res.json({response: "Getting specific question with id " + req.params.qID})
})

router.post('/:qID/answers', function(req,res){
  res.json({
    response: "This is from /answers POST",
    questionId: req.params.qID,
    body: req.body
  })
})

router.put('/:qID/answers/:aID',function(req,res){
  res.json({
    response: "This is from /answers PUT",
    questionId: req.params.qID,
    answesId: req.params.aID,
    body: req.body
  })
})

router.delete('/:qID/answers/:aID',function(req,res){
  res.json({
    response: "This is from /answers DELETE",
    questionId: req.params.qID,
    answesId: req.params.aID
  })
})

//for upvote or downvote
router.post('/:qID/answers/:aID/vote-:dir',function(req, res, next){
  if(req.params.dir.search(/^(up|down)$/) === -1){
    var err = new Error("Not Found")
    err.status = 404;
    next(err)
  }
  else{
    next()
  }
},function(req,res){
  res.json({
    response: "This is from /answers " + req.params.dir,
    questionId: req.params.qID,
    answesId: req.params.aID,
    vote:req.params.dir
})
})

module.exports = router;

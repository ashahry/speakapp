var express = require("express");
var router = express.Router();
var DB = require("../config/connection");
var Lesson = DB.models.Lesson;

function error(response, message){
  response.status(500);
  response.json({error: message})
};

// Index
router.get("/lessons", function(req, res) {
  Lesson.findAll().then(function(lessons){
    res.json(lessons);
  });
});

// Create
router.post("/lessons", function(req, res) {
  Lesson.create(req.body).then(function (lesson) {
    res.json(lesson);
  });
});

// Show
router.get("/lessons/:id", function(req, res) {
  Lesson.findById(req.params.id)
  .then(function(lesson){
    if(!lesson) return error(res, "not found");
    return lesson.updateAttributes(req.body);
  })
  .then(function(lesson){
    res.json(lesson);
  });
});

//Update
router.put("/lessons/:id", function(req, res){
  Lesson.findById(req.params.id)
  .then(function(lesson){
    if(!lesson) return error(res, "not found");
    return lesson.updateAttributes(req.body);
  })
  .then(function(lesson){
    res.json(lesson);
  });
});

//Destroy
router.delete("/lessons/:id", function(req, res){
  Lesson.findById(req.params.id)
  .then(function(lesson){
    if(!lesson) return error(res, "not found");
    return lesson.destroy()
  })
  .then(function(lesson){
    res.json(lesson)
  });
});

module.exports = router;

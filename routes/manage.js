var express = require('express');
var router = express.Router();
var PostModel = require('../model/post.js');


router.get('/', function(req, res, next) {
  PostModel.find().then(function (data){
    res.render('manage', {data: data});
  });
});

router.get('/xoa/:id', function(req, res, next){
  var id =req.params.id;
  PostModel.findByIdAndRemove(id).exec();
  res.redirect('/admin');
});

router.get('/sua/:id', function(req, res, next){
  var id =req.params.id;
  PostModel.find({_id : id}).then(function (data){
    res.render('edit', {data: data[0]});
  });
});

router.post('/sua/:id', function(req, res, next){
  var id =req.params.id;

    PostModel.findById(id, function (err, docs) {
    if (err) return handleError(err);
    docs.username = req.body.txtFullName;
    docs.video = req.body.txtVideo;
    docs.link = req.body.txtLink;
    docs.email = req.body.txtEmail;
    docs.intro = req.body.txtIntro;
    docs.status = true;
    docs.save();
    });
      res.redirect('/admin');
});

module.exports = router;

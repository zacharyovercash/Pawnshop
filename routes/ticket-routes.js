const router = require('express').Router();
const passport = require('passport');
const bodyParser=require('body-parser');
const Item = require('../models/item-model');
const Ticket= require('../models/ticket-model')


var urlencodedParser=bodyParser.urlencoded({extended:false});


router.get('/info',function(req,res){
  Item.find({},function(err,data){
    if(err) throw err;
    res.render('info',{items:data,qs:req.query,user:req.user})
  })
});


module.exports = router;

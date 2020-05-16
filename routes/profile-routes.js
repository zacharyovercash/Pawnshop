const router = require('express').Router();
const Ticket = require('../models/ticket-model')
const authCheck = (req, res, next) => {
    if(!req.user){
        res.redirect('/auth/login');
    } else {
        next();
    }
};

router.get('/', authCheck, (req, res) => {
  Ticket.find({},function(err,data){
    if(err) throw err;
    res.render('profile', { user: req.user ,tickets:data});
});
});

module.exports = router;

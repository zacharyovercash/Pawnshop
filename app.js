const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const ticketRoutes = require('./routes/ticket-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const bodyParser= require('body-parser');


const urlencodedParser=bodyParser.urlencoded({extended:false});


const authCheck = (req, res, next) => {
    if(!req.user){
        res.redirect('/auth/login');
    } else {
        next();
    }
};


const app = express();
// set view engine
app.set('view engine', 'ejs');
app.use(express.static('./public'));
// set up session cookies
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());



// connect to mongodb
mongoose.connect(keys.mongodb.dbURI,{ useNewUrlParser: true }, () => {
    console.log('connected to mongodb');
});

// set up routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use('/ticket',ticketRoutes);

// create home route
app.get('/', authCheck,(req, res) => {
    res.render('index', { user: req.user});
});

app.get('/index',(req, res) => {
    res.render('index', { user: req.user});
});

app.post('/index',urlencodedParser,function(req,res){


  res.redirect('/ticket/info?ID='+req.body.ID);
});

app.listen(3000, () => {
    console.log('app now listening for requests on port 3000');
});

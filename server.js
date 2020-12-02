
require('dotenv').config();
const express = require('express');
const app = new express();
const expressLayouts = require('express-ejs-layouts');
var path = require ('path');
const mongodb =  require('mongoose');
const session = require('express-session');
const flash = require('express-flash');
const mongodbStore = require('connect-mongo')(session);

//connect database 
const url = "mongodb://localhost/pizza";
mongodb.connect(url, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: true});
const connecttion = mongodb.connection;
connecttion.once('open', () => {
    console.log('database connected ...');
}).catch(err => {
    console.log('conected failed ---')
});

//session store
const mongooseStore = new mongodbStore({
    mongooseConnection: connecttion,
    collection: 'sessions'
})

//session config
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: mongooseStore,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));

app.use(flash());

//assets
app.use(express.static('public'));
app.use(express.json());

//middleware
app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
})

//set template enginer
app.use(expressLayouts);
app.set('views', path.join(__dirname, '/resources/views'));
app.set('view engine', 'ejs');

//router
require('./routes/web')(app);

//set port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`listening port ${PORT}`);
})
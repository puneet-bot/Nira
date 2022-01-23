const          express                  =       require('express');
const          app                      =       express();
const          port                     =       8000;
const          layouts                  =       require('express-ejs-layouts');
const          db                       =       require('./config/mongoose');
const          session                  =       require('express-session');
const          passport                 =       require('passport');
const          passportLocal            =       require('./config/passport-local');
const          sassMiddleware           =       require('node-sass-middleware');
const          mongoStore               =       require('connect-mongo');
const          myMiddleware             =       require('./config/middleware');
const          flash                    =       require('connect-flash');



//Scss file specification
app.use(sassMiddleware({
    /* Options */
    src: 'assets/scss'
  , dest: './assets/css'
  , debug: true
  , outputStyle: 'extended'
  , prefix:  '/css'
}));


//To parse the request(this is a middle ware).
app.use(express.urlencoded());


// To mention that all the static files will be in assets folder
app.use(express.static('./assets'));

//To save the image files of the user.
app.use('/uploads',express.static(__dirname+'/uploads'));


//Using Express-ejs-layout feature 
app.use(layouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


//Set up ejs
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(session({
    name: 'codeial',
    // TODO change the secret before deployment in production mode
    secret: '123',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    //store the session in the database
    store: mongoStore.create({
      mongoUrl: db._connectionString,
      autoRemove: 'disabled'
    })
}));

//passport initialization
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
//flash use
app.use(flash());
app.use(myMiddleware.setFlash);


//Establishing link to handle all the routes.
app.use('/',require('./routes/index.js'));

//Server listening on the follwoing port.
app.listen(port,function(err){
    if(err)
      return  console.log(err);
    return console.log(`Server Running on Port : ${port} !`);
})
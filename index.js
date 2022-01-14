const          express      =       require('express');
const          app          =       express();
const          port         =       8000;
const          layouts      =       require('express-ejs-layouts');

//To parse the request(this is a middle ware).
app.use(express.urlencoded());

// To mention that all the static files will be in assets folder
app.use(express.static('./assets'));

//Using Express-ejs-layout feature 
app.use(layouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


//Set up ejs
app.set('view engine', 'ejs');
app.set('views', './views');


//Establishing link to handle all the routes.
app.use('/',require('./routes/index.js'));

//Server listening on the follwoing port.
app.listen(port,function(err){
    if(err)
      return  console.log(err);
    return console.log(`Server Running on Port : ${port} !`);
})
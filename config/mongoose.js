const    mongoose      =   require('mongoose');

mongoose.connect('mongodb://localhost/Nira');
const   db             =   mongoose.connection;

db.on('error',console.error.bind(console,"Error Connecting Database"));
db.once('open',function(){
    console.log("Hooray, Database is Connected!");
});
module.exports=db;
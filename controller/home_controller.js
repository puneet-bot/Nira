//To show the home page
module.exports.home=(req,res)=>{
    return res.render('home');
}

module.exports.post=function(req,res){
    console.log(req.body);
}
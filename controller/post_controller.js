const Post  =   require('../models/post');
module.exports.create=function(req,res){
    // console.log(req);
    Post.create({
        post:req.body.content,
        user:req.user._id
    },function(err,post){
        if(err)
            console.log('error in creating a post');
        else{
            console.log('Post Created Successfully.');
            return res.redirect('/');
        }
    })
}
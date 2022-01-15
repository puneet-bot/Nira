const Post          =   require('../models/post');
const Comment       =   require('../models/comment');
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

module.exports.delete=function(req,res){
    Post.findById(req.params.id,function(err,post){
        if(err){
            return console.log('ERRor in deleteing a comment.');
        }
        post.remove();
        Comment.deleteMany({post:req.params.id});
        res.redirect('back');
    });
}

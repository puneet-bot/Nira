const Comment  =   require('../models/comment');
const Post     =   require('../models/post');
module.exports.create=function(req,res){
    console.log(req.body);
    Post.findById(req.body.postId,function(err,owner){
        if(owner){
            Comment.create({
                content:req.body.comment,
                post:req.body.postId,
                user:req.user._id
            },function(err,comment){
                owner.comment.push(comment);
                owner.save();
                if(err)
                    console.log('error in creating a post');
                else{
                    console.log('Comment Created Successfully.',comment);
                    return res.redirect('/');
                }
            })
        }
        
    });
    
}

module.exports.delete=function(req,res){
    Comment.findById(req.params.id,function(err,comment){
        if(err){
            return console.log('ERRor in deleteing a comment.');
        }
        comment.remove();
        return res.redirect('back');
    })
}
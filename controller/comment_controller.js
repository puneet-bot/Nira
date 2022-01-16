const Comment  =   require('../models/comment');
const Post     =   require('../models/post');
module.exports.create=async function(req,res){
    try{
    let owner=await Post.findById(req.body.postId);
        if(owner){
            let comment= await Comment.create({
                content:req.body.comment,
                post:req.body.postId,
                user:req.user._id
            });
            owner.comment.push(comment);
            owner.save();
        }
        req.flash('success','Comment Created Successfully.');
    }catch(err){
        req.flash('error','error in posting comment')
        return res.redirect('/');
    }
    return res.redirect('/');
    
}

module.exports.delete=async function(req,res){
    try{
        let comment= await Comment.findById(req.params.id);
        comment.remove();
        req.flash('success','Comment Deleted Successfully.')
    }catch(err){
        return req.flash('error','ERRor in deleteing a comment.');
    }
    return res.redirect('back');
}
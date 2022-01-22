const Comment  =   require('../models/comment');
const Post     =   require('../models/post');
module.exports.create=async function(req,res){
    console.log("body: ",req.body);
    let owner = await Post.findById(req.body.postId);
    if(owner){
        let comment = await  Comment.create({
            content:req.body.comment,
            post:req.body.postId,
            user:req.user._id
        });
        owner.comment.push(comment);
        owner.save();
        if(req.xhr){
            let comment_detail = await Comment.findById(comment.id).populate('user').populate('post');
            return res.status(200).json({
                data:{
                    comment:comment_detail
                },
                message:"Comment Created"
            })
        }
        req.flash('success','Comment Posted Successfully.');
        res.redirect('/');

    }
    
}

module.exports.delete=async function(req,res){
    try{
        let comment= await Comment.findById(req.params.id);
        comment.remove();
        if(req.xhr){

            return res.status(200).json({
                data:{
                    comment_id:comment._id
                },
                message:"Deleted Comment"
            })
        }
        req.flash('success','Comment Deleted Successfully.')
    }catch(err){
        return req.flash('error','ERRor in deleteing a comment.');
    }
    return res.redirect('back');
}
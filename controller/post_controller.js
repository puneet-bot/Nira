const Post          =   require('../models/post');
const Comment       =   require('../models/comment');

module.exports.create=async function(req,res){
    try{
        let posts=await Post.create({
            post:req.body.content,
            user:req.user._id
        });
        req.flash('success','Post Created Successfully.');
        return res.redirect('/');
    }catch(err){
        req.flash('error','error in creating a post');
    }
}

module.exports.delete=async function(req,res){
    try{
        let post=await Post.findById(req.params.id);
        post.remove();
        req.flash('success','Deleted Post');
        Comment.deleteMany({post:req.params.id});
        res.redirect('back');
    }catch(err){
        req.flash('error','error in Deleting a post');
    }

}

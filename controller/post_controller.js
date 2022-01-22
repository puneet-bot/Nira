const Post          =   require('../models/post');
const Comment       =   require('../models/comment');

module.exports.create=async function(req,res){
    try{
        let posts=await Post.create({
            post:req.body.content,
            user:req.user._id
        });
        if(req.xhr){
            let post_detail = await Post.findById(posts._id).populate("user");
            // console.log("post-detail",post_detail);
            return res.status(200).json({
                data:{
                    post:post_detail,
                },
                message:"Post Created!"
            })
        }
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
        Comment.deleteMany({post:req.params.id});
        if(req.xhr){
            return res.status(200).json({
                data:{
                    post_id:req.params.id
                },
                message:"Post Deleted"
            })
        }
        res.redirect('back');
        req.flash('success','Deleted Post');
    }catch(err){
        req.flash('error','error in Deleting a post');
    }

}

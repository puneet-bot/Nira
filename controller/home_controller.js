const User = require('../models/users');
const Post = require('../models/post');



//To show the home page
module.exports.home=async (req,res)=>{
    try{
        let posts=await Post.find({}).
        populate('user')
        //this path is reffers to the schema object, there the post model has a field name comment and we are asking it to populate that
        //field entirely.
        .populate({
            path:'comment',
            populate:{
                path:'user'
            }
        });
        let users=await User.find({});
        return res.render('home',{
                post:posts,
                all_users:users
            });
    }catch(err){
        req.flash('error','error in finding all posts');
   }
}

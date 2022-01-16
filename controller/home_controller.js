const User = require('../models/users');
const Post = require('../models/post');



//To show the home page
module.exports.home=(req,res)=>{
    Post.find({}).
    populate('user')
    //this path is reffers to the schema object, there the post model has a field name comment and we are asking it to populate that
    //field entirely.
    .populate({
        path:'comment',
        populate:{
            path:'user'
        }
    })
    .exec(function(err,posts){
        if(err)
            req.flash('error','error in finding all posts',err);
        else{
            User.find({},function(err,users){
                res.render('home',{
                    post:posts,
                    all_users:users
                })
            })
            
        }
    })
}

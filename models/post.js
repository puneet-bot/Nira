const mongoose=require('mongoose');

const postSchema = new mongoose.Schema({
    post: {
        type: String,
        required: true
    },
    //User is taken from the moongoose scheema in the file users.js from variable User.
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    comment:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Comment'
    }]
    
}, {
    timestamps: true
});

const Post=mongoose.model('Post',postSchema);
module.exports=Post;
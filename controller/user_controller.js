const User = require('../models/users');
const fs=require('fs');
const path=require('path');

// render the sign up page
module.exports.signUp = function(req, res){
    if(req.isAuthenticated()){
       return res.redirect(`/users/profile/${req.user.id}`);
    }
    return res.render('Signup')
}


// render the sign in page
module.exports.signIn = function(req, res){
    if(req.isAuthenticated()){
       return res.redirect(`/users/profile/${req.user.id}`);
    }
    return res.render('login')
}


// Create or register the user .. 
module.exports.create =async function(req, res){
    try{
        if (req.body.password != req.body.confirmPassword){
            console.log('not match password..');
            return res.redirect('back');
        }
        let user= await User.findOne({email: req.body.email});
        if (!user){
                let createUser= await User.create(req.body);
        }
        return res.redirect('/users/sign-in');
    }catch(err){
        req.flash('error','error in creating user');
    }
}

// sign in and create a session for the user
module.exports.createSession = function(req, res){
    req.flash('success','Signed In Successfully');
    res.redirect('/')
}

module.exports.profile=async function(req,res){
    try{
        let user=await User.findById(req.params.id);
        return res.render('profile',{
            profile:user
        });
    }catch(err){
        req.flash('success','Signed out successfully');
    }

    
}
module.exports.edit=async function(req,res){
    if(req.user.id==req.params.id){
        try{
            let user= await User.findById(req.params.id);
            User.uploadedAvatar(req,res,function(err){
                if(err){
                    return console.log('***MULTER Error',err);
                }
                user.name=req.body.name;
                user.email=req.body.email;
                if(req.file){
                    if(user.avatar){
                      fs.unlinkSync(path.join(__dirname,'..',user.avatar))   
                    }
                    user.avatar=User.avatarPath+'/'+req.file.filename;
                }
                req.flash("Updated Successfully.")
                user.save();
                return res.redirect('back');
            })

        }catch(err){
            req.flash(err);
            console.log("hhh",err)
            return res.redirect('back');
        }
    }else{
        return res.status(401).send('unauthorized');
    }
}
module.exports.destroySession=function(req,res){
    req.logout();
    req.flash('success','Signed out successfully');
    return res.redirect('/');
}
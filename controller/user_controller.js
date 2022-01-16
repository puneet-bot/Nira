const User = require('../models/users');


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
    try{
        let user= await User.findById(req.params.id);
        user.name=req.body.name;
        user.save();
        return res.redirect('back');
    }catch(err){
        return req.flash('error','error in finding edit profile users');
    }
}
module.exports.destroySession=function(req,res){
    req.logout();
    req.flash('success','Signed out successfully');
    return res.redirect('/');
}
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
module.exports.create = function(req, res){
    // console.log('Registering the user',req.body);
        if (req.body.password != req.body.confirmPassword){
            console.log('not match password..');
            return res.redirect('back');
        }
        User.findOne({email: req.body.email},function(user){
            if (!user){
                let createUser=  User.create(req.body);
            }
            return res.redirect('/users/sign-in');
        });
        
}

// sign in and create a session for the user
module.exports.createSession = function(req, res){
    res.redirect('/')
}

module.exports.profile=function(req,res){
    User.findById(req.params.id,function(err,user){
        if(err)
            return console.log('error in finding profile users');
        else{
            return res.render('profile',{
                profile:user
            });
        }
    })
    
}
module.exports.edit=function(req,res){
    User.findById(req.params.id,function(err,user){
        if(err)
            return console.log('error in finding edit profile users');
        else{
            user.name=req.body.name;
            user.save();
            return res.redirect('back');
        }
    })
}
module.exports.destroySession=function(req,res){
    req.logout();
    return res.redirect('/');
}
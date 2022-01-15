const               express             =         require('express');
const               router              =         express.Router();
const               passport            =         require('passport');
const               userController      =         require('../controller/user_controller');  

console.log('user router');
router.get('/sign-up', userController.signUp);
router.get('/sign-in', userController.signIn);

//register or sign up the user
router.post('/create', userController.create);

// use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
), userController.createSession);

router.get('/sign-out',userController.destroySession);

router.get('/profile/:id', passport.checkAuthentication ,userController.profile);

router.post('/update/:id',userController.edit);


module.exports=router
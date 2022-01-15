const               express             =         require('express');
const               app                 =         express();
const               router              =         express.Router();
const               homeController      =         require('../controller/home_controller');         

//The path till now here is '/'
router.get('/',homeController.home);
router.post('/',homeController.post);
//if users hit /users then we will require the user under routes
router.use('/users',require('./user'));
router.use('/post',require('./post'));
router.use('/comment',require('./comment'));


module.exports=router;
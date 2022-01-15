const               express             =         require('express');
const               router              =         express.Router();
const               postController      =         require('../controller/post_controller');        
const               passport            =         require('passport');


router.post('/create', passport.checkAuthentication ,postController.create);
router.post('/destroy/:id', passport.checkAuthentication ,postController.delete);


module.exports=router;
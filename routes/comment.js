const               express             =         require('express');
const               router              =         express.Router();
const               commentController   =         require('../controller/comment_controller');        
const               passport            =         require('passport');


router.post('/create', passport.checkAuthentication ,commentController.create);
router.post('/destroy/:id', passport.checkAuthentication ,commentController.delete);


module.exports=router;
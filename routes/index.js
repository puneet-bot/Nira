const               express             =         require('express');
const               app                 =         express();
const               router              =         express.Router();
const               homeController      =         require('../controller/home_controller');         

//The path till now here is '/'
router.get('/',homeController.home);
router.post('/',homeController.post);


module.exports=router;
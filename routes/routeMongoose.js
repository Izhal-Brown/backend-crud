const router = require ('express').Router();
const multer = require('multer');
const upload = multer({dest: 'uploads'});
const productControllerV2 = require ('../controllers/controllerMongoose')


router.get('/product', productControllerV2.index );
router.get('/product/:id', productControllerV2.view );
router.post('/product', upload.single('image'), productControllerV2.store );
router.put('/product/:id', upload.single('image'), productControllerV2.update);
router.delete('/product/:id', upload.single('image'), productControllerV2.destroy)

module.exports = router;
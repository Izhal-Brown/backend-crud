const router = require ('express').Router();
const multer = require('multer');
const upload = multer({dest: 'uploads'});
const productControllerV1 = require ('../controllers/controllerMongodb')


router.get('/product', productControllerV1.index );
router.get('/product/:id', productControllerV1.view );
router.post('/product', upload.single('image'), productControllerV1.store );
router.put('/product/:id', upload.single('image'), productControllerV1.update);
router.delete('/product/:id', upload.single('image'), productControllerV1.destroy)

module.exports = router;
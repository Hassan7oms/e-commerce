const productController = require('../controllers/product-controller');
const express = require('express');
const router = express.Router();
const {authenticate}=require('../middlewares/authenticate-middleware');
const {authorize}=require('../middlewares/authorize-middleware');
const upload = require('../middlewares/upload-middleware');

router.post('/addproduct',authenticate,authorize('admin'),upload.single('images'),productController.createProduct);
router.get('/getproducts',authenticate,productController.getProducts);
router.get('/getproduct/:slug',authenticate,productController.getProductBySlug);
router.put('/updateproduct/:id',authenticate,authorize('admin'),productController.updateProduct);
router.delete('/softdeleteproduct/:id',authenticate,authorize('admin'),productController.softDeleteProduct);
router.get('/setactive/:id',authenticate,authorize('admin'),productController.setActiveStatus);
router.get('/setinactive/:id',authenticate,authorize('admin'),productController.setUnActiveStatus);
module.exports = router;
const express = require('express')
const userController = require('../app/controllers/userController');
const {authenticateUser, authorizeUser} = require('../app/middlewares/authenticate');
const productController = require('../app/controllers/productController');
const orderController = require('../app/controllers/orderController');
const upload = require('../app/middlewares/upload');
const router = express.Router()

router.post('/api/cakedrop/register', userController.register);
router.post('/api/cakedrop/login', userController.login);
router.get('/api/cakedrop/account',  authenticateUser, authorizeUser, userController.account);

//Product API
router.get('/api/cakedrop/product',  productController.list);
router.post('/api/cakedrop/product', authenticateUser, authorizeUser, upload.single('image'), productController.create);
router.get('/api/cakedrop/product/:id', productController.show );
router.put('/api/cakedrop/product/:id', authenticateUser, authorizeUser, productController.update);
router.delete('/api/cakedrop/product/:id', authenticateUser, authorizeUser, productController.destroy);

//Order API
router.get('/api/cakedrop/order',authenticateUser, authorizeUser, orderController.list);
router.post('/api/cakedrop/order', authenticateUser, orderController.create )
router.get('/api/cakedrop/myorders', authenticateUser, orderController.getUserOrders);
router.put('/api/cakedrop/order/:id', authenticateUser, authorizeUser, orderController.updateStatus);
router.delete('/api/cakedrop/order/:id', authenticateUser, orderController.destroy);

module.exports = router;
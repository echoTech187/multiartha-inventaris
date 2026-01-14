const express = require('express');
const router = express.Router();
const AuthController = require('../src/controllers/Auth');
const UserController = require('../src/controllers/User');
const RoleController = require('../src/controllers/Role');
const ProductController = require('../src/controllers/Product');

router.post('/auth', AuthController.login);
router.get('/me', AuthController.userInfo);
router.get('/auth-status', AuthController.authStatus);


router.get('/users', UserController.getAllUsers);
router.get('/user/:id', UserController.getUserById);
router.put('/user/:slug', UserController.updateUser);
router.put('/user/:slug/change-role', UserController.updateRole);
router.post('/user', UserController.createUser);
router.delete('/user/:slug', UserController.deleteUser);

router.get('/roles', RoleController.index);

router.get('/products', ProductController.index);
router.get('/product/:id', ProductController.show);
router.post('/product', ProductController.store);
router.post('/product/:id/sell', ProductController.sellProduct);
router.put('/product/:id', ProductController.update);
router.delete('/product/:id', ProductController.destroy);
router.get('/product-sell-report', ProductController.productSellReport);


module.exports = router;
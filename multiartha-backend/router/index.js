const express = require('express');
const router = express.Router();
const AuthController = require('../src/controllers/Auth');
const UserController = require('../src/controllers/User');

router.post('/auth', AuthController.login);
router.get('/me', AuthController.userInfo);
router.get('/auth-status', AuthController.authStatus);


router.get('/users', UserController.getAllUsers);
router.get('/users/:id', UserController.getUserById);
router.post('/users', UserController.createUser);
router.delete('/users/:id', UserController.deleteUser);


module.exports = router;
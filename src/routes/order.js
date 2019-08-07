const express = require('express');

const router = express.Router();
const orderController = require('../controllers/order-controllers');
const authService = require('../services/auth-service');

router.get('/', orderController.get);
router.post('/', authService.isAuthorized, orderController.post);

module.exports = router;
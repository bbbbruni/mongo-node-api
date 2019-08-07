const express = require('express');

const router = express.Router();
const customerController = require('../controllers/customer-controllers');
const authService = require('../services/auth-service');

router.get('/', customerController.get);
router.get('/:id', customerController.getById);

router.post('/', customerController.post);
router.post('/auth', customerController.authenticate);

router.put('/:id', customerController.put);
router.delete('/', customerController.delete);

module.exports = router;
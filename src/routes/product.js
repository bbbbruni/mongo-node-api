const express = require('express');

const router = express.Router();
const productControllers = require('../controllers/product-controllers');
const authService = require('../services/auth-service');

router.get('/', productControllers.get);
router.get('/:slug', productControllers.getBySlug);
router.get('/productable/:id', productControllers.getById);
router.get('/tags/:tag', productControllers.getByTags);

router.post('/', productControllers.post);
router.put('/:id', productControllers.put);
router.delete('/', authService.isAdmin, productControllers.delete);

module.exports = router;
const express = require('express');
const router = express.Router();
const controller = require('../controllers/articleController');
const auth = require('../middlewares/authMiddleware');

// Public read
router.get('/', controller.getAll);
router.get('/:id', controller.getOne);

// Protected write
router.post('/', auth, controller.create);
router.put('/:id', auth, controller.update);
router.delete('/:id', auth, controller.remove);

module.exports = router;
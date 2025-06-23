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

router.get('/crash', (req, res) => {
	throw new Error('Test crash route triggered');
  });
  

module.exports = router;
const express = require('express');
const router = express.Router();
const trainerController = require('../controllers/trainerController');

router.get('/', trainerController.getAllTrainers);
router.post('/', trainerController.addTrainer);

module.exports = router;

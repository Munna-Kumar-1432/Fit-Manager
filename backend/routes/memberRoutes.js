const express = require('express');
const router = express.Router();
const memberController = require('../controllers/memberController');
const upload = require('../config/cloudinary');

router.get('/', memberController.getAllMembers);
router.post('/', upload.single('photo'), memberController.addMember);
router.delete('/:id', memberController.deleteMember);

module.exports = router;

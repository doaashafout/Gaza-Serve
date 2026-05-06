const express = require('express');
const router = express.Router();
const {
  getUserByTelegramId,
  getAllUsers,
  updateUserProfile,
} = require('../controllers/user.controller');

router.get('/', getAllUsers);
router.get('/:telegramUserId', getUserByTelegramId);
router.put('/:telegramUserId', updateUserProfile);

module.exports = router;

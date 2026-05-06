const express = require('express');
const router = express.Router();
const {
  registerTechnician,
  getTechnicianByTelegramId,
  updateAvailability,
  getAvailableTechnicians,
} = require('../controllers/technician.controller');

router.post('/', registerTechnician);
router.get('/', getAvailableTechnicians);
router.get('/:telegramUserId', getTechnicianByTelegramId);
router.patch('/:telegramUserId/availability', updateAvailability);

module.exports = router;

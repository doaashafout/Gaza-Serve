const express = require('express');
const router = express.Router();
const {
  createRequest,
  getRequestsByUser,
  getAllRequests,
  updateRequestStatus,
} = require('../controllers/request.controller');

router.post('/', createRequest);
router.get('/', getAllRequests);
router.get('/:telegramUserId', getRequestsByUser);
router.patch('/:id/status', updateRequestStatus);

module.exports = router;

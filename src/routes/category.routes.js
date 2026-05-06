const express = require('express');
const router = express.Router();
const {
  getAllCategories,
  createCategory,
} = require('../controllers/category.controller');

router.get('/', getAllCategories);
router.post('/', createCategory);

module.exports = router;

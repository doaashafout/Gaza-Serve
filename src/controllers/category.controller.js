const categoryRepo = require('../repositories/category.repository');

const getAllCategories = async (req, res, next) => {
  try {
    const categories = await categoryRepo.getAllCategories();
    res.status(200).json({
      success: true,
      message: 'Categories fetched successfully',
      data: categories,
    });
  } catch (err) {
    next(err);
  }
};

const createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Name is required',
      });
    }

    const category = await categoryRepo.createCategory({ name });

    res.status(201).json({
      success: true,
      message: 'Category created successfully',
      data: category,
    });
  } catch (err) {
    if (err.message === 'Category already exists') {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }
    next(err);
  }
};

module.exports = {
  getAllCategories,
  createCategory,
};

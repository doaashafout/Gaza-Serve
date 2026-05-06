const { readData, appendData, generateId } = require('../storage/fileStorage');

const getAllCategories = async () => {
  return await readData('categories');
};

const getCategoryById = async (id) => {
  const categories = await readData('categories');
  return categories.find((c) => c.id === parseInt(id)) || categories.find((c) => c.id === id) || null;
};

const createCategory = async (categoryData) => {
  const categories = await readData('categories');
  const exists = categories.find(
    (c) => c.name.toLowerCase() === categoryData.name.toLowerCase()
  );
  if (exists) {
    throw new Error('Category already exists');
  }

  const maxId = categories.reduce((max, c) => (c.id > max ? c.id : max), 0);
  const newCategory = {
    id: maxId + 1,
    name: categoryData.name,
    createdAt: new Date().toISOString(),
  };

  await appendData('categories', newCategory);
  return newCategory;
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
};
